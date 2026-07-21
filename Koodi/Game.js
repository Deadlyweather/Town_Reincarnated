import { Size, Tiles, DrawTile, LoadTiles, SpawnTile } from './Tiles.js';
import { Debug, DrawGrid, ToggleBuilder } from './Debug.js';
import { Camera, MoveCamera, ResizeCamera, ZoomCamera } from './Camera.js';
import { Player } from './Player.js';



const canvas = document.getElementById('Screen');
const ctx = canvas.getContext('2d');
const background = "black";

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
    clearCanvas();
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Debug.Builder) {
        ctx.save();
        ctx.translate(-Camera.x, -Camera.y);
        DrawGrid();
        ctx.restore();
    }

    player.DrawPlayer();

    requestAnimationFrame(render);
}

resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    ResizeCamera(canvas.width, canvas.height);
});
ResizeCamera(canvas.width, canvas.height);
ToggleBuilder();
MoveCamera(0, 0);
render();

export { canvas, ctx }