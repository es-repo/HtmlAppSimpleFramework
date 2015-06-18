var RendererOutput = (function () {
    function RendererOutput(colorBuffer) {
        this.colorBuffer = colorBuffer;
        this.width = colorBuffer.width;
        this.height = colorBuffer.height;
        this.depthBuffer = new Array1dAs2d(new Array(colorBuffer.width * colorBuffer.height), colorBuffer.width);
        this.resetDepthBuffer();
    }
    RendererOutput.prototype.clear = function () {
        for (var i = 0; i < this.colorBuffer.array.length; i++) {
            this.colorBuffer.array[i] = 0;
        }
        this.resetDepthBuffer();
    };
    RendererOutput.prototype.resetDepthBuffer = function () {
        for (var i = 0; i < this.depthBuffer.array.length; i++) {
            this.depthBuffer.array[i] = 10000000; // Max possible value 
        }
    };
    return RendererOutput;
})();
