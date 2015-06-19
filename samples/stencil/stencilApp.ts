class StencilApp extends App {

    private image: ColorBuffer;
    private outlines: { x: number; y: number }[][];
    private outlineDashShift = 0;
    private imageScale = new BABYLON.Vector2(1, 1);
    private imagePos:BABYLON.Vector3;
    private imageRenderer2d: Renderer2d;
    private showImage = true;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    public set_image(urlOrBase64Data: string) {
        this.image = null;
        this.imageScale.x = 1;
        this.imageScale.y = 1;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, cb => {
            this.image = cb;

            this.imagePos = new BABYLON.Vector3(
                (this.graphicOutput.get_width() - this.image.width) / 2,
                (this.graphicOutput.get_height() - this.image.height) / 2,
                0);

            var rendererOutput = new RendererOutput(ColorBuffer.create(this.image.width, this.image.height));
            this.imageRenderer2d = new Renderer2d(rendererOutput);
            this.outlines = Outliner.findOutlines(this.image);
        });
    }

    public set_showImage(v: boolean) {
        this.showImage = v;
    }

    protected doLogicStep() {
        super.doLogicStep();
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.imageRenderer2d.output.clear();
            if (this.showImage) {
                this.imageRenderer2d.drawImage(0, 0, 0, this.image);
            }
            this.drawOutlines();
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.imageRenderer2d.output.colorBuffer, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    }

    private drawOutlines() {
        var dashLen = 5;
        var dashLen2 = dashLen * 2;
        var c = new BABYLON.Color4(0.8, 0, 0, 1);
        for (var i = 0; i < this.outlines.length; i++) {
            var o = this.outlines[i];
            for (var j = 0, d = this.outlineDashShift; j < o.length; j++ , d++) {
                if (d % dashLen2 < dashLen)
                    this.imageRenderer2d.drawPoint(o[j].x, o[j].y, 0, c);
            }
        };
        this.outlineDashShift++;
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