var App = (function () {
    function App(graphicDevice, inputDevices) {
        this.graphicDevice = graphicDevice;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
    }
    App.prototype.start = function () {
        var _this = this;
        this.createScene(function (scene) {
            _this.scene = scene;
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
        this.drawFrame(this.graphicDevice, this.scene);
        this.graphicDevice.drawFps(fps);
        requestAnimationFrame(function () { return _this.appLoop(); });
    };
    App.prototype.createScene = function (continuation) {
        continuation(new Scene());
    };
    App.prototype.processScene = function (scene, phisics) {
    };
    App.prototype.drawFrame = function (graphicDevice, scene) {
        var outputBuffer = graphicDevice.get_outputBuffer();
        //outputBuffer.clear();
        var renderer3d = new Renderer3d(outputBuffer);
        renderer3d.drawScene(this.scene);
        graphicDevice.presentOutputBuffer();
    };
    App.prototype.handleKeyboardEvent = function (eventArgs, scene) {
    };
    App.prototype.handleMouseEvent = function (eventArgs, scene) {
    };
    return App;
})();
//# sourceMappingURL=app.js.map