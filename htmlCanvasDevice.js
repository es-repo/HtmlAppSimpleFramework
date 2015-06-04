var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlCanvasDevice = (function (_super) {
    __extends(HtmlCanvasDevice, _super);
    function HtmlCanvasDevice(canvasId) {
        var canvas = document.getElementById(canvasId);
        _super.call(this, canvas.width, canvas.height);
        this.workingContext = canvas.getContext("2d");
    }
    HtmlCanvasDevice.prototype.clearInternal = function () {
        this.workingContext.clearRect(0, 0, this.get_workingWidth(), this.get_workingHeight());
        this.backbuffer = this.workingContext.getImageData(0, 0, this.get_workingWidth(), this.get_workingHeight());
    };
    HtmlCanvasDevice.prototype.present = function () {
        this.workingContext.putImageData(this.backbuffer, 0, 0);
    };
    HtmlCanvasDevice.prototype.putPixelInternal = function (index, color) {
        var index4 = index * 4;
        this.backbuffer.data[index4] = color.r * 255;
        this.backbuffer.data[index4 + 1] = color.g * 255;
        this.backbuffer.data[index4 + 2] = color.b * 255;
        this.backbuffer.data[index4 + 3] = color.a * 255;
    };
    HtmlCanvasDevice.prototype.drawFps = function (fps) {
        this.workingContext.font = "30px Verdana";
        var gradient = this.workingContext.createLinearGradient(0, 0, this.get_workingWidth() / 6, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");
        this.workingContext.fillStyle = gradient;
        this.workingContext.fillText(fps.toString(), 10, 30);
    };
    return HtmlCanvasDevice;
})(GraphicDevice);
//# sourceMappingURL=htmlCanvasDevice.js.map