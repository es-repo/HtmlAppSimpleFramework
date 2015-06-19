class ColorBuffer extends Array1dAs2d<number> {

    constructor(array: number[], width: number) {
        super(array, width, 4);
    }

    public setColor(x: number, y: number, c: BABYLON.Color4) {
        var i = this.get_index(x, y);
        this.array[i] = c.r * 255;
        this.array[i + 1] = c.g * 255;
        this.array[i + 2] = c.b * 255;
        this.array[i + 3] = c.a * 255;
    }

    public static create(width: number, height: number): ColorBuffer {
        return new ColorBuffer(new Array(width * height * 4), width);
    }

    public static fromHtmlImage(urlOrBase64Data: string, continuation: (cb: ColorBuffer) => void) {
        var image = new Image();
        image.onload = () => {
            var canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var internalContext: CanvasRenderingContext2D = canvas.getContext("2d");
            internalContext.drawImage(image, 0, 0);
            var data = internalContext.getImageData(0, 0, image.width, image.height).data;
            var cb = new ColorBuffer(data, image.width);
            continuation(cb);
        };
        image.src = urlOrBase64Data;
    }

}