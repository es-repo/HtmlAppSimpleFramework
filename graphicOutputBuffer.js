var GraphicOutputBuffer = (function () {
    function GraphicOutputBuffer(outputBuffer, w, h) {
        this.colorData = outputBuffer;
        this.width = w;
        this.height = h;
        this.depthData = new Array(w * h);
        this.clear();
    }
    GraphicOutputBuffer.prototype.clear = function () {
        for (var i = 0; i < this.depthData.length; i++) {
            var index4 = i * 4;
            this.colorData[index4] = this.colorData[index4 + 1] = this.colorData[index4 + 2] = 0;
            this.colorData[index4 + 3] = 1;
            this.depthData[i] = 10000000; // Max possible value 
        }
    };
    return GraphicOutputBuffer;
})();
//# sourceMappingURL=graphicOutputBuffer.js.map