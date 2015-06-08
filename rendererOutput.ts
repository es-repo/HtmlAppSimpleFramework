class RendererOutput {
    
    public colorBuffer: ColorBuffer;
    public depthBuffer: Array1dAs2d<number>;
    public width: number;
    public height: number;

    constructor(colorBuffer: ColorBuffer) {
        this.colorBuffer = colorBuffer;
        this.width = colorBuffer.width;
        this.height = colorBuffer.height;
        this.depthBuffer = new Array1dAs2d(new Array(colorBuffer.width * colorBuffer.height), colorBuffer.width);
        this.clear();
    }

    public clear() {
        for (var i = 0; i < this.colorBuffer.array.length; i++) {
            this.colorBuffer.array[i] = 0;  
        }

        for (var i = 0; i < this.depthBuffer.array.length; i++) {
            this.depthBuffer.array[i] = 10000000; // Max possible value 
        }
    }
}