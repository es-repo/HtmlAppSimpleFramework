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
        this.outlineDashShift = 0;
        this.imageScale = new BABYLON.Vector2(1, 1);
        this.showImage = true;
    }
    StencilApp.prototype.set_image = function (urlOrBase64Data) {
        var _this = this;
        this.image = null;
        this.imageScale.x = 1;
        this.imageScale.y = 1;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, function (cb) {
            _this.image = cb;
            _this.imagePos = new BABYLON.Vector3((_this.graphicOutput.get_width() - _this.image.width) / 2, (_this.graphicOutput.get_height() - _this.image.height) / 2, 0);
            var rendererOutput = new RendererOutput(ColorBuffer.create(_this.image.width, _this.image.height));
            _this.imageRenderer2d = new Renderer2d(rendererOutput);
            _this.outlines = Outliner.findOutlines(_this.image);
        });
    };
    StencilApp.prototype.set_showImage = function (v) {
        this.showImage = v;
    };
    StencilApp.prototype.doLogicStep = function () {
        _super.prototype.doLogicStep.call(this);
    };
    StencilApp.prototype.drawFrame = function () {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.imageRenderer2d.output.clear();
            if (this.showImage) {
                this.imageRenderer2d.drawImage(0, 0, 0, this.image);
            }
            this.drawOutlines();
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.imageRenderer2d.output.colorBuffer, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    };
    StencilApp.prototype.drawOutlines = function () {
        var dashLen = 5;
        var dashLen2 = dashLen * 2;
        var c = new BABYLON.Color4(0.8, 0, 0, 1);
        for (var i = 0; i < this.outlines.length; i++) {
            var o = this.outlines[i];
            for (var j = 0, d = this.outlineDashShift; j < o.length; j++, d++) {
                if (d % dashLen2 < dashLen)
                    this.imageRenderer2d.drawPoint(o[j].x, o[j].y, 0, c);
            }
        }
        ;
        this.outlineDashShift++;
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
