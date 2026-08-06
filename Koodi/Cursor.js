class Cursor {
    constructor() {
        this.location = { x: undefined, y: undefined }
        this.image = new Image()
        this.src = "../Kuvat/Cursor.png"
        this.size = 16
    }

    UpdateCursor(x, y) {
        this.location.x = x;
        this.location.y = y;
    }
}