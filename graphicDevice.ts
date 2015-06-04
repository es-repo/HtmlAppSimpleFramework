// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx

class GraphicDevice extends OutputDevice {

    protected workingWidth: number;
    protected workingHeight: number;
    protected depthbuffer: number[];

    constructor(workingWidth: number, workingHeight: number) {
        super();
        this.workingWidth = workingWidth;
        this.workingHeight = workingHeight;
        this.depthbuffer = new Array(this.workingWidth * this.workingHeight);
    }

    public get_workingWidth() { return this.workingWidth; }

    public get_workingHeight() { return this.workingHeight; }

    public clear() {
        for (var i = 0; i < this.depthbuffer.length; i++) {
            this.depthbuffer[i] = 10000000; // Max possible value 
        }

        this.clearInternal();
    }

    protected clearInternal() {
        throw new Error("Abstract method.");
    }

    public present() {
        throw new Error("Abstract method.");
    }

    public drawFps(fps: number) {
        throw new Error("Abstract method.");
    }

    private putPixel(x: number, y: number, z: number, color: BABYLON.Color4) {
        var index: number = ((x >> 0) + (y >> 0) * this.workingWidth);

        if (this.depthbuffer[index] < z) {
            return; // Discard
        }

        this.depthbuffer[index] = z;
        this.putPixelInternal(index, color);
    }

    protected putPixelInternal(index: number, color: BABYLON.Color4) {
        throw new Error("Not implemented.");
    }

    public drawPoint(x: number, y: number, z: number, color: BABYLON.Color4): void {
        if (x >= 0 && y >= 0 && x < this.workingWidth&& y < this.workingHeight) {
            this.putPixel(x, y, z, color);
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
            this.drawPoint(x1 + x,  y1 + y, z, color);
            this.drawPoint(-x1 + x, y1 + y, z, color);

            this.drawPoint(y1 + x,  x1 + y, z, color);
            this.drawPoint(-y1 + x, x1 + y, z, color);

            this.drawPoint(-x1 + x, -y1 + y, z, color);
            this.drawPoint(x1 + x,  -y1 + y, z, color);

            this.drawPoint(-y1 + x, -x1 + y, z, color);
            this.drawPoint(y1 + x,  -x1 + y, z, color);
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

    //public drawFilledCircle(cx: number, cy: number, z: number, radius: number, color: BABYLON.Color4) {
    //    var error = -radius;
    //    var x = radius;
    //    var y = 0;

    //    while (x >= y) {
    //        var lastY = y;

    //        error += y;
    //        ++y;
    //        error += y;

    //        this.draw4Points(cx, cy, x, lastY, z, color);

    //        if (error >= 0) {
    //            if (x != lastY)
    //                this.draw4Points(cx, cy, lastY, x, z, color);

    //            error -= x;
    //            --x;
    //            error -= x;
    //        }
    //    }
    //}

    //private draw4Points(x0: number, y0: number, x1: number, y1: number, z: number, c: BABYLON.Color4) {
    //    this.drawLine(x0 - x1, y0 + y1, x0 + x1, y0 + y1, z, c);
    //    if (x1 != 0 && y1 != 0)
    //        this.drawLine(x0 - x1, y0 - y1, x0 + x1, y0 - y1, z, c);
    //}    

    public drawFilledCircle(cx: number, cy: number, z: number, radius: number, color: BABYLON.Color4) {
        for (var y= -radius; y <= radius; y++)
        for (var x= -radius; x <= radius; x++)
        if (x * x + y * y <= radius * radius)
            this.drawPoint(cx + x, cy + y, z, color);
    }
}