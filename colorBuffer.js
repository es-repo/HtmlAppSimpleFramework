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
    ColorBuffer.prototype.setColor = function (x, y, c) {
        var i = this.get_index(x, y);
        this.array[i] = c.r * 255;
        this.array[i + 1] = c.g * 255;
        this.array[i + 2] = c.b * 255;
        this.array[i + 3] = c.a * 255;
    };
    ColorBuffer.create = function (width, height) {
        return new ColorBuffer(new Array(width * height * 4), width);
    };
    ColorBuffer.fromHtmlImage = function (urlOrData64, continuation) {
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
        image.src = urlOrData64;
    };
    return ColorBuffer;
})(Array1dAs2d);
