class GraphicDevice {
    
    public get_outputWidth(): number { throw new Error("Abstract method.");}

    public get_outputHeight(): number { throw new Error("Abstract method."); }

    public get_outputBuffer(): GraphicOutputBuffer { throw new Error("Abstract method."); }

    public presentOutputBuffer() { throw new Error("Abstract method."); }

    public drawFps(fps: number) { throw new Error("Abstract method."); }
}