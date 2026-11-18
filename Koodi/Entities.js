class Basic {
    static get rarity() {
        return 100
    }

    constructor(x = 0, y = 0) {
        this.speed = 8
        this.health = 400
        this.defence = -10
        this.damage = (Math.random() * 10).toFixed(0)

        this.size = 64
        this.location = { x, y }
        this.rotation = Math.random() * 360
        this.hitbox = 0.5

        this.image = new Image()
        this.src = "./Kuvat/Basic.png"
        this.image.src = this.src

        // AI

        this.aggroRange = 500
        this.aggro = undefined
        this.wanderRange = 50
        this.wanderChain = 4
        this.wanderSpots = []
        this.lastShotAt = 0
    }
}

class Tank {
    static get rarity() {
        return 1
    }

    constructor(x = 0, y = 0) {
        this.speed = 6
        this.health = 40000
        this.defence = -10
        this.damage = { min: 10, max: 200 }

        this.size = 128
        this.location = { x, y }
        this.rotation = Math.random() * 360
        this.hitbox = 0.5

        this.image = new Image()
        this.src = "./Kuvat/Tank.png"
        this.image.src = this.src

        // AI

        this.aggroRange = 500
        this.aggro = undefined
        this.wanderRange = 50
        this.wanderChain = 1
        this.wanderSpots = []
    }
}

class Light {
    static get rarity() {
        return 25
    }

    constructor(x = 0, y = 0) {
        this.speed = 10
        this.health = 100
        this.defence = -20
        this.damage = { min: 1, max: 5 }
        
        this.size = 48
        this.location = { x, y }
        this.rotation = Math.random() * 360
        this.hitbox = 0.5

        this.image = new Image()
        this.src = "./Kuvat/Light.png"
        this.image.src = this.src

        // AI

        this.aggroRange = 750
        this.aggro = undefined
        this.wanderRange = 200
        this.wanderChain = 4
        this.wanderSpots = []
        this.lastShotAt = 0
    }
}

const ValidEntities = {
    Basic: Basic,
    Tank: Tank,
    Light: Light
}

const Spawnrules = {
    Spawnrange: [5, 30], // min and max etäisyys pelaajasta
    Spawnlimit: 400,
    SpawnlimitOn: true,
    Spawning: true


}

class Entities {
    constructor() {
        this.entities = []
        this.projectiles = []
        this.spawnrate = 1000
        this.ai = new AI()
        this.handsImage = new Image()
        this.handsImage.src = "./Kuvat/hands.png"
    }

    spawnEntity(entityType, random, x, y) {
        if (!Spawnrules.Spawning) {
            return
        }

        if (Spawnrules.SpawnlimitOn && this.entities.length >= Spawnrules.Spawnlimit) {
            return
        }

        if (entityType === undefined) {
            if (random) {
                entityType = Object.keys(ValidEntities)[Math.floor(Math.random() * Object.keys(ValidEntities).length)]
            } else {
                // spawn based on rarity
                const totalRarity = Object.values(ValidEntities).reduce((sum, EntityType) => sum + EntityType.rarity, 0)
                let randomValue = Math.random() * totalRarity;
                entityType = Object.keys(ValidEntities).find((key) => {
                    randomValue -= ValidEntities[key].rarity
                    return randomValue <= 0;
                });
            }
        }
        if (x === undefined || y === undefined) {
            let validTiles = world.tiles.filter(tile => {
                const distance = Math.sqrt(Math.pow(tile.x - player.location.x, 2) + Math.pow(tile.y - player.location.y, 2))
                return distance >= Spawnrules.Spawnrange[0] && distance <= Spawnrules.Spawnrange[1]
            })
            if (validTiles.length > 0) {
                const randomTile = validTiles[Math.floor(Math.random() * validTiles.length)]
                x = randomTile.x
                y = randomTile.y
            } else {
                const [minRange, maxRange] = Spawnrules.Spawnrange
                const angle = Math.random() * Math.PI * 2
                const distance = Math.sqrt(
                    minRange ** 2 + Math.random() * (maxRange ** 2 - minRange ** 2)
                )
                x = player.location.x + Math.cos(angle) * distance
                y = player.location.y + Math.sin(angle) * distance
            }
        }

        const entity = new ValidEntities[entityType](x, y)
        this.entities.push(entity)
    }

    updateAggro(target) {
        for (const entity of this.entities) {
            if (entity.aggro === undefined) {
                if (entity.aggroRange <= 0) {
                    continue
                }

                const dx = target.location.x - entity.location.x
                const dy = target.location.y - entity.location.y
                const distance = Math.hypot(dx, dy) * world.tileSize
                if (distance > entity.aggroRange) {
                    continue
                }

                const angleToTarget = Math.atan2(dy, dx)
                const facingAngle = (entity.rotation ?? 0) * Math.PI / 180
                const angleDifference = Math.atan2(
                    Math.sin(angleToTarget - facingAngle),
                    Math.cos(angleToTarget - facingAngle)
                )
                const vision = entity.vision ?? this.ai.vision
                if (Math.abs(angleDifference) > vision * Math.PI / 360) {
                    continue
                }
                entity.aggro = target
            }

            this.ai.OnAggro(entity, entity.aggro)
            this.fireProjectile(entity, entity.aggro)
        }
    }

    fireProjectile(entity, target) {
        if (!(entity instanceof Basic) && !(entity instanceof Light)) {
            return
        }

        const now = performance.now()
        if (now - entity.lastShotAt < 1000) {
            return
        }

        const dx = target.location.x - entity.location.x
        const dy = target.location.y - entity.location.y
        const rotation = Math.atan2(dy, dx) * 180 / Math.PI
        this.projectiles.push(new Projectile(
            entity.location,
            this.handsImage,
            { width: 32, height: 32 },
            2,
            -10,
            0,
            0,
            0,
            0,
            rotation,
            2,
            entity.damage,
            entity,
            "projectile"
        ))
        entity.lastShotAt = now
    }

    updateProjectiles(deltaTime) {
        for (const projectile of this.projectiles) {
            projectile.update(deltaTime)
        }
        this.projectiles = this.projectiles.filter(projectile => projectile.lifespan > 0)
    }

    drawProjectiles() {
        for (const projectile of this.projectiles) {
            projectile.drawProjectile()
        }
    }

    drawEntities() {
        for (const entity of this.entities) {
            const originX = canvas.width / 2 - camera.location.x * camera.zoom + entity.location.x * world.tileSize * camera.zoom;
            const originY = canvas.height / 2 - camera.location.y * camera.zoom + entity.location.y * world.tileSize * camera.zoom;
            const size = entity.size * camera.zoom
            ctx.save()
            ctx.translate(originX, originY)
            ctx.rotate((entity.rotation ?? 0) * Math.PI / 180)
            ctx.drawImage(entity.image, -size / 2, -size / 2, size, size)
            ctx.restore()
        }
    }
}

class AI {
    constructor() {
        this.wanderTime = 100
        this.aggroTime = Infinity
        this.aggroTrigger = 100
        this.aggroChance = 100
        this.vision = 90 // aggro kaari
    }
    // Aggro AI
    OnAggro(entity, target) {
        if (entity.aggro === undefined) {
            return
        } else {
            const dx = target.location.x - entity.location.x
            const dy = target.location.y - entity.location.y
            const angleToTarget = Math.atan2(dy, dx) * 180 / Math.PI
            entity.rotation = angleToTarget < 0 ? angleToTarget + 360 : angleToTarget

            const distance = Math.hypot(dx, dy)
            if (distance > 1) {
                const moveX = (dx / distance) * entity.speed / 1000
                const moveY = (dy / distance) * entity.speed / 1000
                entity.location.x += moveX
                entity.location.y += moveY
                
                if (entity === Basic) {
                    new Projectile(
                        { x: entity.location.x, y: entity.location.y },
                        new Image(),
                        { width: 10, height: 10 },
                        5,
                        10,
                        45,
                        angleToTarget,
                        100,
                        10,
                        entity,
                        "projectile"
                    )
                }
            }
        }

    }
}

