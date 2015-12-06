var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Transformations2dApp = (function (_super) {
    __extends(Transformations2dApp, _super);
    function Transformations2dApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.imageScalex = 1;
        this.imageScaley = 1;
        this.rotateAngle = 0.8;
        this.rotateDelta = 0.01;
    }
    Transformations2dApp.prototype.createScene = function (continuation) {
        var scene = new Scene();
        this.starZMax = 100;
        this.starZMin = scene.camera.position.z + 10;
        var r = 0.05;
        var d = 5;
        this.stars = [];
        for (var i = 0; i < 300; i++) {
            var fi = 2 * Math.PI * Math.random();
            var a = d / 2 + Math.random() * d * 4;
            var x = a * Math.sin(fi);
            var y = a * Math.cos(fi);
            var z = this.starZMin + Math.random() * (Math.abs(this.starZMin) + this.starZMax);
            var s = new Circle();
            s.color = new BABYLON.Color4(1, 1, 1, 1);
            s.position = new BABYLON.Vector3(x, y, z);
            s.set_radius(r);
            scene.figures.push(s);
            this.stars.push(s);
        }
        continuation(scene);
    };
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
        for (var i = 0, p; i < this.stars.length; i++) {
            p = this.stars[i].position;
            p.z--;
            if (p.z < this.starZMin)
                p.z = this.starZMax;
        }
    };
    Transformations2dApp.prototype.drawFrame = function () {
        var _this = this;
        this.renderer2d.output.clear();
        this.renderer3d.drawScene(this.scene);
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
                this.renderer2d.drawImage(this.transImage2, this.imagePos.x + c.x, this.imagePos.y + c.y, this.imagePos.z, this.imageScaley, this.imageScaley);
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
        this.imageScalex += scaleDelta;
        this.imageScaley += scaleDelta;
        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
            this.scene.camera.position.x -= eventArgs.deltaX / 10;
            this.scene.camera.position.y += eventArgs.deltaY / 10;
        }
    };
    return Transformations2dApp;
})(App);
