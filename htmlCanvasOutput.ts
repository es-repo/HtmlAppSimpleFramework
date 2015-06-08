class HtmlCanvasOutput extends GraphicOutput {
    
    private canvasContext: CanvasRenderingContext2D;
    private canvasImageData: ImageData;
    private colorBuffer: ColorBuffer;

    constructor(canvasId: string) {
        super();
        var canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.canvasContext = canvas.getContext("2d");
        this.canvasImageData = this.canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        this.colorBuffer = new ColorBuffer(this.canvasImageData.data, canvas.width);
    }

    public get_width() { return this.canvasContext.canvas.width; }

    public get_height() { return this.canvasContext.canvas.height; }

    public get_buffer(): ColorBuffer { return this.colorBuffer; }

    public drawBuffer() {
        this.canvasContext.putImageData(this.canvasImageData, 0, 0);
    }

    public drawText(text: string, x: number, y: number, color: string = "ffffff", size: number = 20, font: string = "Verdana") {
        this.canvasContext.font = size + "px " + font;
        this.canvasContext.fillStyle = "#" + color;
        this.canvasContext.fillText(text, x, y);
    }
} 