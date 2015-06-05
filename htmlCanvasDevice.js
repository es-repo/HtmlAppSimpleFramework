var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlCanvasDevice = (function (_super) {
    __extends(HtmlCanvasDevice, _super);
    function HtmlCanvasDevice(canvasId) {
        _super.call(this);
        var canvas = document.getElementById(canvasId);
        this.workingContext = canvas.getContext("2d");
        this.internalOutputBuffer = this.workingContext.getImageData(0, 0, canvas.width, canvas.height);
        this.outputBuffer = new GraphicOutputBuffer(this.internalOutputBuffer.data, canvas.width, canvas.height);
    }
    HtmlCanvasDevice.prototype.get_outputWidth = function () {
        return this.workingContext.canvas.width;
    };
    HtmlCanvasDevice.prototype.get_outputHeight = function () {
        return this.workingContext.canvas.height;
    };
    HtmlCanvasDevice.prototype.get_outputBuffer = function () {
        return this.outputBuffer;
    };
    HtmlCanvasDevice.prototype.presentOutputBuffer = function () {
        this.workingContext.putImageData(this.internalOutputBuffer, 0, 0);
    };
    HtmlCanvasDevice.prototype.drawFps = function (fps) {
        this.workingContext.font = "30px Verdana";
        var gradient = this.workingContext.createLinearGradient(0, 0, this.get_outputWidth() / 6, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");
        this.workingContext.fillStyle = gradient;
        this.workingContext.fillText(fps.toString(), 10, 30);
    };
    return HtmlCanvasDevice;
})(GraphicDevice);
//# sourceMappingURL=htmlCanvasDevice.js.map