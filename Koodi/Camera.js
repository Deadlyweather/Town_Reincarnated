import { Size } from './Tiles.js';

const Camera = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1
};

function MoveCamera(tileX, tileY) {
    Camera.x = tileX * Size + Size / 2 - Camera.width / 2;
    Camera.y = tileY * Size + Size / 2 - Camera.height / 2;
}

function ResizeCamera(width, height) {
    Camera.width = width;
    Camera.height = height;
}

function ZoomCamera(scale) {
    Camera.scale = scale;
}

export { Camera, MoveCamera, ResizeCamera, ZoomCamera };