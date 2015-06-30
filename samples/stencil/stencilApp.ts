class StencilApp extends App {

    private image: ColorBuffer;
    private outlines: Coord[][];
    private outlineDashShift = 0;
    private polygonQuality = 10;
    private polygonShift = 0;
    private meshStencils: Triangle[][];
    public meshes: Mesh[];
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

    public set_image(urlOrBase64Data: string, onImageLoaded?: Function) {
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
            if (onImageLoaded)
                onImageLoaded();
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
        this.meshStencils = this.polygons.map(p => {
            try {
                return Triangulator.triangulate(p);
            } catch (e) {
                console.log(e);
                this.logPolygon(p);
                return [];
            }
        });
        this.meshes = this.meshStencils.map((s, i) => this.createMesh(s));
    }

    private createMesh(meshStencil: Triangle[]): Mesh {

        var mesh = new Mesh(meshStencil.length * 3 * 8, meshStencil.length * 8);
        var hheight = 5; 
        var xs = this.image.width / 2;
        var ys = this.image.height / 2;
        
        for (var a, b, c, normal, l, m, i = 0, j = 0, k = 0; i < meshStencil.length; i++, k+=8, j+=24) {
            var t = meshStencil[i];

            a = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, hheight);
            b = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, hheight);
            c = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, hheight);
            normal = new BABYLON.Vector3(0, 0, 1);
            l = j;
            m = k;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };

            a = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, -hheight);
            b = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, -hheight);
            c = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, -hheight);
            normal = new BABYLON.Vector3(0, 0, -1);
            l = j + 3;
            m = k + 1;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };


            a = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, hheight);
            b = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, hheight);
            c = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, -hheight);
            normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
            normal.normalize();
            l = j + 6;
            m = k + 2;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            
            mesh.vertices[l].normal = normal;
            mesh.vertices[l + 1].normal = normal;
            mesh.vertices[l + 2].normal = normal; 
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };

            a = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, hheight);
            b = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, -hheight);
            c = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, -hheight);
            normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
            normal.normalize();
            l = j + 9;
            m = k + 3;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };


            a = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, hheight);
            b = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, hheight);
            c = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, -hheight);
            normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
            normal.normalize();
            l = j + 12;
            m = k + 4;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };

            a = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, hheight);
            b = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, -hheight);
            c = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, -hheight);
            normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
            normal.normalize();
            l = j + 15;
            m = k + 5;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };


            a = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, hheight);
            b = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, hheight);
            c = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, -hheight);
            normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
            normal.normalize();
            l = j + 18;
            m = k + 6;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };

            a = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, hheight);
            b = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, -hheight);
            c = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, -hheight);
            normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
            normal.normalize();
            l = j + 21;
            m = k + 7;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };
        };

        //for (var i = 0, j = verticesFromStencilCount, e = facesFromStencilCount; i < polygon.length; i++, j++, e++) {
        //    var p1 = polygon[i];
        //    var p2 = polygon[(i + 1) % polygon.length];

        //    var a = new BABYLON.Vector3(-p1.x + xs, -p1.y + ys, hheight);
        //    var b = new BABYLON.Vector3(-p2.x + xs, -p2.y + ys, hheight);
        //    var c = new BABYLON.Vector3(-p1.x + xs, -p1.y + ys, -hheight);

        //    mesh.vertices[j] = { coordinates: a, normal: new BABYLON.Vector3(0, 0, 1), textureCoordinates: new BABYLON.Vector2(0, 0) };
        //    mesh.vertices[j + 1] = { coordinates: b, normal: new BABYLON.Vector3(0, 0, 1), textureCoordinates: new BABYLON.Vector2(0, 0) };
        //    mesh.vertices[j + 2] = { coordinates: c, normal: new BABYLON.Vector3(0, 0, 1), textureCoordinates: new BABYLON.Vector2(0, 0) };

        //    var normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
        //    normal.normalize();
        //    mesh.vertices[j].normal = normal;
        //    mesh.vertices[j + 1].normal = normal;
        //    mesh.vertices[j + 2].normal = normal; 

        //    mesh.faces[e] = { a: j, b: j + 1, c: j + 2 };
        //}

        return mesh;
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
        for (var i = 0; i < this.meshStencils.length; i++) {
            var m = this.meshStencils[i];
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