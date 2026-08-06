class Debug {
    constructor(State) {
        this.DebugMode = State || false;
    }

    ToggleDebug() {
        this.DebugMode = !this.DebugMode
    }

    DrawDebug() {
        if (this.DebugMode) {
            this.ShowTileStats();
            this.ShowTileBounds();
            this.Godmode();
            this.ShowPlayerStats();
            this.ShowPlayerBounds();
            this.ShowPlayerRotation()
            this.ShowCameraTarget()
            this.ShowCursorStats()
            
        }
    }

    ShowTileStats() {
        // Näyttää kursorilla olevan tilen datan

        // Näyttää kameran alla olevan tilen datan
    }

    ShowTileBounds() {
        const tileSize = world.tileSize;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const originX = centerX - camera.location.x * camera.zoom - tileSize * camera.zoom / 2;
        const originY = centerY - camera.location.y * camera.zoom - tileSize * camera.zoom / 2;

        // Maailman keskipiste
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(originX, originY, tileSize * camera.zoom, tileSize * camera.zoom);
        ctx.restore();
        
    }

    Godmode() {
        // Pelaaja ohittaa kaikki vaikutukset
    }

    ShowPlayerStats() {
        ctx.save()
        ctx.fillStyle = "red";
        ctx.font = "32px Arial";
        
        ctx.fillText(`Player X: ${player.location.x.toFixed(2)}`, 8, 32);
        ctx.fillStyle = "lime"
        ctx.fillText(`Player Y: ${player.location.y.toFixed(2)}`, 8, 64 );
        ctx.fillStyle = "cyan";
        ctx.fillText(`Player Rotation: ${player.rotation.toFixed(0)}`, 8, 96);
        ctx.restore()
    }

    ShowPlayerBounds() {
        const hitboxSize = player.size * camera.zoom * player.hitbox;
        const originX = canvas.width / 2 - camera.location.x * camera.zoom + player.location.x * world.tileSize * camera.zoom;
        const originY = canvas.height / 2 - camera.location.y * camera.zoom + player.location.y * world.tileSize * camera.zoom;

        ctx.save();
        ctx.translate(originX, originY);
        // ctx.rotate(player.rotation * Math.PI / 180);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.strokeRect(-hitboxSize / 2, -hitboxSize / 2, hitboxSize, hitboxSize);
        ctx.restore();

    }

    ShowPlayerRotation() {
        const originX = canvas.width / 2 - camera.location.x * camera.zoom + player.location.x * world.tileSize * camera.zoom;
        const originY = canvas.height / 2 - camera.location.y * camera.zoom + player.location.y * world.tileSize * camera.zoom;
        const radians = player.rotation * Math.PI / 180;
        const length = player.range * camera.zoom;

        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX + Math.cos(radians) * length, originY + Math.sin(radians) * length);
        ctx.stroke();
        ctx.restore();
    }

    ShowCameraTarget() {
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const linelenght = 4;

        const cameraTileX = Math.round(camera.location.x / world.tileSize);
        const cameraTileY = Math.round(camera.location.y / world.tileSize);
        const tileSize = world.tileSize * camera.zoom;
        const tileOriginX = x - camera.location.x * camera.zoom + cameraTileX * world.tileSize * camera.zoom - tileSize / 2;
        const tileOriginY = y - camera.location.y * camera.zoom + cameraTileY * world.tileSize * camera.zoom - tileSize / 2;

        // Kameran risti

        ctx.save();
        ctx.strokeStyle = "magenta";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - linelenght, y);
        ctx.lineTo(x + linelenght, y);
        ctx.moveTo(x, y - linelenght);
        ctx.lineTo(x, y + linelenght);
        ctx.stroke();
        ctx.restore();

        const target = world.getTileAt(cameraTileX, cameraTileY);

        // kameran tile
        ctx.save();
        ctx.strokeStyle = "magenta";
        ctx.lineWidth = 2;
        ctx.strokeRect(tileOriginX, tileOriginY, tileSize, tileSize);
        ctx.restore();

        // kameran tiedot
        ctx.save()
        ctx.fillStyle = "magenta";
        ctx.font = "16px Arial";
        ctx.fillText(`Camera tile: ${cameraTileX}, ${cameraTileY}`, x + 16, y - 16);
        ctx.fillText(`Camera zoom: ${camera.zoom.toFixed(1)}X`, x + 16, y - 32)

        // tilen tiedot
        ctx.font = "32px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`Tile: ${target.name} (${target.x}, ${target.y})`, x * 2 - 96, 64);
        ctx.fillText(`isSolid: ${target.isSolid}`, x * 2 - 96, 96)
        ctx.fillText(`Health: ${target.health}`, x * 2 - 96, 150)
        ctx.fillText(`Defence: ${target.defence}`, x * 2 - 96, 180)
        ctx.drawImage(target.image, x * 2 - 84, 16, 64, 64)
        ctx.restore()
        ctx.strokeStyle = "magenta"
        ctx.lineWidth = 2
        ctx.strokeRect(x * 2 - 84, 16, 64, 64)
    }

    ShowCursorStats() {
        const x = canvas.width / 2 
        const y = canvas.height / 2
        const TileX = Math.round(((cursor.location.x - x + camera.location.x * camera.zoom) / (world.tileSize * camera.zoom)) * 100) / 100
        const TileY = Math.round(((cursor.location.y - y + camera.location.y * camera.zoom) / (world.tileSize * camera.zoom)) * 100) / 100

        ctx.save()
        ctx.fillStyle = "red"
        ctx.font = "16px Arial"
        ctx.fillText(`Window ( X: ${cursor.location.x}, Y: ${cursor.location.y} )`, cursor.location.x + 32,  cursor.location.y - 32)
        ctx.fillText(`Tile ( X: ${TileX}, Y: ${TileY} )`, cursor.location.x + 32,  cursor.location.y - 64)
        ctx.fillText(`Delta: ${controls.getWheelDelta()}`, cursor.location.x + 32, cursor.location.y - 96)
        ctx.restore()
    }
}