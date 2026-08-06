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
        this.zoom += Amount
    }

}