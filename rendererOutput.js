var RendererOutput = (function () {
    function RendererOutput(colorBuffer) {
        this.depthBufferMaxValue = 10000000;
        this.colorBuffer = colorBuffer;
        this.width = colorBuffer.width;
        this.widthHalf = this.width / 2;
        this.height = colorBuffer.height;
        this.heightHalf = this.height / 2;
        this.depthBuffer = new Array1dAs2d(new Array(colorBuffer.width * colorBuffer.height), colorBuffer.width);
        this.resetDepthBuffer();
    }
    RendererOutput.prototype.clear = function () {
        for (var i = 0; i < this.colorBuffer.array.length; i++) {
            this.colorBuffer.array[i] = 0;
        }
        this.resetDepthBuffer();
    };
    RendererOutput.prototype.checkDepth = function (x, y, z) {
        var i = this.depthBuffer.get_index(x, y);
        if (this.depthBuffer.array[i] >= z) {
            this.depthBuffer.array[i] = z;
            return true;
        }
        return false;
    };
    RendererOutput.prototype.resetDepthBuffer = function () {
        for (var i = 0; i < this.depthBuffer.array.length; i++) {
            this.depthBuffer.array[i] = this.depthBufferMaxValue;
        }
    };
    return RendererOutput;
})();
