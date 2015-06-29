class StencilApp extends App {

    private image: ColorBuffer;
    private outlines: Coord[][];
    private outlineDashShift = 0;
    private polygonQuality = 10;
    private polygonShift = 0;
    private meshes: Triangle[][];
    private showMeshes = true;
    private polygons: Coord[][];
    private showPolygons = true;
    private imageScale = new BABYLON.Vector2(1, 1);
    private imagePos: BABYLON.Vector3;
    private imageRenderer2d: Renderer2d;
    private showImage = true;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    public set_image(urlOrBase64Data: string) {
        this.image = null;
        this.imageScale.x = 1;
        this.imageScale.y = 1;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, cb => {
            this.image = cb;

            this.imagePos = new BABYLON.Vector3(
                (this.graphicOutput.get_width() - this.image.width) / 2,
                (this.graphicOutput.get_height() - this.image.height) / 2,
                0);

            var rendererOutput = new RendererOutput(ColorBuffer.create(this.image.width, this.image.height));
            this.imageRenderer2d = new Renderer2d(rendererOutput);
            this.outlines = Outliner.findOutlines(this.image);
            this.calculateMeshes();
        });
    }

    public set_showImage(v: boolean) {
        this.showImage = v;
    }

    public set_showPolygons(v: boolean) {
        this.showPolygons = v;
    }

    public set_showMeshes(v: boolean) {
        this.showMeshes = v;
    }

    public set_polygonQuality(v: number) {
        this.polygonQuality = v;
        if (this.image != null)
            this.calculateMeshes();
    }

    public set_polygonShift(v: number) {
        this.polygonShift = v;
        if (this.image != null)
            this.calculateMeshes();
    }

    private logPolygon(polygon: Coord[]) {
        var arr = [];
        for (var i = 0; i < polygon.length; i++) {
            var p = polygon[i];
            arr.push("{x: " + p.x + ", y: " + p.y + "}");
        }
        console.log(arr.join(", "));
    }

    private calculateMeshes() {
        this.polygons = this.outlines.map(o => StencilApp.getPolygon(o, this.polygonQuality, this.polygonShift));
        this.meshes = this.polygons.map(p => {
            try {
                return Triangulator.triangulate(p);
            } catch (e) {
                console.log(e);
                this.logPolygon(p);
                return [];
            }
            
        });
    }

    protected doLogicStep() {
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.imageRenderer2d.output.clear();
            if (this.showImage) {
                this.imageRenderer2d.drawImage(0, 0, 0, this.image);
            }
            this.drawOutlines();
            
            if (this.showPolygons) 
                this.drawPolygons();

            if (this.showMeshes)
                this.drawMeshes();
            this.renderer2d.drawImage(this.imagePos.x, this.imagePos.y, this.imagePos.z, this.imageRenderer2d.output.colorBuffer, this.imageScale);
        }
        this.graphicOutput.drawBuffer();
    }

    private drawOutlines() {
        var dashLen = 5;
        var dashLen2 = dashLen * 2;
        var c = new BABYLON.Color4(0.8, 0, 0, 1);
        for (var i = 0; i < this.outlines.length; i++) {
            var o = this.outlines[i];
            for (var j = 0, d = this.outlineDashShift; j < o.length; j++ , d++) {
                if (d % dashLen2 < dashLen)
                    this.imageRenderer2d.drawPoint(o[j].x, o[j].y, 0, c);
            }
        };
        this.outlineDashShift++;
    }

    private drawPolygons() {
        var colorStart = new BABYLON.Color4(1, 0, 0, 1);
        var color = new BABYLON.Color4(0, 1, 1, 1);
        var color1 = new BABYLON.Color4(1, 0.5, 0, 1);
        for (var i = 0; i < this.polygons.length; i++) {
            var p = this.polygons[i];
            for (var j = 0; j < p.length; j++) {
                var c = p[j];
                this.imageRenderer2d.drawFilledRectangle(c.x - 1, c.y - 1, 0, 3, 3, j == 0 ? colorStart : color);
            }
            this.imageRenderer2d.drawPolygon(p, 0, color1);
        }
    }

    private drawMeshes() {
        var color = new BABYLON.Color4(0, 1, 0, 1);
        for (var i = 0; i < this.meshes.length; i++) {
            var m = this.meshes[i];
            for (var j = 0; j < m.length; j++) {
                var t = m[j];
                this.imageRenderer2d.drawTriangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y, 0, color);
            }
        }
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
        super.handleKeyboardEvent(eventArgs);
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {

        var scaleDelta = -eventArgs.wheelDelta * 0.001;
        this.imageScale.x += scaleDelta;
        this.imageScale.y += scaleDelta;

        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
        }
    }

    private static getPolygon(outline: Coord[], quality: number, shift: number): Coord[] {
        var p = [];
        for (var i = 0; i < outline.length; i += quality) {
            p.push(outline[(i + shift) % outline.length]);
        }
        p.reverse();
        return p;
    }
}