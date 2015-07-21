class Transformations2dApp extends App {

    private image: ColorBuffer;
    private transImage1: ColorBuffer;
    private transImage2: ColorBuffer;
    private imagePos: BABYLON.Vector3;
    private imageScale = new BABYLON.Vector2(1, 1);
    private rotateAngle = 0.8;
    private rotateDelta = 0.01;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
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
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
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
                this.renderer2d.drawImage(this.imagePos.x + c.x, this.imagePos.y + c.y, this.imagePos.z, this.transImage2, this.imageScale);
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
        this.imageScale.x += scaleDelta;
        this.imageScale.y += scaleDelta;

        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
        }
    }    
}



