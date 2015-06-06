var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlCanvasOutput = (function (_super) {
    __extends(HtmlCanvasOutput, _super);
    function HtmlCanvasOutput(canvasId) {
        _super.call(this);
        var canvas = document.getElementById(canvasId);
        this.workingContext = canvas.getContext("2d");
        this.outputBuffer = this.workingContext.getImageData(0, 0, canvas.width, canvas.height);
    }
    HtmlCanvasOutput.prototype.get_width = function () {
        return this.workingContext.canvas.width;
    };
    HtmlCanvasOutput.prototype.get_height = function () {
        return this.workingContext.canvas.height;
    };
    HtmlCanvasOutput.prototype.get_buffer = function () {
        return this.outputBuffer.data;
    };
    HtmlCanvasOutput.prototype.drawBuffer = function () {
        this.workingContext.putImageData(this.outputBuffer, 0, 0);
    };
    HtmlCanvasOutput.prototype.drawFps = function (fps) {
        this.workingContext.font = "30px Verdana";
        var gradient = this.workingContext.createLinearGradient(0, 0, this.get_width() / 6, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");
        this.workingContext.fillStyle = gradient;
        this.workingContext.fillText(fps.toString(), 10, 30);
    };
    return HtmlCanvasOutput;
})(GraphicOutput);
//# sourceMappingURL=htmlCanvasDevice.js.map