class BlurApp extends App {

    private image: ColorBuffer;
    private bluredImage: ColorBuffer;
    private imageScale = new BABYLON.Vector2(1, 1);
    private imagePos: BABYLON.Vector3;
    private radius = 0;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    public set_image(urlOrBase64Data: string, onImageLoaded?: Function) {
        this.image = null;
        this.imageScale.x = 1;
        this.imageScale.y = 1;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, cb => {
            this.image = cb;

            this.imagePos = new BABYLON.Vector3(
                (this.graphicOutput.get_width() - this.image.width) / 2,
                (this.graphicOutput.get_height() - this.image.height) / 2,
                0);

            this.bluredImage = BlurApp.blurImage(this.image, this.radius);
            if (onImageLoaded)
                onImageLoaded();
        });
    }

    public set_radius(v: number) {
        this.radius = v;
        if (this.image != null)
            this.bluredImage = BlurApp.blurImage(this.image, v);
    }

    protected doLogicStep() {
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.bluredImage, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
        super.handleKeyboardEvent(eventArgs);
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {

        var scaleDelta = -eventArgs.wheelDelta * 0.001;
        this.imageScale.x += scaleDelta;
        this.imageScale.y += scaleDelta;

        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
        }
    }

    private static blurImage(image: ColorBuffer, radius: number): ColorBuffer {

        if (radius == 0)
            return image;

        var bluredImage = ColorBuffer.create(image.width, image.height);
        var weights = BlurApp.getWeights(radius);
        var idx;
        for (var i = 0; i < image.height; i++) {
            for (var j = 0; j < image.width; j++) {
                idx = (i * image.width + j) * 4;
                bluredImage.array[idx] = BlurApp.blurPixelH(j, i, image, weights, radius, 0);
                bluredImage.array[idx + 1] = BlurApp.blurPixelH(j, i, image, weights, radius, 1);
                bluredImage.array[idx + 2] = BlurApp.blurPixelH(j, i, image, weights, radius, 2);
                bluredImage.array[idx + 3] = image.array[idx + 3];
            }
        }

        for (var i = 0; i < image.height; i++) {
            for (var j = 0; j < image.width; j++) {
                idx = (i * image.width + j) * 4;
                bluredImage.array[idx] = BlurApp.blurPixelV(j, i, bluredImage, weights, radius, 0);
                bluredImage.array[idx + 1] = BlurApp.blurPixelV(j, i, bluredImage, weights, radius, 1);
                bluredImage.array[idx + 2] = BlurApp.blurPixelV(j, i, bluredImage, weights, radius, 2);
            }
        }
        return bluredImage;
    }

    private static blurPixelH(x: number, y: number, simage: ColorBuffer, weights: number[], radius:number, offset: number): number {
        var s = x - radius;
        if (s < 0) s = 0;
        var e = x + radius;
        if (e > simage.width) e = simage.width;
        var sum = 0;
        var wsum = 0;
        for (var w = 0, i = s; i < e; i++, w++) {
            var idx = simage.get_index(i, y) + offset;
            sum += simage.array[idx] * weights[w];
            wsum += weights[w];
        }
         
        return sum / wsum;
    }

    private static blurPixelV(x: number, y: number, simage: ColorBuffer, weights: number[], radius: number, offset: number): number {
        var s = y - radius;
        if (s < 0) s = 0;
        var e = y + radius;
        if (e > simage.height) e = simage.height;
        var sum = 0;
        var wsum = 0;
        for (var w = 0, i = s; i < e; i++ , w++) {
            var idx = simage.get_index(x, i) + offset;
            sum += simage.array[idx] * weights[w];
            wsum += weights[w];
        }
        return sum / wsum;
    }

    private static getWeights(radius:number) : number[] {

        //var f = x =>  (radius - x) / radius; 
        var sigma = radius / 3;
        var gauss = x => (1 / Math.sqrt(2 * Math.PI * sigma * sigma)) * Math.exp(-x	* x / (2 * sigma * sigma));  

        var w = new Array(radius * 2);

        for (var i = radius, x = 0; i < radius * 2; i++, x++) {
            w[i] = gauss(x);
        }

        for (var i = radius - 1, j = radius; i >= 0; i--, j++) {
            w[i] = w[j];
        }
         
        return w;
    }
}