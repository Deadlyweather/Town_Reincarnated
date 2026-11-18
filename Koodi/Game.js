const canvas = document.getElementById('Screen');
const ctx = canvas.getContext('2d');

const entity = new Entities()
const world = new World(128, 16);
const camera = new Camera();
const player = new Player(0, 0);
const debug = new Debug(true);
const controls = new Controls()
const cursor = new Cursor()


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

controls.UpdateBinds();

world.createTile(0, 0, new Concrete());

world.createTile(1, 0, new Concrete());
world.createTile(-1, 0, new Concrete())

world.createTile(0, 1, new Concrete())
world.createTile(0, -1, new ConcreteWhite())
world.createTile(1, -1, new ConcreteWhite())
world.createTile(0, 2, new SideWalk())
world.createTile(0, 3, new SideWalk())
world.createTile(1, 2, new SideWalk())
world.createTile(1, 3, new SideWalk())

const FPS = 60

const frameDuration = 1000 / FPS

let lastFrame = 0
let lastUpdateTime = performance.now()
let lastEntitySpawn = performance.now()

function render() {
    const now = performance.now()
    if (now - lastFrame < frameDuration) {
        requestAnimationFrame(render)
        return
    }
    const deltaTime = (now - lastUpdateTime) / 1000
    lastUpdateTime = now
    clearCanvas();

    const delta = controls.getWheelDelta()
    camera.zoomCamera(Math.min(delta * 0.1))
    camera.moveCamera(player.location.x, player.location.y)

    cursor.UpdateCursor(controls.getMousePosition().x, controls.getMousePosition().y)
    player.RotatePlayer(0, "cursor")

    world.drawWorld();
    player.DrawPlayer();
    let moveX = 0
    let moveY = 0
    if (controls.isActionActive("MoveUp")) moveY -= 1
    if (controls.isActionActive("MoveDown")) moveY += 1
    if (controls.isActionActive("MoveLeft")) moveX -= 1
    if (controls.isActionActive("MoveRight")) moveX += 1

    const moveLength = Math.hypot(moveX, moveY)
    if (moveLength > 0) {
        player.MovePlayer(moveX / moveLength, moveY / moveLength)
    }

    entity.drawEntities();
    if (now - lastEntitySpawn >= entity.spawnrate) {
        entity.spawnEntity()
        lastEntitySpawn = now
    }
    entity.updateAggro(player)
    entity.updateProjectiles(deltaTime)
    entity.drawProjectiles()

    debug.DrawDebug();

    controls.ResetWheel();
    requestAnimationFrame(render);
}

render();
