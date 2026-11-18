class Projectile {
    constructor(location, image, size, lifespan, knockback, peneration, radius, points, arc, rotation, speed, damage, owner, type) {
        this.location = { x: location.x, y: location.y };
        this.image = image;
        this.size = { width: size.width, height: size.height };
        this.lifespan = lifespan;
        this.knockback = knockback;
        this.peneration = peneration;
        this.radius = radius;
        this.points = points;
        this.arc = arc;
        this.rotation = rotation;
        this.speed = speed;
        this.damage = damage;
        this.owner = owner;
        this.type = type; // projectile, Aoe, Beam, Sweep
    }

    update(deltaTime) {
        this.lifespan -= deltaTime;
        if (this.lifespan <= 0 || this.type !== "projectile") {
            return;
        }

        const angle = this.rotation * Math.PI / 180;
        this.location.x += Math.cos(angle) * this.speed * deltaTime;
        this.location.y += Math.sin(angle) * this.speed * deltaTime;
    }

    drawProjectile() {
        if (this.type === "projectile") {
            const originX = canvas.width / 2 - camera.location.x * camera.zoom + this.location.x * world.tileSize * camera.zoom;
            const originY = canvas.height / 2 - camera.location.y * camera.zoom + this.location.y * world.tileSize * camera.zoom;
            ctx.save();
            ctx.translate(originX, originY);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.drawImage(this.image, -this.size.width * camera.zoom / 2, -this.size.height * camera.zoom / 2, this.size.width * camera.zoom, this.size.height * camera.zoom);
            ctx.restore();
        }
    }

    
}