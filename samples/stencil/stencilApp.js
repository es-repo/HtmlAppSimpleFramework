var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StencilApp = (function (_super) {
    __extends(StencilApp, _super);
    function StencilApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.imageScale = new BABYLON.Vector2(1, 1);
        this.imagePos = BABYLON.Vector3.Zero();
    }
    StencilApp.prototype.onStart = function (continuation) {
        var _this = this;
        ColorBuffer.fromHtmlImage("maze512.png", function (cb) {
            _this.image = cb;
            var rendererOutput = new RendererOutput(_this.image);
            _this.imageRenderer2d = new Renderer2d(rendererOutput);
            var outlines = Outliner.findOutlines(_this.image);
            var c = new BABYLON.Color4(0.2, 1, 0, 1);
            for (var i = 0; i < outlines.length; i++) {
                var o = outlines[i];
                for (var j = 0; j < o.length; j++) {
                    _this.imageRenderer2d.drawPoint(o[j].x, o[j].y, 0, c);
                }
            }
            continuation();
        });
    };
    StencilApp.prototype.doLogicStep = function () {
        _super.prototype.doLogicStep.call(this);
    };
    StencilApp.prototype.drawFrame = function () {
        this.renderer2d.output.clear();
        this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.image, this.imageScale);
        this.graphicOutput.drawBuffer();
    };
    StencilApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
    };
    StencilApp.prototype.handleMouseEvent = function (eventArgs) {
        var scaleDelta = -eventArgs.wheelDelta * 0.001;
        this.imageScale.x += scaleDelta;
        this.imageScale.y += scaleDelta;
        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
        }
    };
    return StencilApp;
})(App);
