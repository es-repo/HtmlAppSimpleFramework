class HtmlCanvasOutput extends GraphicOutput {
    
    private canvasContext: CanvasRenderingContext2D;
    private outputBuffer: ImageData;

    constructor(canvasId: string) {
        super();
        var canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.canvasContext = canvas.getContext("2d");
        this.outputBuffer = this.canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    }

    public get_width() { return this.canvasContext.canvas.width; }

    public get_height() { return this.canvasContext.canvas.height; }

    public get_buffer(): number[] { return this.outputBuffer.data; }

    public drawBuffer() {
        this.canvasContext.putImageData(this.outputBuffer, 0, 0);
    }

    public drawText(text: string, x: number, y: number, color: string = "ffffff", size: number = 30, font: string = "Verdana") {
        this.canvasContext.font = size + "px " + font;
        this.canvasContext.fillStyle = "#" + color;
        this.canvasContext.fillText(text, x, y);
    }
} 