var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PaintBrushApp = (function (_super) {
    __extends(PaintBrushApp, _super);
    function PaintBrushApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.renderer2d = this.renderer3d.renderer2d;
    }
    PaintBrushApp.prototype.createRendererOutput = function () {
        var size = 3000;
        return new RendererOutput(new ColorBuffer(new Array(size * size * 4), size));
    };
    PaintBrushApp.prototype.onStart = function () {
        this.renderer2d.drawFilledCircle(300, 300, 0, 100, new BABYLON.Color4(1, 1, 1, 1));
    };
    PaintBrushApp.prototype.drawFrame = function () {
        //ColorBufferUtils.copy(this.renderer2d.output.colorBuffer, 0, 0, 500, 500, this.graphicOutput.get_buffer(), 0, 0);
        this.graphicOutput.drawBuffer();
    };
    PaintBrushApp.prototype.handleKeyboardEvent = function (eventArgs) {
    };
    PaintBrushApp.prototype.handleMouseEvent = function (eventArgs) {
    };
    return PaintBrushApp;
})(App);
