class World {
    constructor() {
        this.tiles = [];
        this.tileSize = 64;
        this.renderDistance = 64;
        this.voidTile = {
            name: 'Void',
            color: "darkgreen",
            image: new Image(),
            src: './Kuvat/Void.png',
            isVoid: true
        };
        this.voidTile.image.src = this.voidTile.src;
    }
    
    createTile(x, y, Type) {
        let tile;

        if (typeof Type === 'function') {
            tile = new Type(x, y);
        } else if (Type && typeof Type === 'object') {
            tile = Type;
            if (tile.x === undefined) tile.x = x;
            if (tile.y === undefined) tile.y = y;
        } else {
            return;
        }

        this.tiles.push(tile);
    }

    drawWorld() {
        const originX = canvas.width / 2 - (camera ? camera.location.x * camera.zoom : 0);
        const originY = canvas.height / 2 - (camera ? camera.location.y * camera.zoom : 0);

        ctx.fillStyle = this.voidTile.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const tile of this.tiles) {
            ctx.drawImage(
                tile.image,
                originX + tile.x * this.tileSize * camera.zoom - this.tileSize * camera.zoom / 2,
                originY + tile.y * this.tileSize * camera.zoom - this.tileSize * camera.zoom / 2,
                this.tileSize * camera.zoom,
                this.tileSize * camera.zoom
            );
        }
    }
    
    // Palauttaa ruudun datan kutsumalla
    getTileAt(x, y) {
        const tile = this.tiles.find(tile => tile.x === x && tile.y === y);
        if (!tile) {
            return {
                ...this.voidTile,
                x: x,
                y: y,
                health: Infinity,
                defence: Infinity,
                isSolid: false
            };
        }

        return {
            name: tile.name || (tile.constructor && tile.constructor.name) || 'Tile',
            image: tile.image,
            src: tile.src,
            x: tile.x,
            y: tile.y,
            health: tile.health,
            defence: tile.defence,
            isSolid: tile.isSolid
        };
    }

    
}