class RendererOutput {
    
    private depthBufferMaxValue = 10000000;
    public colorBuffer: ColorBuffer;
    public depthBuffer: Array1dAs2d<number>;
    public width: number;
    public height: number;

    constructor(colorBuffer: ColorBuffer) {
        this.colorBuffer = colorBuffer;
        this.width = colorBuffer.width;
        this.height = colorBuffer.height;
        this.depthBuffer = new Array1dAs2d(new Array(colorBuffer.width * colorBuffer.height), colorBuffer.width);
        this.resetDepthBuffer();
    }

    public clear() {
        for (var i = 0; i < this.colorBuffer.array.length; i++) {
            this.colorBuffer.array[i] = 0;  
        }
        this.resetDepthBuffer();
    }

    public checkDepth(x: number, y: number, z: number) {
        var i = this.depthBuffer.get_index(x, y);
        if (this.depthBuffer.array[i] >= z) {
            this.depthBuffer.array[i] = z;
            return true;
        }
        return false;
    }

    private resetDepthBuffer() {
        for (var i = 0; i < this.depthBuffer.array.length; i++) {
            this.depthBuffer.array[i] = this.depthBufferMaxValue; 
        }
    }
}