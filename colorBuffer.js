var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ColorBuffer = (function (_super) {
    __extends(ColorBuffer, _super);
    function ColorBuffer(array, width) {
        _super.call(this, array, width, 4);
    }
    ColorBuffer.prototype.setColor = function (x, y, r, g, b, a) {
        var i = this.get_index(x, y);
        this.array[i] = r;
        this.array[i + 1] = g;
        this.array[i + 2] = b;
        this.array[i + 3] = a;
    };
    ColorBuffer.prototype.clear = function () {
        this.setAll(0);
    };
    ColorBuffer.create = function (width, height) {
        return new ColorBuffer(new Array(width * height * 4), width);
    };
    ColorBuffer.fromHtmlImage = function (urlOrBase64Data, continuation) {
        var image = new Image();
        image.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var internalContext = canvas.getContext("2d");
            internalContext.drawImage(image, 0, 0);
            var data = internalContext.getImageData(0, 0, image.width, image.height).data;
            var cb = new ColorBuffer(data, image.width);
            continuation(cb);
        };
        image.src = urlOrBase64Data;
    };
    return ColorBuffer;
})(Array1dAs2d);
