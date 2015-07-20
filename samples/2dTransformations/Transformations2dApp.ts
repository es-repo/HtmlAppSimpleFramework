class Transformations2dApp extends App {

    //private static rotateDelta: number = 0.01;
    //private rotateVector: BABYLON.Vector3;
    private image: ColorBuffer;
    private transformedImage: ColorBuffer;
    private imagePos: BABYLON.Vector3;
    private imageScale = new BABYLON.Vector2(1, 1);
    private rotateAngle = 0;
    private rotateDelta = 0.03;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
        //this.rotateVector = new BABYLON.Vector3(0, Object3dApp.rotateDelta, 0);
    }
    
    public set_image(urlOrBase64Data: string, onImageLoaded?: Function) {
        this.image = null;
        
        ColorBuffer.fromHtmlImage(urlOrBase64Data, cb => {
            this.image = cb;
            this.imagePos = new BABYLON.Vector3(
                (this.graphicOutput.get_width() - this.image.width) / 2,
                (this.graphicOutput.get_height() - this.image.height) / 2,
                0);

            var ts = Math.sqrt(this.image.width * this.image.width + this.image.height * this.image.height) >> 0;
            this.transformedImage = ColorBuffer.create(ts, ts);
            if (onImageLoaded)
                onImageLoaded();
        });
    }

    protected doLogicStep() {
        super.doLogicStep();
        this.rotateAngle += this.rotateDelta;
        //    Object3dApp.rotateScene(this.scene, this.rotateVector);
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.transformedImage.clear();
            ImageTransformer.rotate(this.image, this.transformedImage, this.rotateAngle);
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.transformedImage, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    }

    //public static rotateScene(scene: Scene, rotationDelta: BABYLON.Vector3) {
    //    for (var i = 0; i < scene.figures.length; i++) {
    //        var m = <Mesh>scene.figures[i];
    //        m.rotation.x += rotationDelta.x;
    //        m.rotation.y += rotationDelta.y;
    //        m.rotation.z += rotationDelta.z;
    //    }
    //}

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        super.handleKeyboardEvent(eventArgs);

        var k = eventArgs.pressedKey;

        var rotateDelta = 0.01;

        if (k == 37) {
            this.rotateDelta -= 0.01;
        }

        if (k == 39) {
            this.rotateDelta += 0.01;
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



