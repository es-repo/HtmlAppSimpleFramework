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
        this.rotateAngle = 0;
        this.rotateDelta = 0.03;
        //this.rotateVector = new BABYLON.Vector3(0, Object3dApp.rotateDelta, 0);
    }
    Transformations2dApp.prototype.set_image = function (urlOrBase64Data, onImageLoaded) {
        var _this = this;
        this.image = null;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, function (cb) {
            _this.image = cb;
            _this.imagePos = new BABYLON.Vector3((_this.graphicOutput.get_width() - _this.image.width) / 2, (_this.graphicOutput.get_height() - _this.image.height) / 2, 0);
            var ts = Math.sqrt(_this.image.width * _this.image.width + _this.image.height * _this.image.height) >> 0;
            _this.transformedImage = ColorBuffer.create(ts, ts);
            if (onImageLoaded)
                onImageLoaded();
        });
    };
    Transformations2dApp.prototype.doLogicStep = function () {
        _super.prototype.doLogicStep.call(this);
        this.rotateAngle += this.rotateDelta;
        //    Object3dApp.rotateScene(this.scene, this.rotateVector);
    };
    Transformations2dApp.prototype.drawFrame = function () {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.transformedImage.clear();
            ImageTransformer.rotate(this.image, this.transformedImage, this.rotateAngle);
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.transformedImage, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    };
    //public static rotateScene(scene: Scene, rotationDelta: BABYLON.Vector3) {
    //    for (var i = 0; i < scene.figures.length; i++) {
    //        var m = <Mesh>scene.figures[i];
    //        m.rotation.x += rotationDelta.x;
    //        m.rotation.y += rotationDelta.y;
    //        m.rotation.z += rotationDelta.z;
    //    }
    //}
    Transformations2dApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
        var k = eventArgs.pressedKey;
        var rotateDelta = 0.01;
        if (k == 37) {
            this.rotateDelta -= 0.01;
        }
        if (k == 39) {
            this.rotateDelta += 0.01;
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
