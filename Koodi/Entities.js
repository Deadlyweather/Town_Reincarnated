class Basic {
    constructor() {
        this.speed = 8
        this.health = 400
        this.defence = -10
        this.damage = { min: 1, max: 10 }
        this.rarity = 1000

        this.size = 64
        this.location = { x: 0, y: 0 }

        this.image = new Image()
        this.src = "./Kuvat/Basic.png"

        // AI

        this.aggroRange = 2500
        this.aggro = undefined
        this.wanderRange = 50
        this.wanderChain = 4
        this.wanderSpots = []
    }
}

class Tank {
    constructor() {
        this.speed = 6
        this.health = 40000
        this.defence = -10
        this.damage = { min: 10, max: 200 }
        this.rarity = 1

        this.size = 128
        this.location = { x: 0, y: 0 }

        this.image = new Image()
        this.src = "./Kuvat/Tank.png"

        // AI

        this.aggroRange = 1250
        this.aggro = undefined
        this.wanderRange = 50
        this.wanderChain = 1
        this.wanderSpots = []
    }
}

class Light {
    constructor() {
        this.speed = 10
        this.health = 100
        this.defence = -20
        this.damage = { min: 1, max: 5 }
        this.rarity = 25
        
        this.size = 48
        this.location = { x: 0, y: 0 }

        this.image = new Image()
        this.src = "./Kuvat/Light.png"

        // AI

        this.aggroRange = 5000
        this.aggro = undefined
        this.wanderRange = 200
        this.wanderChain = 4
        this.wanderSpots = []
    }
}

class Entities {
    constructor() {
        this.entities = []
        this.spawnrate = 10000
    }

    spawnEntity() {
        this.entities.push()
    }

    rollEntity() {
        
        return 
    }
}

class AI {
    constructor() {
        this.wanderTime = 100
        this.aggroTime = 1000
        this.aggroTrigger = 100

        
    }
}