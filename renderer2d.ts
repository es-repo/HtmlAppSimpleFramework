class Renderer2d {

    private output: GraphicOutputBuffer;

    constructor(output: GraphicOutputBuffer) {
        this.output = output;
    }

    public drawPoint(x: number, y: number, z: number, color: BABYLON.Color4): void {

        if (x >= 0 && y >= 0 && x < this.output.width && y < this.output.height) {

            var index: number = ((x >> 0) + (y >> 0) * this.output.width);

            if (this.output.depthData[index] >= z) {
                this.output.depthData[index] = z;

                var index4: number = index * 4;
                this.output.colorData[index4] = color.r * 255;
                this.output.colorData[index4 + 1] = color.g * 255;
                this.output.colorData[index4 + 2] = color.b * 255;
                this.output.colorData[index4 + 3] = color.a * 255;
            }
        }
    }

    public drawLine(x0: number, y0: number, x1: number, y1, z: number, c: BABYLON.Color4): void {
        x0 = x0 >> 0;
        y0 = y0 >> 0;
        x1 = x1 >> 0;
        y1 = y1 >> 0;
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;

        while (true) {
            this.drawPoint(x0, y0, z, c);

            if ((x0 == x1) && (y0 == y1)) break;
            var e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

    public drawCircle(x: number, y: number, z: number, radius: number, color: BABYLON.Color4) {
        var x1 = radius;
        var y1 = 0;
        var radiusError = 1 - x1;

        while (x1 >= y1) {
            this.drawPoint(x1 + x, y1 + y, z, color);
            this.drawPoint(-x1 + x, y1 + y, z, color);

            this.drawPoint(y1 + x, x1 + y, z, color);
            this.drawPoint(-y1 + x, x1 + y, z, color);

            this.drawPoint(-x1 + x, -y1 + y, z, color);
            this.drawPoint(x1 + x, -y1 + y, z, color);

            this.drawPoint(-y1 + x, -x1 + y, z, color);
            this.drawPoint(y1 + x, -x1 + y, z, color);
            y1++;
            if (radiusError < 0) {
                radiusError += 2 * y1 + 1;
            }
            else {
                x1--;
                radiusError += 2 * (y1 - x1) + 1;
            }
        }
    }

    public drawFilledCircle(cx: number, cy: number, z: number, radius: number, color: BABYLON.Color4) {
        for (var y = -radius; y <= radius; y++)
            for (var x = -radius; x <= radius; x++)
                if (x * x + y * y <= radius * radius)
                    this.drawPoint(cx + x, cy + y, z, color);
    }
}