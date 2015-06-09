var App = (function () {
    function App(graphicOutput, inputDevices) {
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
        this.renderer3d = new Renderer3d(this.createRendererOutput());
    }
    App.prototype.start = function () {
        var _this = this;
        this.onStart();
        this.createScene(function (scene) {
            _this.scene = scene;
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
    };
    App.prototype.onStart = function () {
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
        }
    };
    App.prototype.handleMouseEvent = function (eventArgs) {
        if (this.scene)
            this.scene.camera.position.z += eventArgs.wheelDelta / 50;
    };
    return App;
})();
