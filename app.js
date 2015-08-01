var App = (function () {
    function App(graphicOutput, inputDevices) {
        this.showDebugInfo = false;
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
        this.renderer3d = new Renderer3d(this.createRendererOutput());
        this.renderer2d = this.renderer3d.renderer2d;
    }
    App.prototype.start = function () {
        var _this = this;
        this.onStart(function () {
            _this.createScene(function (scene) {
                _this.scene = scene;
                _this.mouseWheelVectorControl = _this.scene.camera.position;
                requestAnimationFrame(function () { return _this.loopAnimation(); });
                if (_this.inputDevices.keyboard != null)
                    _this.inputDevices.keyboard.inputEvent.addHandler(function (args) {
                        _this.handleKeyboardEvent(args);
                    });
                if (_this.inputDevices.mouse != null)
                    _this.inputDevices.mouse.inputEvent.addHandler(function (args) {
                        _this.handleMouseEvent(args);
                    });
            });
        });
    };
    App.prototype.onStart = function (continuation) {
        continuation();
    };
    App.prototype.createRendererOutput = function () {
        return new RendererOutput(this.graphicOutput.get_buffer());
    };
    App.prototype.createScene = function (continuation) {
        continuation(new Scene());
    };
    App.prototype.loopAnimation = function () {
        var _this = this;
        this.doAnimationStep();
        requestAnimationFrame(function () { return _this.loopAnimation(); });
    };
    App.prototype.doAnimationStep = function () {
        var now = new Date().getTime();
        var fps = 1000.0 / (now - this.previousFrameTime) >> 0;
        this.previousFrameTime = now;
        this.doLogicStep();
        this.drawFrame();
        this.drawFps(fps);
        if (this.showDebugInfo)
            this.drawDebugInfo();
    };
    App.prototype.doLogicStep = function () {
        for (var i = 0; i < this.scene.figures.length; i++) {
            var f = this.scene.figures[i];
            f.position.x += f.velocity.x;
            f.position.y += f.velocity.y;
        }
    };
    App.prototype.drawFrame = function () {
        this.renderer3d.output.clear();
        this.renderer3d.drawScene(this.scene);
        this.graphicOutput.drawBuffer();
    };
    App.prototype.drawFps = function (fps) {
        this.graphicOutput.drawText(fps.toString(), 11, 26, "000000");
        this.graphicOutput.drawText(fps.toString(), 10, 25);
    };
    App.prototype.drawDebugInfo = function () {
        this.drawVectorInfo(this.scene.camera.position, 10, 40, "camera");
        this.drawVectorInfo(this.scene.light.position, 10, 50, "light");
    };
    App.prototype.drawVectorInfo = function (v, x, y, description) {
        if (description === void 0) { description = ""; }
        if (description != "")
            description += ": ";
        this.graphicOutput.drawText(description + "(" + v.x + "," + v.y + "," + v.z + ")", x, y, "ffffff", 10);
    };
    App.prototype.handleKeyboardEvent = function (eventArgs) {
        var k = eventArgs.pressedKey;
        var cameraDelta = 3;
        if (this.scene) {
            if (k == 189) {
                this.scene.camera.position.z += cameraDelta;
            }
            if (k == 187) {
                this.scene.camera.position.z -= cameraDelta;
            }
            if (k == 67)
                this.mouseWheelVectorControl = this.scene.camera.position;
            if (k == 76)
                this.mouseWheelVectorControl = this.scene.light.position;
        }
    };
    App.prototype.handleMouseEvent = function (eventArgs) {
        if (this.scene) {
            this.mouseWheelVectorControl.z += eventArgs.wheelDelta / 50;
        }
    };
    return App;
})();
