class PaintBrushApp extends App {

    private renderer2d: Renderer2d;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
        this.renderer2d = this.renderer3d.renderer2d;
    }

    protected createRendererOutput(): RendererOutput {
        var size = 3000;
        return new RendererOutput(new ColorBuffer(new Array(size * size * 4), size));
    }

    protected onStart() {
        this.renderer2d.drawFilledCircle(300, 300, 0, 100, new BABYLON.Color4(1, 1, 1, 1));
    }

    protected drawFrame() {
        //ColorBufferUtils.copy(this.renderer2d.output.colorBuffer, 0, 0, 500, 500, this.graphicOutput.get_buffer(), 0, 0);
        this.graphicOutput.drawBuffer();
    }

    protected handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
    }

    protected handleMouseEvent(eventArgs: MouseEventArgs) {
    }
}