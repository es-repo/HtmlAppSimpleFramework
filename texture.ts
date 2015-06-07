class Texture {
    width: number;
    height: number;
    filename: string;
    internalBuffer: ImageData;

    // Working with a fix sized texture (512x512, 1024x1024, etc.).
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public load(filename: string): void {
        var image = new Image();
        image.height = this.height;
        image.width = this.width;
        image.onload = () => {
            var canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            var internalContext: CanvasRenderingContext2D = canvas.getContext("2d");
            internalContext.drawImage(image, 0, 0);
            this.internalBuffer = internalContext.getImageData(0, 0, this.width, this.height);
        };
        image.src = filename;
    }

    // Takes the U & V coordinates exported by Blender
    // and return the corresponding pixel color in the texture
    public map(tu: number, tv: number): BABYLON.Color4 {
        if (this.internalBuffer) {
            // using a % operator to cycle/repeat the texture if needed
            var u = Math.abs(((tu * this.width) % this.width)) >> 0;
            var v = Math.abs(((tv * this.height) % this.height)) >> 0;

            var pos = (u + v * this.width) * 4;

            var r = this.internalBuffer.data[pos];
            var g = this.internalBuffer.data[pos + 1];
            var b = this.internalBuffer.data[pos + 2];
            var a = this.internalBuffer.data[pos + 3];

            return new BABYLON.Color4(r / 255.0, g / 255.0, b / 255.0, a / 255.0);
        }
        // Image is not loaded yet
        else {
            return new BABYLON.Color4(1, 1, 1, 1);
        }
    }
}