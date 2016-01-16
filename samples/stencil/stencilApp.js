var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StencilApp = (function (_super) {
    __extends(StencilApp, _super);
    function StencilApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.outlineDashShift = 0;
        this.polygonQuality = 10;
        this.polygonShift = 0;
        this.showMeshes = true;
        this.showPolygons = true;
        this.imageScale = new BABYLON.Vector2(1, 1);
        this.showImage = true;
    }
    StencilApp.prototype.set_image = function (urlOrBase64Data, onImageLoaded) {
        var _this = this;
        this.image = null;
        this.imageScale.x = 1;
        this.imageScale.y = 1;
        ColorBuffer.fromHtmlImage(urlOrBase64Data, function (cb) {
            _this.image = cb;
            _this.imagePos = new BABYLON.Vector3((_this.graphicOutput.get_width() - _this.image.width) / 2, (_this.graphicOutput.get_height() - _this.image.height) / 2, 0);
            var rendererOutput = new RendererOutput(ColorBuffer.create(_this.image.width, _this.image.height));
            _this.imageRenderer2d = new Renderer2d(rendererOutput);
            _this.outlines = Outliner.findOutlines(_this.image);
            _this.calculateMeshes();
            if (onImageLoaded)
                onImageLoaded();
        });
    };
    StencilApp.prototype.set_showImage = function (v) {
        this.showImage = v;
    };
    StencilApp.prototype.set_showPolygons = function (v) {
        this.showPolygons = v;
    };
    StencilApp.prototype.set_showMeshes = function (v) {
        this.showMeshes = v;
    };
    StencilApp.prototype.set_polygonQuality = function (v) {
        this.polygonQuality = v;
        if (this.image != null)
            this.calculateMeshes();
    };
    StencilApp.prototype.set_polygonShift = function (v) {
        this.polygonShift = v;
        if (this.image != null)
            this.calculateMeshes();
    };
    StencilApp.prototype.logPolygon = function (polygon) {
        var arr = [];
        for (var i = 0; i < polygon.length; i++) {
            var p = polygon[i];
            arr.push("{x: " + p.x + ", y: " + p.y + "}");
        }
        console.log(arr.join(", "));
    };
    StencilApp.prototype.calculateMeshes = function () {
        var _this = this;
        this.polygons = this.outlines.map(function (o) { return StencilApp.getPolygon(o, _this.polygonQuality, _this.polygonShift); });
        this.meshStencils = this.polygons.map(function (p) {
            try {
                return Triangulator.triangulate(p);
            }
            catch (e) {
                console.log(e);
                _this.logPolygon(p);
                return [];
            }
        });
        this.meshes = this.meshStencils.map(function (s, i) { return _this.createMesh(s); });
    };
    StencilApp.prototype.createMesh = function (meshStencil) {
        var mesh = new Mesh(meshStencil.length * 3 * 8, meshStencil.length * 8);
        var hheight = 10;
        var xs = this.image.width / 2;
        var ys = this.image.height / 2;
        for (var a, b, c, normal, l, m, i = 0, j = 0, k = 0; i < meshStencil.length; i++, k += 8, j += 24) {
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
        }
        ;
        return mesh;
    };
    StencilApp.prototype.doLogicStep = function () {
    };
    StencilApp.prototype.drawFrame = function () {
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
    };
    StencilApp.prototype.drawOutlines = function () {
        var dashLen = 5;
        var dashLen2 = dashLen * 2;
        var c = new BABYLON.Color4(0.8, 0, 0, 1);
        for (var i = 0; i < this.outlines.length; i++) {
            var o = this.outlines[i];
            for (var j = 0, d = this.outlineDashShift; j < o.length; j++, d++) {
                if (d % dashLen2 < dashLen)
                    this.imageRenderer2d.drawPoint(o[j].x, o[j].y, 0, c);
            }
        }
        ;
        this.outlineDashShift++;
    };
    StencilApp.prototype.drawPolygons = function () {
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
    };
    StencilApp.prototype.drawMeshes = function () {
        var color = new BABYLON.Color4(0, 1, 0, 1);
        for (var i = 0; i < this.meshStencils.length; i++) {
            var m = this.meshStencils[i];
            for (var j = 0; j < m.length; j++) {
                var t = m[j];
                this.imageRenderer2d.drawTriangle(t.a.x, t.a.y, t.b.x, t.b.y, t.c.x, t.c.y, 0, color);
            }
        }
    };
    StencilApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
    };
    StencilApp.prototype.handleMouseEvent = function (eventArgs) {
        var scaleDelta = -eventArgs.wheelDelta * 0.001;
        this.imageScale.x += scaleDelta;
        this.imageScale.y += scaleDelta;
        if (eventArgs.leftButtonClicked) {
            this.imagePos.x += eventArgs.deltaX;
            this.imagePos.y += eventArgs.deltaY;
        }
    };
    StencilApp.getPolygon = function (outline, quality, shift) {
        var p = [];
        for (var i = 0; i < outline.length; i += quality) {
            p.push(outline[(i + shift) % outline.length]);
        }
        p.reverse();
        return p;
    };
    StencilApp.prototype.createQuakeMap = function () {
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
    };
    StencilApp.createQaukeWalls = function (w, l, h, thikness) {
        var wallToS = function (wall) {
            var s = "//" + wall.bname + "\n{\n";
            for (var i = 0; i < wall.length; i++) {
                for (var j = 0; j < wall[i].length; j++) {
                    s += "( " + wall[i][j].join(" ") + " ) ";
                }
                s += "NULL 0 0 0 1 1 0 0 0\n";
            }
            return s + "}";
        };
        var duplWall = function (wall, ci, inc, name) {
            var dw = [];
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
        var bottom = [];
        bottom[0] = [[0, 0, 0], [0, hl, 0], [hw, 0, 0]];
        bottom[1] = [[0, 0, -thikness], [hw, 0, -thikness], [0, hl, -thikness]];
        bottom[2] = [[-hw, 0, 0], [-hw, hl, 0], [-hw, 0, thikness]];
        bottom[3] = [[hw, 0, 0], [hw, 0, thikness], [hw, hl, 0]];
        bottom[4] = [[0, -hl, 0], [0, -hl, thikness], [hw, -hl, 0]];
        bottom[5] = [[0, hl, 0], [hw, hl, thikness], [0, hl, thikness]];
        bottom.bname = "wall bottom";
        var top = duplWall(bottom, 2, h + thikness, "wall top");
        var right = [];
        right[0] = [[0, 0, h], [0, hl, h], [hw, 0, h]];
        right[1] = [[0, 0, 0], [hw, 0, 0], [0, hl, 0]];
        right[2] = [[-hw, 0, 0], [-hw, hl, 0], [-hw, 0, thikness]];
        right[3] = [[hw, 0, 0], [hw, 0, thikness], [hw, hl, 0]];
        right[4] = [[0, -hl - thikness, 0], [0, -hl - thikness, thikness], [hw, -hl - thikness, 0]];
        right[5] = [[0, -hl, 0], [hw, -hl, thikness], [0, -hl, thikness]];
        right.bname = "wall right";
        var left = duplWall(right, 1, l + thikness, "wall left");
        var front = [];
        front[0] = [[0, 0, h], [0, hl, h], [hw, 0, h]];
        front[1] = [[0, 0, 0], [hw, 0, 0], [0, hl, 0]];
        front[2] = [[-hw - thikness, 0, 0], [-hw - thikness, hl, 0], [-hw - thikness, 0, thikness]];
        front[3] = [[-hw, 0, 0], [-hw, 0, thikness], [-hw, hl, 0]];
        front[4] = [[0, -hl, 0], [0, -hl, thikness], [hw, -hl, 0]];
        front[5] = [[0, hl, 0], [hw, hl, thikness], [0, hl, thikness]];
        front.bname = "wall front";
        var back = duplWall(front, 0, w + thikness, "wall back");
        return [bottom, top, right, left, front, back].map(wallToS).join("\n");
    };
    StencilApp.createQuakePlayerStart = function (w, l) {
        var shift = 30;
        var c = [-w / 2 + shift, -l / 2 + shift, shift];
        return "// player start \n{\n\"classname\" \"info_player_start\"\n\"origin\" \"" + c.join(" ") + "\"\n}\n";
    };
    StencilApp.createQuakeLights = function (w, l, h, n) {
        var s = "";
        var dx = w / (n + 1);
        var dy = l / (n + 1);
        var z = h * 0.75;
        for (var i = 0; i < n; i++) {
            var y = -l / 2 + dy + dy * i;
            for (var j = 0; j < n; j++) {
                var x = -w / 2 + dx + dx * j;
                s += StencilApp.createQuakeLight(x, y, z, i * n + j);
            }
        }
        return s;
    };
    StencilApp.createQuakeLight = function (x, y, z, i) {
        var s = "// " + "light " + i + "\n{\n\"classname\" \"light\"\n\"origin\" \"" + x + " " + y + " " + z + "\"\n\"light\" \"4000\"\n}\n";
        return s;
    };
    StencilApp.meshToQuakeBrushes = function (m, startIndex, scale) {
        var vToS = function (v) { return "( " + v.coordinates.x * scale + " " + v.coordinates.y * scale + " " + v.coordinates.z * scale + " ) "; };
        var fToS = function (f, m) { return vToS(m.vertices[f.a]) + vToS(m.vertices[f.b]) + vToS(m.vertices[f.c]) + "NULL 0 0 0 1 1 0 0 0\n"; };
        var s = "";
        for (var i = 0, j = startIndex; i < m.faces.length; i += 8, j++) {
            s += "\n// maze piece " + j + "\n{\n" + fToS(m.faces[i], m) + fToS(m.faces[i + 1], m) + fToS(m.faces[i + 2], m) + fToS(m.faces[i + 4], m) + fToS(m.faces[i + 6], m) + "}";
        }
        return s;
    };
    return StencilApp;
})(App);
