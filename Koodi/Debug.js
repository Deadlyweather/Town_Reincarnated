class Debug {
    constructor(State) {
        this.DebugMode = State || false;
        this.defaultVision = new AI().vision;
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
            this.showCursorEntity()
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

    showCursorEntity() {
        const x = canvas.width / 2
        const y = canvas.height / 2
        const TileX = Math.round(((cursor.location.x - x + camera.location.x * camera.zoom) / (world.tileSize * camera.zoom)) * 100) / 100
        const TileY = Math.round(((cursor.location.y - y + camera.location.y * camera.zoom) / (world.tileSize * camera.zoom)) * 100) / 100
        // hitbox check
        const entity = world.getEntityAt(TileX, TileY)
        if (entity) {
            const originX = canvas.width / 2 - camera.location.x * camera.zoom + entity.location.x * world.tileSize * camera.zoom;
            const originY = canvas.height / 2 - camera.location.y * camera.zoom + entity.location.y * world.tileSize * camera.zoom;
            const size = (entity.size || world.tileSize) * camera.zoom
            const hitboxSize = size * (entity.hitbox ?? 1)
            const vision = entity.vision ?? this.defaultVision
            const rotation = entity.rotation ?? 0

            if (entity.aggroRange > 0 && vision > 0) {
                const halfVision = vision * Math.PI / 360
                const facingAngle = rotation * Math.PI / 180
                const startAngle = facingAngle - halfVision
                const endAngle = facingAngle + halfVision

                ctx.save()
                ctx.beginPath()
                ctx.moveTo(originX, originY)
                ctx.arc(
                    originX,
                    originY,
                    entity.aggroRange * camera.zoom,
                    startAngle,
                    endAngle
                )
                ctx.closePath()
                ctx.fillStyle = "red"
                ctx.globalAlpha = 0.15
                ctx.fill()
                ctx.strokeStyle = "red"
                ctx.lineWidth = 2
                ctx.globalAlpha = 0.8
                ctx.stroke()
                ctx.restore()
            }

            ctx.save()
            ctx.strokeStyle = "yellow"
            ctx.lineWidth = 2
            ctx.strokeRect(originX - hitboxSize / 2, originY - hitboxSize / 2, hitboxSize, hitboxSize)
            ctx.fillStyle = "yellow"
            ctx.font = "24px Arial"
            ctx.textAlign = "right"

            
            const name = entity.name || (entity.constructor && entity.constructor.name) || "Entity"
            ctx.fillText(`Entity: ${name}`, x * 2 - 96, 240)
            ctx.fillText(`Location: (${entity.location.x}, ${entity.location.y})`, x * 2 - 96, 270)
            ctx.fillText(`Health: ${entity.health}`, x * 2 - 96, 300)
            ctx.fillText(`Defence: ${entity.defence}`, x * 2 - 96, 330)
            ctx.fillText(`Damage: ${entity.damage}`, x * 2 - 96, 360)
            ctx.fillText(`Speed: ${entity.speed}`, x * 2 - 96, 390)
            ctx.fillText(`Aggro range: ${entity.aggroRange}`, x * 2 - 96, 420)
            ctx.fillText(`Vision: ${vision}°`, x * 2 - 96, 450)
            ctx.fillText(`Rotation: ${rotation.toFixed(1)}°`, x * 2 - 96, 480)
            ctx.fillText(`Aggro: ${entity.aggro ? "Player" : "None"}`, x * 2 - 96, 510)

            if (entity.image) {
                ctx.drawImage(entity.image, x * 2 - 84, 192, 64, 64)
                ctx.strokeRect(x * 2 - 84, 192, 64, 64)
            }
            ctx.restore()
        }
        
    }
}