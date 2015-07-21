class BlurApp extends App {

    private image: ColorBuffer;
    private bluredImage: ColorBuffer;
    private imageScale = new BABYLON.Vector2(1, 1);
    private imagePos: BABYLON.Vector3;
    private radius = 0;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    public set_image(urlOrBase64Data: string, onImageLoaded?: Function) {
        this.image = null;
        this.imageScale.x = 1;
        this.imageScale.y = 1;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, cb => {
            this.image = cb;
            
            this.imagePos = new BABYLON.Vector3(
                (this.graphicOutput.get_width() - this.image.width) / 2,
                (this.graphicOutput.get_height() - this.image.height) / 2,
                0);

            this.bluredImage = ColorBuffer.create(this.image.width, this.image.height);
            ImageEffects.blur(this.image, this.bluredImage, this.radius);
            if (onImageLoaded)
                onImageLoaded();
        });
    }

    public set_radius(v: number) {
        this.radius = v;
        if (this.image != null)
            ImageEffects.blur(this.image, this.bluredImage, v);
    }

    protected doLogicStep() {
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.bluredImage, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
        super.handleKeyboardEvent(eventArgs);
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