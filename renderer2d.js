var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Renderer2d = (function (_super) {
    __extends(Renderer2d, _super);
    function Renderer2d(output) {
        _super.call(this, output);
    }
    Renderer2d.prototype.drawPoint = function (x, y, z, c) {
        this.drawPointInternal(x, y, z, c.r * 255, c.g * 255, c.b * 255, c.a * 255);
    };
    Renderer2d.prototype.drawPointInternal = function (x, y, z, r, g, b, a) {
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
    };
    Renderer2d.prototype.drawLine = function (x0, y0, x1, y1, z, c) {
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
            if ((x0 == x1) && (y0 == y1))
                break;
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
    };
    Renderer2d.prototype.drawCircle = function (x, y, z, radius, color) {
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
    };
    Renderer2d.prototype.drawFilledCircle = function (cx, cy, z, radius, color) {
        for (var y = -radius; y <= radius; y++)
            for (var x = -radius; x <= radius; x++)
                if (x * x + y * y <= radius * radius)
                    this.drawPoint(cx + x, cy + y, z, color);
    };
    Renderer2d.prototype.drawImage = function (x, y, z, image, scale) {
        if (scale === void 0) { scale = 1; }
        for (var i = 0; i < image.height; i++) {
            var py = y + i;
            for (var j = 0; j < image.width; j++) {
                var px = x + j;
                var bi = image.get_index(j, i);
                this.drawPointInternal(px, py, z, image.array[bi], image.array[bi + 1], image.array[bi + 2], image.array[bi + 3]);
            }
        }
    };
    return Renderer2d;
})(Renderer);
