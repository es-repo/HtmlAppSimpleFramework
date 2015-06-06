class RendererOutput {
    
    public colorBuffer: number[];
    public depthBuffer: number[];
    public width: number;
    public height: number;

    constructor(colorBuffer: number[], w: number, h: number) {
        this.colorBuffer = colorBuffer;
        this.width = w;
        this.height = h;
        this.depthBuffer = new Array(w * h);
        this.clear();
    }

    public clear() {
        for (var i = 0; i < this.depthBuffer.length; i++) {
            var i4: number = i * 4;
            this.colorBuffer[i4] = this.colorBuffer[i4 + 1] = this.colorBuffer[i4 + 2]   = 0;
            this.colorBuffer[i4 + 3] = 1;
            this.depthBuffer[i] = 10000000; // Max possible value 
        }
    }
}