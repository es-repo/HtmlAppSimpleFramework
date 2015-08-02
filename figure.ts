class Figure {

    protected boundingBox: BABYLON.Vector3[] = new Array(2);
    protected projectedBoundingBox: BABYLON.Vector3[] = new Array(2);

    public set_size(v: BABYLON.Vector3) {}

    public size: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public projectedSize: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public position: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public projectedPosition: BABYLON.Vector3 = BABYLON.Vector3.Zero();

    public get_boundingBox(): BABYLON.Vector3[] {
        this.boundingBox[0].x = this.position.x - this.size.x / 2;
        this.boundingBox[0].y = this.position.y - this.size.y / 2;
        this.boundingBox[1].x = this.position.x + this.size.x / 2;
        this.boundingBox[1].y = this.position.y + this.size.y / 2;
        return this.boundingBox;
    }

    public get_projectedBoundingBox(): BABYLON.Vector3[] {
        this.projectedBoundingBox[0].x = this.projectedPosition.x - this.projectedSize.x / 2;
        this.projectedBoundingBox[0].y = this.projectedPosition.y - this.projectedSize.y / 2;
        this.projectedBoundingBox[1].x = this.projectedPosition.x + this.projectedSize.x / 2;
        this.projectedBoundingBox[1].y = this.projectedPosition.y + this.projectedSize.y / 2;
        return this.projectedBoundingBox;
    }

    public rotation: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public velocity: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public color: BABYLON.Color4 = new BABYLON.Color4(0, 0, 0, 0);

    constructor() {
        this.boundingBox[0] = BABYLON.Vector3.Zero();
        this.boundingBox[1] = BABYLON.Vector3.Zero();
        this.projectedBoundingBox[0] = BABYLON.Vector3.Zero();
        this.projectedBoundingBox[1] = BABYLON.Vector3.Zero();
    }
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

    public get_boundingBox(): BABYLON.Vector3[] {
        super.get_boundingBox();
        this.boundingBox[1].x += (this.size.x * (this.countH - 1));
        this.boundingBox[1].y += (this.size.y * (this.countV - 1));
        return this.boundingBox;
    }

    public get_projectedBoundingBox(): BABYLON.Vector3[]{
        super.get_projectedBoundingBox();
        this.projectedBoundingBox[1].x += (this.projectedSize.x * (this.countH - 1));
        this.projectedBoundingBox[1].y += (this.projectedSize.y * (this.countV - 1));
        return this.projectedBoundingBox;
    }

    public get_fullSize(): BABYLON.Vector3 {
        this.fullSize.x = this.size.x * this.countH;
        this.fullSize.y = this.size.y * this.countV;
        return this.fullSize;
    }

    public get_fullProjectedSize(): BABYLON.Vector3 {
        this.fullProjectedSize.x = this.projectedSize.x * this.countH;
        this.fullProjectedSize.y = this.projectedSize.y * this.countV;
        return this.fullProjectedSize;
    }
}