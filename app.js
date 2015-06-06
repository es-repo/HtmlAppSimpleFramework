var App = (function () {
    function App(graphicOutput, inputDevices) {
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
    }
    App.prototype.start = function () {
        var _this = this;
        this.createScene(function (scene) {
            _this.scene = scene;
            _this.renderer = _this.createRenderer(_this.graphicOutput);
            requestAnimationFrame(function () { return _this.appLoop(); });
            if (_this.inputDevices.keyboard != null)
                _this.inputDevices.keyboard.inputEvent.addHandler(function (args) { return _this.handleKeyboardEvent(args, _this.scene); });
            if (_this.inputDevices.mouse != null)
                _this.inputDevices.mouse.inputEvent.addHandler(function (args) { return _this.handleMouseEvent(args, _this.scene); });
        });
    };
    App.prototype.appLoop = function () {
        var _this = this;
        var now = new Date().getTime();
        var fps = 1000.0 / (now - this.previousFrameTime) >> 0;
        this.previousFrameTime = now;
        this.processScene(this.scene, this.phisics);
        this.drawFrame(this.graphicOutput, this.scene, this.renderer);
        this.drawFps(this.graphicOutput, fps);
        requestAnimationFrame(function () { return _this.appLoop(); });
    };
    App.prototype.createScene = function (continuation) {
        continuation(new Scene());
    };
    App.prototype.processScene = function (scene, phisics) {
    };
    App.prototype.createRenderer = function (graphicOutput) {
        var renderOutput = new RendererOutput(graphicOutput.get_buffer(), graphicOutput.get_width(), graphicOutput.get_height());
        return new Renderer3d(renderOutput);
    };
    App.prototype.drawFrame = function (graphicOutput, scene, renderer) {
        renderer.output.clear();
        renderer.drawScene(this.scene);
        graphicOutput.drawBuffer();
    };
    App.prototype.drawFps = function (graphicalOutput, fps) {
        graphicalOutput.drawText(fps.toString(), 10, 30);
    };
    App.prototype.handleKeyboardEvent = function (eventArgs, scene) {
    };
    App.prototype.handleMouseEvent = function (eventArgs, scene) {
    };
    return App;
})();
//# sourceMappingURL=app.js.map