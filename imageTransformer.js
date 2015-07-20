var ImageTransformer = (function () {
    function ImageTransformer() {
    }
    ImageTransformer.rotate = function (input, output, angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var imovx = -input.width / 2;
        var imovy = -input.height / 2;
        var omovx = -output.width / 2;
        var omovy = -output.height / 2;
        for (var i = 0, iy = imovy, idx = 0; i < input.height; i++, iy++) {
            for (var j = 0, ix = imovx; j < input.width; j++, ix++, idx += 4) {
                var ox = Math.round(ix * cos - iy * sin - omovx) >> 0;
                var oy = Math.round(ix * sin + iy * cos - omovy) >> 0;
                var oidx = output.get_index(ox, oy);
                output.array[oidx] = input.array[idx];
                output.array[oidx + 1] = input.array[idx + 1];
                output.array[oidx + 2] = input.array[idx + 2];
                output.array[oidx + 3] = input.array[idx + 3];
                // Dirty fill potentially unfilled pixels. 
                if (j < input.width - 1) {
                    output.array[oidx + 4] = input.array[idx];
                    output.array[oidx + 5] = input.array[idx + 1];
                    output.array[oidx + 6] = input.array[idx + 2];
                    output.array[oidx + 7] = input.array[idx + 3];
                }
            }
        }
    };
    ImageTransformer.prototype.transform = function (input, output, x, y, scale, angle) {
    };
    return ImageTransformer;
})();
