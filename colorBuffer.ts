class ColorBuffer extends Array1dAs2d<number> {

    constructor(array: number[], width: number) {
        super(array, width, 4);
    }

    public setColor(x: number, y: number, r: number, g: number, b: number, a: number) {
        var i = this.get_index(x, y);
        this.array[i] = r;
        this.array[i + 1] = g;
        this.array[i + 2] = b;
        this.array[i + 3] = a;
    }

    public clear() {
        this.setAll(0);
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