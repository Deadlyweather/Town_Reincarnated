const Size = 128;

const Tiles = {
    Concrete: {
        id: 0,
        image: new Image(),
        src: '../Kuvat/Concrete.png',
        coordinates: { x: 0, y: 0 }
    }
};

const SpawnTile = (tile, x, y) => {
    tile.coordinates.x = x;
    tile.coordinates.y = y;
};

const DrawTile = (tile, x, y, context) => {
    context.drawImage(tile.image, x, y, Size, Size);
};

const LoadTiles = () => {
    for (const tile in Tiles) {
        Tiles[tile].image.src = Tiles[tile].src;
    }
};

export { Size, Tiles, DrawTile, LoadTiles, SpawnTile };