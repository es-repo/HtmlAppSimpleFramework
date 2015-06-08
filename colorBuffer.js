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
    return ColorBuffer;
})(Array1dAs2d);
