var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Transformations2dApp = (function (_super) {
    __extends(Transformations2dApp, _super);
    function Transformations2dApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.imageScale = new BABYLON.Vector2(1, 1);
        this.rotateAngle = 0.8;
        this.rotateDelta = 0.01;
    }
    Transformations2dApp.prototype.set_image = function (urlOrBase64Data, onImageLoaded) {
        var _this = this;
        this.image = null;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, function (cb) {
            _this.image = cb;
            var ts = Math.sqrt(_this.image.width * _this.image.width + _this.image.height * _this.image.height) * 2 >> 0;
            _this.transImage1 = ColorBuffer.create(ts, ts);
            _this.transImage2 = ColorBuffer.create(ts, ts);
            _this.imagePos = new BABYLON.Vector3((_this.graphicOutput.get_width() - _this.transImage2.width) / 2, (_this.graphicOutput.get_height() - _this.transImage2.height) / 2, 0);
            if (onImageLoaded)
                onImageLoaded();
        });
    };
    Transformations2dApp.prototype.doLogicStep = function () {
        _super.prototype.doLogicStep.call(this);
        this.rotateAngle += this.rotateDelta;
    };
    Transformations2dApp.prototype.drawFrame = function () {
        var _this = this;
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.transImage1.clear();
            var co = new BABYLON.Vector2(180, 0);
            var c = new BABYLON.Vector2(0, 0);
            var scl = function (i, o, n) {
                var s = 0.2 * (n + 1);
                ImageTransformer.scale(i, o, s, s, (o.width - i.width * s) / 2, (o.height - i.height * s) / 2);
                c = co.scale(s);
            };
            var rot = function (i, o, n) {
                var angle = _this.rotateAngle * (n + 1);
                ImageTransformer.rotate(i, o, angle);
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                c.x = c.x * cos - c.y * sin >> 0;
                c.y = c.x * sin + c.y * cos >> 0;
            };
            for (var i = 0; i < 10; i++) {
                this.transImage1.clear();
                this.transImage2.clear();
                scl(this.image, this.transImage1, i);
                rot(this.transImage1, this.transImage2, i);
                this.renderer2d.drawImage(this.imagePos.x + c.x, this.imagePos.y + c.y, this.imagePos.z, this.transImage2, this.imageScale);
            }
        }
        this.graphicOutput.drawBuffer();
    };
    Transformations2dApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
        var k = eventArgs.pressedKey;
        if (k == 37) {
            this.rotateDelta -= 0.002;
        }
        if (k == 39) {
            this.rotateDelta += 0.003;
        }
        if (k == 32)
            this.rotateDelta = 0;
    };
    Transformations2dApp.prototype.handleMouseEvent = function (eventArgs) {
        var scaleDelta = -eventArgs.wheelDelta * 0.001;
        this.imageScale.x += scaleDelta;
        this.imageScale.y += scaleDelta;
        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
        }
    };
    return Transformations2dApp;
})(App);
