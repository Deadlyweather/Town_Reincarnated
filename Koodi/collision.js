class hitboxes {
    constructor() {
        this.hitboxes = [];
        this.type = "entity" // entity, tile, projectile
        this.isSolid = true // solid or not
        this.force = 0 // knockback
        this.weight = 0 // weight of the object (more resistant to knockback)
    }

    onCollision(self, other) {
        
    }
}