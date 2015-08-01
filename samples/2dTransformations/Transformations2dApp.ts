class Transformations2dApp extends App {

    private image: ColorBuffer;
    private transImage1: ColorBuffer;
    private transImage2: ColorBuffer;
    private imagePos: BABYLON.Vector3;
    private imageScalex = 1;
    private imageScaley = 1;
    private rotateAngle = 0.8;
    private rotateDelta = 0.01;

    private starZMax;
    private starZMin;
    private stars: Circle[];
    
    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    protected createScene(continuation: (scene: Scene) => void) {
        var scene = new Scene();
        this.starZMax = 100;
        this.starZMin = scene.camera.position.z + 10;
        var r = 0.05;
        var d = 5;
        this.stars = [];
        for (var i = 0; i < 300; i++) {
            var fi = 2 * Math.PI * Math.random();
            var a = d / 2 + Math.random() * d * 4;
            var x = a * Math.sin(fi);
            var y = a * Math.cos(fi);
            var z = this.starZMin + Math.random() * (Math.abs(this.starZMin) + this.starZMax);
            var s = new Circle();
            s.color = new BABYLON.Color4(1, 1, 1, 1);
            s.position = new BABYLON.Vector3(x, y, z);
            s.set_radius(r);
            scene.figures.push(s);
            this.stars.push(s);
        }
        continuation(scene);
    }
    
    public set_image(urlOrBase64Data: string, onImageLoaded?: Function) {
        this.image = null;
        
        ColorBuffer.fromHtmlImage(urlOrBase64Data, cb => {
            this.image = cb;
            var ts = Math.sqrt(this.image.width * this.image.width + this.image.height * this.image.height) * 2 >> 0;
            this.transImage1 = ColorBuffer.create(ts, ts);
            this.transImage2 = ColorBuffer.create(ts, ts);

            this.imagePos = new BABYLON.Vector3(
                (this.graphicOutput.get_width() - this.transImage2.width) / 2,
                (this.graphicOutput.get_height() - this.transImage2.height) / 2,
                0);

            if (onImageLoaded)
                onImageLoaded();
        });
    }

    protected doLogicStep() {
        super.doLogicStep();
        this.rotateAngle += this.rotateDelta;
        for (var i = 0, p; i < this.stars.length; i++) {
            p = this.stars[i].position;
            p.z--;
            if (p.z < this.starZMin)
                p.z = this.starZMax;
        }
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        this.renderer3d.drawScene(this.scene);
        if (this.image != null) {
            this.transImage1.clear();
            
            var co = new BABYLON.Vector2(180, 0);
            var c = new BABYLON.Vector2(0,0);

            var scl = (i, o, n) => {
                var s = 0.2 * (n + 1);
                ImageTransformer.scale(i, o, s, s,(o.width - i.width * s) / 2,(o.height - i.height * s) / 2);
                c = co.scale(s);
            };
            
            var rot = (i, o, n) => {
                var angle = this.rotateAngle * (n + 1);
                ImageTransformer.rotate(i, o, angle);
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                c.x = c.x * cos - c.y * sin >> 0;
                c.y = c.x * sin + c.y * cos >> 0;
            };

            for (var i = 0; i < 10; i++) {
                this.transImage1.clear();
                this.transImage2.clear();
                scl(this.image, this.transImage1, i);
                rot(this.transImage1, this.transImage2, i);
                this.renderer2d.drawImage(this.transImage2, this.imagePos.x + c.x, this.imagePos.y + c.y, this.imagePos.z, this.imageScaley, this.imageScaley);
            }
        }
        this.graphicOutput.drawBuffer();
    }
    
    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        super.handleKeyboardEvent(eventArgs);

        var k = eventArgs.pressedKey;

        if (k == 37) {
            this.rotateDelta -= 0.002;
        }

        if (k == 39) {
            this.rotateDelta += 0.003;
        }

        if (k == 32)
            this.rotateDelta = 0;
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {

        var scaleDelta = -eventArgs.wheelDelta * 0.001;
        this.imageScalex += scaleDelta;
        this.imageScaley += scaleDelta;

        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
            this.scene.camera.position.x -= eventArgs.deltaX / 10;
            this.scene.camera.position.y += eventArgs.deltaY / 10;
        }
    }    
}



