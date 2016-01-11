class Figure {

    public size: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public projectedSize: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public position: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public projectedPosition: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    
    public rotation: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public velocity: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public color: BABYLON.Color4 = new BABYLON.Color4(0, 0, 0, 0);
}

class Circle extends Figure {

    public get_diameter(): number { return this.size.x; }
    public set_diameter(d: number) { this.size.x = d; }
    public get_projectedDiameter(): number { return this.projectedSize.x; }

    public get_radius(): number { return this.get_diameter() / 2.0; }
    public set_radius(r: number) { this.set_diameter(r * 2); }
    public get_square() { return this.get_radius() * this.get_radius() * Math.PI; }
    public get_projectedRadius(): number { return this.get_projectedDiameter() / 2.0; }
}

class Sprite extends Figure {
    public image: ColorBuffer;

    constructor(image: ColorBuffer) {
        super();
        this.image = image;
    }
}

class Tile extends Sprite {
    
    private fullSize: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    private fullProjectedSize: BABYLON.Vector3 = BABYLON.Vector3.Zero();

    public countH = 1;
    public countV = 1;

    constructor(image) {
        super(image);
    }    
}