var Array1dAs2d = (function () {
    function Array1dAs2d(array, width, step) {
        if (step === void 0) { step = 1; }
        this.array = array;
        this.width = width;
        this.height = array.length / width / step;
        this.step = step;
    }
    Array1dAs2d.prototype.get_index = function (x, y) {
        return (y * this.width + x) * this.step;
    };
    Array1dAs2d.prototype.get = function (x, y) {
        return this.array[this.get_index(x, y)];
    };
    Array1dAs2d.prototype.set = function (x, y, v) {
        return this.array[this.get_index(x, y)] = v;
    };
    Array1dAs2d.prototype.setAll = function (v) {
        for (var i = 0; i < this.array.length; i++)
            this.array[i] = v;
    };
    return Array1dAs2d;
})();
