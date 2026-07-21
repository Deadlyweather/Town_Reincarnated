import { Size } from './Tiles.js';
import { Camera } from './Camera.js';

const Debug = {
    Builder: false,
    Godmode: false
};

function ToggleBuilder() {
    Debug.Builder = !Debug.Builder;
    if (Debug.Builder) {
        console.log('Builder mode enabled');
    } else {
        console.log('Builder mode disabled');
    }
}

function DrawGrid() {
    const canvas = document.getElementById('Screen');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const worldLeft = Math.floor(Camera.x / Size) * Size;
    const worldTop = Math.floor(Camera.y / Size) * Size;
    const worldRight = Camera.x + width;
    const worldBottom = Camera.y + height;

    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 1;
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.beginPath();
    for (let x = worldLeft; x <= worldRight; x += Size) {
        ctx.moveTo(x + 0.5, worldTop);
        ctx.lineTo(x + 0.5, worldBottom);
    }
    for (let y = worldTop; y <= worldBottom; y += Size) {
        ctx.moveTo(worldLeft, y + 0.5);
        ctx.lineTo(worldRight, y + 0.5);
    }
    ctx.stroke();

    const startCol = Math.floor(worldLeft / Size);
    const endCol = Math.ceil(worldRight / Size);
    const startRow = Math.floor(worldTop / Size);
    const endRow = Math.ceil(worldBottom / Size);

    for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
            const x = col * Size;
            const y = row * Size;
            const coordX = col;
            const coordY = row;
            const textX = x + Size / 2;
            const textY = y + Size / 2;

            ctx.fillStyle = 'rgba(255,0,0,1)';
            ctx.fillText(`x${coordX}`, textX - 16, textY);
            ctx.fillStyle = 'rgba(0,255,0,1)';
            ctx.fillText(`y${coordY}`, textX + 16, textY);
        }
    }

    ctx.restore();
}

export { Debug, DrawGrid, ToggleBuilder };