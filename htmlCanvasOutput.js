var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HtmlCanvasOutput = (function (_super) {
    __extends(HtmlCanvasOutput, _super);
    function HtmlCanvasOutput(canvasId) {
        _super.call(this);
        var canvas = document.getElementById(canvasId);
        this.canvasContext = canvas.getContext("2d");
        this.canvasImageData = this.canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        this.colorBuffer = new ColorBuffer(this.canvasImageData.data, canvas.width);
    }
    HtmlCanvasOutput.prototype.get_width = function () { return this.canvasContext.canvas.width; };
    HtmlCanvasOutput.prototype.get_height = function () { return this.canvasContext.canvas.height; };
    HtmlCanvasOutput.prototype.get_buffer = function () { return this.colorBuffer; };
    HtmlCanvasOutput.prototype.drawBuffer = function () {
        this.canvasContext.putImageData(this.canvasImageData, 0, 0);
    };
    HtmlCanvasOutput.prototype.drawText = function (text, x, y, color, size, font) {
        if (color === void 0) { color = "ffffff"; }
        if (size === void 0) { size = 20; }
        if (font === void 0) { font = "Verdana"; }
        this.canvasContext.font = size + "px " + font;
        this.canvasContext.fillStyle = "#" + color;
        this.canvasContext.fillText(text, x, y);
    };
    return HtmlCanvasOutput;
})(GraphicOutput);
