class Camera {
    constructor() {
        this.location = { x: 0, y: 0 };
        this.zoom = 1;
    }

    moveCamera(x, y) {
        const scale = world.tileSize;

        this.location.x = x * scale;
        this.location.y = y * scale;
    }

    zoomCamera(Amount) {
        if (this.zoom + Amount < 0.5) {
            this.zoom = 0.5;
        } else if (this.zoom + Amount > 2) {
            this.zoom = 2;
        } else {
            this.zoom += Amount;
        }
    }

}