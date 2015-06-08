class PaintBrushApp extends App {

    private image: ColorBuffer;
    private imageRenderer2d: Renderer2d;
    
    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
        var imagewWidth = graphicOutput.get_width();
        var imageHeight = graphicOutput.get_height();
        this.image = ColorBuffer.create(imagewWidth, imageHeight);
        var rendererOutput = new RendererOutput(this.image);
        this.imageRenderer2d = new Renderer2d(rendererOutput);
    }

    protected createScene(continuation: (Scene: Scene) => void) {

        this.image.setAll(255);
        this.imageRenderer2d.drawFilledCircle(100, 100, 0, 80, new BABYLON.Color4(1, 0, 0, 1));

        var scene = new Scene();
        var sprite = new Sprite(this.image);
        scene.figures.push(sprite);

        var circle = new Circle();
        circle.set_radius(3);
        circle.position.x = -5;
        circle.color = new BABYLON.Color4(0, 1, 0, 1);
        scene.figures.push(circle);

        continuation(scene);
    }

    //protected drawFrame() {
    //    this.imageRenderer2d.drawFilledCircle(300, 300, 0, 100, new BABYLON.Color4(1, 1, 1, 1));
    //    this.graphicOutputRender2d.drawImage(0, 0, 0, this.imageRenderer2d.output.colorBuffer);
    //    //ColorBufferUtils.copy(this.renderer2d.output.colorBuffer, 0, 0, 500, 500, this.graphicOutput.get_buffer(), 0, 0);
    //    this.graphicOutput.drawBuffer();
    //}

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
        super.handleKeyboardEvent(eventArgs);
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {
        super.handleMouseEvent(eventArgs);

        if (eventArgs.leftButtonClicked) {
            var scale = this.scene.camera.position.z * 0.00055;
            this.scene.camera.direction.y += eventArgs.deltaY * scale;
            this.scene.camera.direction.x += eventArgs.deltaX * scale;
        }
    }
}