class Concrete {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = "Concrete";
        this.image = new Image();
        this.image.src = './Kuvat/Concrete.png';
        this.isSolid = false
        this.health = 250000
        this.defence = 1000
    }
}

class ConcreteWhite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = "ConcreteWhite";
        this.image = new Image();
        this.image.src = './Kuvat/ConcreteWhite.png';
        this.isSolid = false
        this.health = 250000
        this.defence = 1000
    }
}

class SideWalk {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = "SideWalk";
        this.image = new Image();
        this.image.src = './Kuvat/Sidewalk.png';
        this.isSolid = false
        this.health = 250000
        this.defence = 1000
    }
}