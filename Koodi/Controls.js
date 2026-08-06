class Controls {
    constructor() {
        this.keybinds = {
            MoveUp: 'w',
            MoveDown: 's',
            MoveLeft: 'a',
            MoveRight: 'd',
            OpenInventory: 'e',
            ActionLeft: 'mouse0',
            ActionRight: 'mouse2',
            ToggleDebug: 'p'
        };

        this.specialbinds = {
            WheelUp: 'wheelUp',
            WheelDown: 'wheelDown',
            MouseMove: 'mousemove'
        };

        this.state = {
            keys: {},
            mouse: {
                x: 0,
                y: 0,
                left: false,
                right: false,
                wheelDelta: 0
            }
        };

        this.UpdateBinds();
    }

    UpdateBinds() {
        // Tarkistaa onko näppäin näppäimistössä aktiivinen vai ei
        window.addEventListener('keydown', (event) => {
            this.state.keys[event.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.state.keys[event.key.toLowerCase()] = false;
        });
        // Tarkistaa hiiren napit

        window.addEventListener('mousedown', (event) => {
            if (event.button === 0) this.state.mouse.left = true;
            if (event.button === 2) this.state.mouse.right = true;
        });

        window.addEventListener('mouseup', (event) => {
            if (event.button === 0) this.state.mouse.left = false;
            if (event.button === 2) this.state.mouse.right = false;
        });
        // Tarkistaa hiiren muut liikkeet

        window.addEventListener('mousemove', (event) => {
            this.state.mouse.x = event.clientX;
            this.state.mouse.y = event.clientY;
        });

        window.addEventListener('wheel', (event) => {
            this.state.mouse.wheelDelta = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
        });

        // Estää context menun ilmestymisen kun rightclick on käytössä
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }

    ResetWheel() {
        this.state.mouse.wheelDelta = 0;
    }

    // Vastaa onko nappi aktiivinen vai ei
    isActionActive(actionName) {
        const bind = this.keybinds[actionName];
        if (!bind) return false;

        if (bind.startsWith('mouse')) {
            if (bind === 'mouse0') return this.state.mouse.left;
            if (bind === 'mouse2') return this.state.mouse.right;
            return false;
        }

        return !!this.state.keys[bind.toLowerCase()];
    }

    // Vaihtaa keybindin

    setKeybind(actionName, key) {
        if (this.keybinds[actionName] !== undefined) {
            this.keybinds[actionName] = key;
        }
    }

    // antaa hiiren sijainnin

    getMousePosition() {
        return { x: this.state.mouse.x, y: this.state.mouse.y };
    }

    // antaa hiiren m3 napin rullan tiedot

    getWheelDelta() {
        return this.state.mouse.wheelDelta;
    }
}
