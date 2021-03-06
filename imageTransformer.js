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
        for (var i = 0, iy = imovy; i < input.height; i++, iy++) {
            for (var j = 0, ix = imovx; j < input.width; j++, ix++) {
                var ox = ix * cos - iy * sin - omovx >> 0;
                var oy = ix * sin + iy * cos - omovy >> 0;
                if (ox >= 0 && ox < output.width && oy >= 0 && oy < output.height) {
                    var idx = input.get_index(j, i);
                    var oidx = output.get_index(ox, oy);
                    output.array[oidx] = input.array[idx];
                    output.array[oidx + 1] = input.array[idx + 1];
                    output.array[oidx + 2] = input.array[idx + 2];
                    output.array[oidx + 3] = input.array[idx + 3];
                    // Dirty fill potentially unfilled pixels. 
                    if (ox < output.width - 1) {
                        output.array[oidx + 4] = input.array[idx];
                        output.array[oidx + 5] = input.array[idx + 1];
                        output.array[oidx + 6] = input.array[idx + 2];
                        output.array[oidx + 7] = input.array[idx + 3];
                    }
                }
            }
        }
    };
    ImageTransformer.scale = function (input, output, scaleX, scaleY, x, y, filter) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (filter === void 0) { filter = null; }
        var sx = 0;
        if (x < 0) {
            sx = -x / scaleX >> 0;
            x = 0;
        }
        var sy = 0;
        if (y < 0) {
            sy = -y / scaleY >> 0;
            y = 0;
        }
        for (var iy = sy, oy = y >> 0, fullpy = 0; iy < input.height && oy < output.height; iy++) {
            fullpy += scaleY;
            if (fullpy >= 1 || (fullpy > 0.1 && iy == input.height - 1)) {
                while (fullpy > 0.1 && oy < output.height) {
                    for (var ix = sx, ox = x >> 0, fullpx = 0; ix < input.width && ox < output.width; ix++) {
                        fullpx += scaleX;
                        if (fullpx >= 1 || (fullpx > 0.1 && ix == input.width - 1)) {
                            while (fullpx > 0.1 && ox < output.width) {
                                if (filter == null || filter(ox, oy)) {
                                    output.copyColor(ox, oy, input, ix, iy);
                                }
                                fullpx--;
                                ox++;
                            }
                        }
                    }
                    fullpy--;
                    oy++;
                }
            }
        }
    };
    return ImageTransformer;
})();
