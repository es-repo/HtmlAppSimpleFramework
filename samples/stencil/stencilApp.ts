class StencilApp extends App {

    private image: ColorBuffer;
    private imageScale = new BABYLON.Vector2(1, 1);
    private imagePos = BABYLON.Vector3.Zero();
    private imageRenderer2d: Renderer2d;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    protected onStart(continuation: () => void) {
        ColorBuffer.fromHtmlImage("maze512.png", cb => {
            this.image = cb;
            var rendererOutput = new RendererOutput(this.image);
            this.imageRenderer2d = new Renderer2d(rendererOutput);
            var outlines = Outliner.findOutlines(this.image);
            var c = new BABYLON.Color4(0.2, 1, 0, 1);
            for (var i = 0; i < outlines.length; i++) {
                var o = outlines[i];
                for (var j = 0; j < o.length; j++) {
                    this.imageRenderer2d.drawPoint(o[j].x, o[j].y, 0, c);
                }
            }
            continuation();
        });
    }

    protected doLogicStep() {
        super.doLogicStep();
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.image, this.imageScale);
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