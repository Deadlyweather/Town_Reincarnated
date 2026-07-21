import { canvas, ctx } from "./Game.js";
import { MoveCamera } from "./Camera.js";

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = '../Kuvat/Player.png';
        this.speed = 16;
        this.rotation = 0;
    }

    DrawPlayer() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

export { Player };