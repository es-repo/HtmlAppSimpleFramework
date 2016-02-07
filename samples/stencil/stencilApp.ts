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
        var hheight = 10; 
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

            a = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, 0);
            b = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, 0);
            c = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, 0);
            normal = new BABYLON.Vector3(0, 0, -1);
            l = j + 3;
            m = k + 1;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };


            a = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, hheight);
            b = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, 0);
            c = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, hheight);
            normal = BABYLON.Vector3.cross(a.subtract(b), c.subtract(b));
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
            b = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, 0);
            c = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, 0);
            normal = BABYLON.Vector3.cross(a.subtract(b), c.subtract(b));
            normal.normalize();
            l = j + 9;
            m = k + 3;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };


            a = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, hheight);
            b = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, 0);
            c = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, hheight);
            normal = BABYLON.Vector3.cross(a.subtract(b), c.subtract(b));
            normal.normalize();
            l = j + 12;
            m = k + 4;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };

            a = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, hheight);
            b = new BABYLON.Vector3(-t.b.x + xs, -t.b.y + ys, 0);
            c = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, 0);
            normal = BABYLON.Vector3.cross(a.subtract(b), c.subtract(b));
            normal.normalize();
            l = j + 15;
            m = k + 5;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };


            a = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, hheight);
            b = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, 0);
            c = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, hheight);
            normal = BABYLON.Vector3.cross(a.subtract(b), c.subtract(b));
            normal.normalize();
            l = j + 18;
            m = k + 6;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };

            a = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, hheight);
            b = new BABYLON.Vector3(-t.c.x + xs, -t.c.y + ys, 0);
            c = new BABYLON.Vector3(-t.a.x + xs, -t.a.y + ys, 0);
            normal = BABYLON.Vector3.cross(a.subtract(b), c.subtract(b));
            normal.normalize();
            l = j + 21;
            m = k + 7;
            mesh.vertices[l] = { coordinates: a, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 1] = { coordinates: b, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[l + 2] = { coordinates: c, normal: normal, textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[m] = { a: l, b: l + 1, c: l + 2 };
        };

        return mesh;
    }

    protected tick() {
    }

    protected drawFrame() {
        this.renderer2d.output.clear();
        if (this.image != null) {
            this.imageRenderer2d.output.clear();
            if (this.showImage) {
                this.imageRenderer2d.drawImage(this.image, 0, 0, 0);
            }
            this.drawOutlines();
            
            if (this.showPolygons) 
                this.drawPolygons();

            if (this.showMeshes)
                this.drawMeshes();
            console.log(this.imageScale.x + " " + this.imageScale.y);
            this.renderer2d.drawImage(this.imageRenderer2d.output.colorBuffer, this.imagePos.x, this.imagePos.y, this.imagePos.z, this.imageScale.x, this.imageScale.y);
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

    public createQuakeMap(): string {

        if (this.meshes == null)
            return "";


        var s = "// maze \n{ \n\"classname\" \"worldspawn\"\n";
        
        var scale = 50;

        var padding = 10;
        var wallsHeight = 50;
        var wallThikness = 5;
        var ww = (this.image.width + padding) * scale;
        var wl = (this.image.height + padding) * scale;
        var wh = wallsHeight * scale;

        s += StencilApp.createQaukeWalls(ww, wl, wh, wallThikness * scale);

        for (var i = 0, j = 0; i < this.meshes.length; i++) {
            var m = this.meshes[i];
            s += StencilApp.meshToQuakeBrushes(m, j, scale);
            j += m.faces.length;
        }

        s += "\n}\n";

        s += StencilApp.createQuakePlayerStart(ww, wl);
        s += StencilApp.createQuakeLights(ww, wl, wh, this.image.width / 32 >> 0);

        return s;
    }

    private static createQaukeWalls(w: number, l: number, h: number, thikness: number): string {

        var wallToS = wall => {
            var s = "//" + wall.bname + "\n{\n";
            for (var i = 0; i < wall.length; i++) {
                for (var j = 0; j < wall[i].length; j++) {
                    s += "( " + wall[i][j].join(" ") + " ) ";
                }
                s += "NULL 0 0 0 1 1 0 0 0\n";
            }
            return s + "}";    
        }

        var duplWall = (wall, ci, inc, name) => {
            var dw: any = [];
            dw.bname = name;
            for (var i = 0; i < wall.length; i++) {
                dw[i] = [];
                for (var j = 0; j < wall[i].length; j++) {
                    dw[i].push(wall[i][j].slice());
                    dw[i][j][ci] += inc;
                }
            }
            return dw;
        };

        var hw = w / 2;
        var hl = l / 2;

        var bottom: any = [];
        bottom[0] = [[0, 0, 0], [0, hl, 0], [hw, 0, 0]];
        bottom[1] = [[0, 0, -thikness], [hw, 0, -thikness], [0, hl, -thikness]];

        bottom[2] = [[-hw, 0, 0], [-hw, hl, 0], [-hw, 0, thikness]];
        bottom[3] = [[hw, 0, 0], [hw, 0, thikness], [hw, hl, 0]];

        bottom[4] = [[0, -hl, 0], [0, -hl, thikness], [hw, -hl, 0]];
        bottom[5] = [[0, hl, 0], [hw, hl, thikness], [0, hl, thikness]];
        bottom.bname = "wall bottom";

        var top = duplWall(bottom, 2, h + thikness, "wall top");


        var right: any = [];
        right[0] = [[0, 0, h], [0, hl, h], [hw, 0, h]];
        right[1] = [[0, 0, 0], [hw, 0, 0], [0, hl, 0]];

        right[2] = [[-hw, 0, 0], [-hw, hl, 0], [-hw, 0, thikness]];
        right[3] = [[hw, 0, 0], [hw, 0, thikness], [hw, hl, 0]];

        right[4] = [[0, -hl - thikness, 0], [0, -hl - thikness, thikness], [hw, -hl - thikness, 0]];
        right[5] = [[0, -hl, 0], [hw, -hl, thikness], [0, -hl, thikness]];
        right.bname = "wall right";

        var left = duplWall(right, 1, l + thikness, "wall left");


        var front: any = [];
        front[0] = [[0, 0, h], [0, hl, h], [hw, 0, h]];
        front[1] = [[0, 0, 0], [hw, 0, 0], [0, hl, 0]];

        front[2] = [[-hw - thikness, 0, 0], [-hw - thikness, hl, 0], [-hw - thikness, 0, thikness]];
        front[3] = [[-hw, 0, 0], [-hw, 0, thikness], [-hw, hl, 0]];

        front[4] = [[0, -hl, 0], [0, -hl, thikness], [hw, -hl, 0]];
        front[5] = [[0, hl, 0], [hw, hl, thikness], [0, hl, thikness]];
        front.bname = "wall front";

        var back = duplWall(front, 0, w + thikness, "wall back");

        return [bottom, top, right, left, front, back].map(wallToS).join("\n");
    }

    private static createQuakePlayerStart(w: number, l: number) {
        var shift = 30;
        var c = [-w / 2 + shift, -l / 2 + shift, shift];
        return "// player start \n{\n\"classname\" \"info_player_start\"\n\"origin\" \"" + c.join(" ") + "\"\n}\n";
    }

    private static createQuakeLights(w: number, l: number, h:number, n: number): string {
        var s = "";
        var dx = w / (n + 1);
        var dy = l / (n + 1);
        var z = h * 0.75;
        for (var i = 0; i < n; i++) {
            var y = -l/2 + dy + dy * i;
            for (var j = 0; j < n; j++) {
                var x = - w/2 + dx + dx * j;
                s += StencilApp.createQuakeLight(x, y, z, i * n + j);
            }
        }
        return s;
    }

    private static createQuakeLight(x: number, y: number, z: number, i: number): string {
        var s = "// " + "light " + i + "\n{\n\"classname\" \"light\"\n\"origin\" \"" + x + " " + y + " " + z + "\"\n\"light\" \"4000\"\n}\n";
        return s;
    }

    private static meshToQuakeBrushes(m: Mesh, startIndex: number, scale: number): string {
        var vToS = (v: Vertex) => "( " + v.coordinates.x * scale + " " + v.coordinates.y * scale + " " + v.coordinates.z * scale + " ) ";
        var fToS = (f: Face, m: Mesh) => vToS(m.vertices[f.a]) + vToS(m.vertices[f.b]) + vToS(m.vertices[f.c]) + "NULL 0 0 0 1 1 0 0 0\n";

        var s = "";
        for (var i = 0, j = startIndex; i < m.faces.length; i += 8, j++) {
            s += "\n// maze piece " + j + "\n{\n" + fToS(m.faces[i], m) + fToS(m.faces[i + 1], m) + fToS(m.faces[i + 2], m) + fToS(m.faces[i + 4], m) + fToS(m.faces[i + 6], m) + "}";
        }

        return s;
    }
}