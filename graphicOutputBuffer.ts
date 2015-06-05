class GraphicOutputBuffer {
    
    public colorData: number[];
    public depthData: number[];
    public width: number;
    public height: number;

    constructor(outputBuffer: number[], w: number, h: number) {
        this.colorData = outputBuffer;
        this.width = w;
        this.height = h;
        this.depthData = new Array(w * h);
        this.clear();
    }

    public clear() {
        for (var i = 0; i < this.depthData.length; i++) {
            var index4: number = i * 4;
            this.colorData[index4] = this.colorData[index4 + 1] = this.colorData[index4 + 2]   = 0;
            this.colorData[index4 + 3] = 1;
            this.depthData[i] = 10000000; // Max possible value 
        }
    }
}