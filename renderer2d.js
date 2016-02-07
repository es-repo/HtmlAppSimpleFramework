var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Renderer2d = (function (_super) {
    __extends(Renderer2d, _super);
    function Renderer2d(output) {
        _super.call(this, output);
    }
    Renderer2d.prototype.drawPoint = function (x, y, z, c) {
        this.drawPointC(x, y, z, c.r * 255, c.g * 255, c.b * 255, c.a * 255);
    };
    Renderer2d.prototype.drawPointC = function (x, y, z, r, g, b, a) {
        if (a == 0)
            return;
        x = x >> 0;
        y = y >> 0;
        if (x >= 0 && y >= 0 && x < this.output.width && y < this.output.height) {
            if (this.output.checkDepth(x, y, z)) {
                this.output.colorBuffer.setColor(x, y, r, g, b, a);
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
        var yb = Math.min(radius, this.output.height / 2);
        var xb = Math.min(radius, this.output.width / 2);
        for (var y = -yb; y <= yb; y++)
            for (var x = -xb; x <= xb; x++)
                if (x * x + y * y <= radius * radius)
                    this.drawPoint(cx + x, cy + y, z, color);
    };
    Renderer2d.prototype.drawImage = function (image, x, y, z, scalex, scaley) {
        var _this = this;
        if (scalex === void 0) { scalex = 1; }
        if (scaley === void 0) { scaley = 1; }
        ImageTransformer.scale(image, this.output.colorBuffer, scalex, scaley, x, y, function (ox, oy) { return _this.output.checkDepth(ox, oy, z); });
    };
    Renderer2d.prototype.drawTiles = function (image, x, y, z, countH, countV, scalex, scaley) {
        if (countV === void 0) { countV = 1; }
        if (scalex === void 0) { scalex = 1; }
        if (scaley === void 0) { scaley = 1; }
        for (var ty = 0, theight = image.height * scaley, py = y; ty < countV; ty++, py += theight) {
            for (var tx = 0, twidth = image.width * scalex, px = x; tx < countH; tx++, px += twidth) {
                this.drawImage(image, px, py, z, scalex, scaley);
            }
        }
    };
    Renderer2d.prototype.drawRectangle = function (x, y, z, width, height, color) {
        this.drawLine(x, y, x + width, y, z, color);
        this.drawLine(x + width, y, x + width, y + height, z, color);
        this.drawLine(x + width, y + height, x, y + height, z, color);
        this.drawLine(x, y + height, x, y, z, color);
    };
    Renderer2d.prototype.drawFilledRectangle = function (x, y, z, width, height, color) {
        var ye = y + height;
        var xe = x + width;
        for (var i = y; i <= ye; i++)
            this.drawLine(x, i, xe, i, z, color);
    };
    Renderer2d.prototype.drawPolygon = function (path, z, color) {
        for (var i = 0; i < path.length - 1; i++) {
            var p1 = path[i];
            var p2 = path[i + 1];
            this.drawLine(p1.x, p1.y, p2.x, p2.y, z, color);
        }
    };
    Renderer2d.prototype.drawTriangle = function (xa, ya, xb, yb, xc, yc, z, color) {
        this.drawLine(xa, ya, xb, yb, z, color);
        this.drawLine(xb, yb, xc, yc, z, color);
        this.drawLine(xc, yc, xa, ya, z, color);
    };
    return Renderer2d;
})(Renderer);
