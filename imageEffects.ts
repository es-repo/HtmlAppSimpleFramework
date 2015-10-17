class ImageEffects {

    public static blur(input: ColorBuffer, output: ColorBuffer, radius: number) {

        if (radius < 1) {
            output.copy(input);
            return;
        }

        var weights = ImageEffects.getWeights(radius);
        var wsum = 0;
        for (var i = weights.length; i--;) {
            wsum += weights[i];
        }

        var idx;
        for (var i = 0; i < input.height; i++) {
            for (var j = 0; j < input.width; j++) {
                idx = (i * input.width + j) * 4;
                output.array[idx] = ImageEffects.blurPixelH(j, i, input, weights, wsum, radius, 0);
                output.array[idx + 1] = ImageEffects.blurPixelH(j, i, input, weights, wsum, radius, 1);
                output.array[idx + 2] = ImageEffects.blurPixelH(j, i, input, weights, wsum, radius, 2);
                output.array[idx + 3] = input.array[idx + 3];
            }
        }

        for (var i = 0; i < input.height; i++) {
            for (var j = 0; j < input.width; j++) {
                idx = (i * input.width + j) * 4;
                output.array[idx] = ImageEffects.blurPixelV(j, i, output, weights, wsum, radius, 0);
                output.array[idx + 1] = ImageEffects.blurPixelV(j, i, output, weights, wsum, radius, 1);
                output.array[idx + 2] = ImageEffects.blurPixelV(j, i, output, weights, wsum, radius, 2);
            }
        }
    }

    private static blurPixelH(x: number, y: number, simage: ColorBuffer, weights: number[], wsum: number, radius: number, offset: number): number {
        var s = x - radius;
        if (s < 0) s = 0;
        var e = x + radius;
        if (e > simage.width) e = simage.width;
        var sum = 0;
        for (var w = 0, i = s; i < e; i++ , w++) {
            var idx = simage.get_index(i, y) + offset;
            sum += simage.array[idx] * weights[w];
        }

        return sum / wsum;
    }

    private static blurPixelV(x: number, y: number, simage: ColorBuffer, weights: number[], wsum: number, radius: number, offset: number): number {
        var s = y - radius;
        if (s < 0) s = 0;
        var e = y + radius;
        if (e > simage.height) e = simage.height;
        var sum = 0;
        for (var w = 0, i = s; i < e; i++ , w++) {
            var idx = simage.get_index(x, i) + offset;
            sum += simage.array[idx] * weights[w];
        }
        return sum / wsum;
    }

    private static getWeights(radius: number): number[] {

        //var f = x =>  (radius - x) / radius; 
        var sigma = radius / 3;
        var gauss = x => (1 / Math.sqrt(2 * Math.PI * sigma * sigma)) * Math.exp(-x * x / (2 * sigma * sigma));

        var w = new Array(radius * 2);

        for (var i = radius, x = 0; i < radius * 2; i++ , x++) {
            w[i] = gauss(x);
        }

        for (var i = radius - 1, j = radius; i >= 0; i-- , j++) {
            w[i] = w[j];
        }

        return w;
    }
}