class Renderer2d extends Renderer {

    constructor(output: RendererOutput) {
        super(output);
    }

    public drawPoint(x: number, y: number, z: number, c: BABYLON.Color4): void {
        this.drawPointC(x, y, z, c.r * 255, c.g * 255, c.b * 255, c.a * 255);
    }

    public drawPointC(x: number, y: number, z: number, r: number, g: number, b: number, a: number) {

        if (a == 0)
            return;

        x = x >> 0;
        y = y >> 0;
        if (x >= 0 && y >= 0 && x < this.output.width && y < this.output.height) {
            if (this.output.checkDepth(x, y, z)) {
                this.output.colorBuffer.setColor(x, y, r, g, b, a);
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
        var yb = Math.min(radius, this.output.height / 2);
        var xb = Math.min(radius, this.output.width / 2);
        for (var y = -yb; y <= yb; y++)
            for (var x = -xb; x <= xb; x++)
                if (x * x + y * y <= radius * radius)
                    this.drawPoint(cx + x, cy + y, z, color);
    }

    public drawImage(image: ColorBuffer, x: number, y: number, z: number, scalex = 1, scaley = 1) {
        ImageTransformer.scale(image, this.output.colorBuffer, scalex, scaley, x, y, (ox, oy) => this.output.checkDepth(ox, oy, z));
    }

    public drawTiles(image: ColorBuffer, x: number, y: number, z: number, countH: number, countV = 1, scalex = 1, scaley = 1) {
        for (var ty = 0, theight = image.height * scaley, py = y; ty < countV; ty++ , py += theight) {
            for (var tx = 0, twidth = image.width * scalex, px = x; tx < countH; tx++ , px += twidth) {
                this.drawImage(image, px, py, z, scalex, scaley);
            }
        }
    }

    public drawRectangle(x: number, y: number, z: number, width: number, height: number, color: BABYLON.Color4) {
        this.drawLine(x, y, x + width, y, z, color);
        this.drawLine(x + width, y, x + width, y + height, z, color);
        this.drawLine(x + width, y + height, x, y + height, z, color);
        this.drawLine(x, y + height, x, y, z, color);
    }

    public drawFilledRectangle(x: number, y: number, z: number, width: number, height: number, color: BABYLON.Color4) {
        for (var i = y; i < y + width; i++)
            this.drawLine(x, i, x + width - 1, i, z, color);
    }

    public drawPolygon(path: { x: number; y: number }[], z: number, color: BABYLON.Color4) {
        for (var i = 0; i < path.length - 1; i++) {
            var p1 = path[i];
            var p2 = path[i + 1];
            this.drawLine(p1.x, p1.y, p2.x, p2.y, z, color);
        }
    }

    public drawTriangle(xa: number, ya: number, xb: number, yb: number, xc: number, yc: number, z: number, color: BABYLON.Color4) {
        this.drawLine(xa, ya, xb, yb, z, color);
        this.drawLine(xb, yb, xc, yc, z, color);
        this.drawLine(xc, yc, xa, ya, z, color);
    }
}