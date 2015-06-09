class Renderer2d extends Renderer {

    constructor(output: RendererOutput) {
        super(output);
    }

    public drawPoint(x: number, y: number, z: number, c: BABYLON.Color4): void {
        this.drawPointInternal(x, y, z, c.r * 255, c.g * 255, c.b * 255, c.a * 255);
    }

    private drawPointInternal(x: number, y: number, z: number, r: number, g: number, b: number, a: number) {
        x = x >> 0;
        y = y >> 0;
        if (x >= 0 && y >= 0 && x < this.output.width && y < this.output.height) {
            var i = this.output.depthBuffer.get_index(x, y);
            if (this.output.depthBuffer.array[i] >= z) {
                this.output.depthBuffer.array[i] = z;
                var i4 = i * 4;
                this.output.colorBuffer.array[i4] = r;
                this.output.colorBuffer.array[i4 + 1] = g;
                this.output.colorBuffer.array[i4 + 2] = b;
                this.output.colorBuffer.array[i4 + 3] = a;
            }
        }
    }

    public drawLine(x0: number, y0: number, x1: number, y1: number, z: number, c: BABYLON.Color4): void {
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

    public drawImage(x: number, y: number, z: number, image: ColorBuffer, scale: BABYLON.Vector2 = null) {
        if (scale == null)
            scale = new BABYLON.Vector2(0, 0);
        
        
        for (var i = 0, py = y, fullpy = 0; i < image.height; i++) {
            fullpy += scale.y;
            if (fullpy >= 1) {
                while (fullpy >= 1) {
                    for (var j = 0, px = x, fullpx = 0; j < image.width; j++) {
                        fullpx += scale.x;
                        if (fullpx >= 1) {
                            while (fullpx >= 1) {
                                var bi = image.get_index(j, i);
                                this.drawPointInternal(px, py, z, image.array[bi], image.array[bi + 1], image.array[bi + 2], image.array[bi + 3]);
                                fullpx--;
                                px++;
                            }
                        }
                    }
                    fullpy--;
                    py++;
                }
            }
        }
    }
}