class HtmlCanvasDevice extends GraphicDevice {

    private workingContext: CanvasRenderingContext2D;
    private backbuffer: ImageData;

    constructor(canvasId: string) {
        var canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        super(canvas.width, canvas.height);
        this.workingContext = canvas.getContext("2d");
    }

    protected clearInternal() {
        this.workingContext.clearRect(0, 0, this.get_workingWidth(), this.get_workingHeight());
        this.backbuffer = this.workingContext.getImageData(0, 0, this.get_workingWidth(), this.get_workingHeight());
    }

    public present() {
        this.workingContext.putImageData(this.backbuffer, 0, 0);
    }

    public putPixelInternal(index: number, color: BABYLON.Color4): void {
        var index4: number = index * 4;
        this.backbuffer.data[index4] = color.r * 255;
        this.backbuffer.data[index4 + 1] = color.g * 255;
        this.backbuffer.data[index4 + 2] = color.b * 255;
        this.backbuffer.data[index4 + 3] = color.a * 255;
    }

    public drawFps(fps: number) {
        this.workingContext.font = "30px Verdana";
        var gradient = this.workingContext.createLinearGradient(0, 0, this.get_workingWidth() / 6, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");
        this.workingContext.fillStyle = gradient;
        this.workingContext.fillText(fps.toString(), 10, 30);
    }
} 