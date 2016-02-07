class Figure {

    public position: BABYLON.Vector3 = BABYLON.Vector3.zero();
    public projectedPosition: BABYLON.Vector3 = BABYLON.Vector3.zero();
    
    public rotation: BABYLON.Vector3 = BABYLON.Vector3.zero();
    public velocity: BABYLON.Vector3 = BABYLON.Vector3.zero();
    public color: BABYLON.Color4 = new BABYLON.Color4(0, 0, 0, 0);

    public onSceneTick: (ticks: number) => void = ticks => { };

    public project(renderer: Renderer3d, worldMatrix: BABYLON.Matrix, transformMatrix: BABYLON.Matrix, rotMatrix: BABYLON.Matrix) {
        renderer.projectVector(this.position, transformMatrix, this.projectedPosition);
    }

    public draw(renderer: Renderer3d, light: Light) {        
    }
}

class Figure3d extends Figure {
}

class Figure2d extends Figure {
}

class Rectangle extends Figure2d {

    private tempVector: BABYLON.Vector3 = BABYLON.Vector3.zero();
    private tempVector2: BABYLON.Vector3 = BABYLON.Vector3.zero();  

    public size: BABYLON.Vector3 = BABYLON.Vector3.zero();
    public projectedSize: BABYLON.Vector3 = BABYLON.Vector3.zero();    

    public project(renderer: Renderer3d, worldMatrix: BABYLON.Matrix, transformMatrix: BABYLON.Matrix, rotMatrix: BABYLON.Matrix) {
        super.project(renderer, worldMatrix, transformMatrix, rotMatrix);
        this.position.copyTo(this.tempVector).add(this.size);        
        renderer.projectVector(this.tempVector, transformMatrix, this.tempVector2);
        this.projectedSize.x = (this.tempVector2.x - this.projectedPosition.x) * 2;
        this.projectedSize.y = (-this.tempVector2.y + this.projectedPosition.y) * 2;
    } 

    public draw(renderer: Renderer3d, light: Light) {                  
        renderer.renderer2d.drawRectangle(this.projectedPosition.x, this.projectedPosition.y - this.projectedSize.y,
            this.projectedPosition.z, this.projectedSize.x, this.projectedSize.y, this.color);
    }
}

class Circle extends Figure2d {

    private tempVector: BABYLON.Vector3 = BABYLON.Vector3.zero();
    private tempVector2: BABYLON.Vector3 = BABYLON.Vector3.zero();   
   
    public radius: number;
    public projectedRadius: number;    
    public get_square() { return this.radius * this.radius * Math.PI; }   
    
    public project(renderer: Renderer3d, worldMatrix: BABYLON.Matrix, transformMatrix: BABYLON.Matrix, rotMatrix: BABYLON.Matrix) {
        super.project(renderer, worldMatrix, transformMatrix, rotMatrix);
        this.position.copyTo(this.tempVector);
        this.tempVector.x += this.radius;
        renderer.projectVector(this.tempVector, transformMatrix, this.tempVector2);
        this.projectedRadius = (this.tempVector2.x - this.projectedPosition.x) * 2;
    } 

    public draw(renderer: Renderer3d, light: Light) {
        renderer.renderer2d.drawFilledCircle(this.projectedPosition.x, this.projectedPosition.y, this.projectedPosition.z, this.projectedRadius, this.color);
    }
}

class Sprite extends Rectangle {
    public image: ColorBuffer;

    constructor(image: ColorBuffer) {
        super();
        this.image = image;
    }

    public draw(renderer: Renderer3d, light: Light) {    
        var scalex = this.projectedSize.x / this.image.width;
        var scaley = this.projectedSize.y / this.image.height;
        var scaledHeight = this.projectedSize.y * scaley;
        renderer.renderer2d.drawImage(this.image, this.projectedPosition.x, this.projectedPosition.y - scaledHeight, this.projectedPosition.z, scalex, scaley);

        super.draw(renderer, light);
    }
}

class Tile extends Sprite {
    
    private fullSize: BABYLON.Vector3 = BABYLON.Vector3.zero();
    private fullProjectedSize: BABYLON.Vector3 = BABYLON.Vector3.zero();

    public countH = 1;
    public countV = 1;

    constructor(image) {
        super(image);
    }    

    public draw(renderer: Renderer3d, light: Light) {
        var scalex = this.projectedSize.x / this.image.width;
        var scaley = this.projectedSize.y / this.image.height;
        var scaledHeight = this.projectedSize.y * scaley;
        renderer.renderer2d.drawTiles(this.image, this.projectedPosition.x, this.projectedPosition.y - scaledHeight, this.projectedPosition.z, this.countH, this.countV, scalex, scaley);        
    }    
}