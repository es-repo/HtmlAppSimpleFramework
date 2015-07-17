var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlurApp = (function (_super) {
    __extends(BlurApp, _super);
    function BlurApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.imageScale = new BABYLON.Vector2(1, 1);
        this.radius = 0;
    }
    BlurApp.prototype.set_image = function (urlOrBase64Data, onImageLoaded) {
        var _this = this;
        this.image = null;
        this.imageScale.x = 1;
        this.imageScale.y = 1;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, function (cb) {
            _this.image = cb;
            _this.imagePos = new BABYLON.Vector3((_this.graphicOutput.get_width() - _this.image.width) / 2, (_this.graphicOutput.get_height() - _this.image.height) / 2, 0);
            _this.bluredImage = BlurApp.blurImage(_this.image, _this.radius);
            if (onImageLoaded)
                onImageLoaded();
        });
    };
    BlurApp.prototype.set_radius = function (v) {
        this.radius = v;
        if (this.image != null)
            this.bluredImage = BlurApp.blurImage(this.image, v);
    };
    BlurApp.prototype.doLogicStep = function () {
    };
    BlurApp.prototype.drawFrame = function () {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.bluredImage, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    };
    BlurApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
    };
    BlurApp.prototype.handleMouseEvent = function (eventArgs) {
        var scaleDelta = -eventArgs.wheelDelta * 0.001;
        this.imageScale.x += scaleDelta;
        this.imageScale.y += scaleDelta;
        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
        }
    };
    BlurApp.blurImage = function (image, radius) {
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
    };
    BlurApp.blurPixelH = function (x, y, simage, weights, radius, offset) {
        var s = x - radius;
        if (s < 0)
            s = 0;
        var e = x + radius;
        if (e > simage.width)
            e = simage.width;
        var sum = 0;
        var wsum = 0;
        for (var w = 0, i = s; i < e; i++, w++) {
            var idx = simage.get_index(i, y) + offset;
            sum += simage.array[idx] * weights[w];
            wsum += weights[w];
        }
        return sum / wsum;
    };
    BlurApp.blurPixelV = function (x, y, simage, weights, radius, offset) {
        var s = y - radius;
        if (s < 0)
            s = 0;
        var e = y + radius;
        if (e > simage.height)
            e = simage.height;
        var sum = 0;
        var wsum = 0;
        for (var w = 0, i = s; i < e; i++, w++) {
            var idx = simage.get_index(x, i) + offset;
            sum += simage.array[idx] * weights[w];
            wsum += weights[w];
        }
        return sum / wsum;
    };
    BlurApp.getWeights = function (radius) {
        //var f = x =>  (radius - x) / radius; 
        var sigma = radius / 3;
        var gauss = function (x) { return (1 / Math.sqrt(2 * Math.PI * sigma * sigma)) * Math.exp(-x * x / (2 * sigma * sigma)); };
        var w = new Array(radius * 2);
        for (var i = radius, x = 0; i < radius * 2; i++, x++) {
            w[i] = gauss(x);
        }
        for (var i = radius - 1, j = radius; i >= 0; i--, j++) {
            w[i] = w[j];
        }
        return w;
    };
    return BlurApp;
})(App);
