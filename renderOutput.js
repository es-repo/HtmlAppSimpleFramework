var RenderOutput = (function () {
    function RenderOutput(colorBuffer, w, h) {
        this.colorBuffer = colorBuffer;
        this.width = w;
        this.height = h;
        this.depthBuffer = new Array(w * h);
        this.clear();
    }
    RenderOutput.prototype.clear = function () {
        for (var i = 0; i < this.depthBuffer.length; i++) {
            var i4 = i * 4;
            this.colorBuffer[i4] = this.colorBuffer[i4 + 1] = this.colorBuffer[i4 + 2] = 0;
            this.colorBuffer[i4 + 3] = 1;
            this.depthBuffer[i] = 10000000; // Max possible value 
        }
    };
    return RenderOutput;
})();
//# sourceMappingURL=renderOutput.js.map