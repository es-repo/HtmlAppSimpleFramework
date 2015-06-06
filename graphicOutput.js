var GraphicOutput = (function () {
    function GraphicOutput() {
    }
    GraphicOutput.prototype.get_width = function () {
        throw new Error("Abstract method.");
    };
    GraphicOutput.prototype.get_height = function () {
        throw new Error("Abstract method.");
    };
    GraphicOutput.prototype.get_buffer = function () {
        throw new Error("Abstract method.");
    };
    GraphicOutput.prototype.drawBuffer = function () {
        throw new Error("Abstract method.");
    };
    GraphicOutput.prototype.drawText = function (text, x, y, color, size, font) {
        if (color === void 0) { color = "ffffff"; }
        if (size === void 0) { size = 30; }
        if (font === void 0) { font = "Verdana"; }
        throw new Error("Abstract method.");
    };
    return GraphicOutput;
})();
