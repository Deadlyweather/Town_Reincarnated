class Player {
    constructor() {
        // game stats
        this.speed = 16;
        this.range = 128

        // special stats
        
        this.rotation = 0;
        this.location = { x: 0, y: 0 };

        // Bounds

        this.size = 64;
        this.hitbox = 0.5;
        this.image = new Image();
        this.image.src = '../Kuvat/Player.png';
    }

    DrawPlayer() {
        const originX = canvas.width / 2 - camera.location.x * camera.zoom + this.location.x * world.tileSize * camera.zoom;
        const originY = canvas.height / 2 - camera.location.y * camera.zoom + this.location.y * world.tileSize * camera.zoom;

        ctx.save();
        ctx.translate(originX, originY);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.image,
            -this.size * camera.zoom / 2,
            -this.size * camera.zoom / 2,
            this.size * camera.zoom,
            this.size * camera.zoom);
        ctx.restore();
    }

    MovePlayer(x, y) {
        this.location.x += x / 100
        this.location.y += y / 100
    }

    RotatePlayer(Rotation, Type) {
        if (Type === "add") {
            this.rotation += Rotation;
            if (this.rotation >= 360) {
                this.rotation %= 360;
            }
        } else if (Type === "set") {
            this.rotation = Rotation % 360;
        } else if (Type === "cursor") {
            const originX = canvas.width / 2 - camera.location.x * camera.zoom + this.location.x * world.tileSize * camera.zoom;
            const originY = canvas.height / 2 - camera.location.y * camera.zoom + this.location.y * world.tileSize * camera.zoom;

            const dx = cursor.location.x - originX;
            const dy = cursor.location.y - originY;
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            this.rotation = angle < 0 ? angle + 360 : angle;
        }
    }
}