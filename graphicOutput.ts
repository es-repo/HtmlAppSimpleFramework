class GraphicOutput {
    
    public get_width(): number { throw new Error("Abstract method.");}

    public get_height(): number { throw new Error("Abstract method."); }

    public get_buffer(): number[] { throw new Error("Abstract method."); }

    public drawBuffer() { throw new Error("Abstract method."); }

    public drawText(text: string, x: number, y: number, color: string = "ffffff", size: number = 30, font: string = "Verdana") { throw new Error("Abstract method."); }
}