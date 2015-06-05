var GraphicDevice = (function () {
    function GraphicDevice() {
    }
    GraphicDevice.prototype.get_outputWidth = function () {
        throw new Error("Abstract method.");
    };
    GraphicDevice.prototype.get_outputHeight = function () {
        throw new Error("Abstract method.");
    };
    GraphicDevice.prototype.get_outputBuffer = function () {
        throw new Error("Abstract method.");
    };
    GraphicDevice.prototype.presentOutputBuffer = function () {
        throw new Error("Abstract method.");
    };
    GraphicDevice.prototype.drawFps = function (fps) {
        throw new Error("Abstract method.");
    };
    return GraphicDevice;
})();
//# sourceMappingURL=graphicDevice.js.map