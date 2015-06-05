class HtmlCanvasDevice extends GraphicDevice {
    
    private workingContext: CanvasRenderingContext2D;
    private outputBuffer: GraphicOutputBuffer;
    private internalOutputBuffer: ImageData;

    constructor(canvasId: string) {
        super();
        var canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.workingContext = canvas.getContext("2d");
        this.internalOutputBuffer = this.workingContext.getImageData(0, 0, canvas.width, canvas.height);
        this.outputBuffer = new GraphicOutputBuffer(this.internalOutputBuffer.data, canvas.width, canvas.height);
    }

    public get_outputWidth() { return this.workingContext.canvas.width; }

    public get_outputHeight() { return this.workingContext.canvas.height; }

    public get_outputBuffer(): GraphicOutputBuffer { return this.outputBuffer; }

    public presentOutputBuffer() {
        this.workingContext.putImageData(this.internalOutputBuffer, 0, 0);
    }

    public drawFps(fps: number) {
        this.workingContext.font = "30px Verdana";
        var gradient = this.workingContext.createLinearGradient(0, 0, this.get_outputWidth() / 6, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");
        this.workingContext.fillStyle = gradient;
        this.workingContext.fillText(fps.toString(), 10, 30);
    }
} 