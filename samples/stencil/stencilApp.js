var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
        this.meshes = this.meshStencils.map(function (s) { return _this.createMesh(s); });
    };
    StencilApp.prototype.createMesh = function (meshStencil) {
        var mesh = new Mesh(meshStencil.length * 3 * 2, meshStencil.length * 2);
        var hheight = 10;
        var xs = this.image.width / 2;
        var ys = this.image.height / 2;
        for (var i = 0, j = 0, e = meshStencil.length, k = meshStencil.length * 3; i < meshStencil.length; i++, j += 3, e++, k += 3) {
            var s = meshStencil[i];
            mesh.vertices[j] = { coordinates: new BABYLON.Vector3(-s.a.x + xs, -s.a.y + ys, hheight), normal: new BABYLON.Vector3(0, 0, 1), textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[j + 1] = { coordinates: new BABYLON.Vector3(-s.b.x + xs, -s.b.y + ys, hheight), normal: new BABYLON.Vector3(0, 0, 1), textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[j + 2] = { coordinates: new BABYLON.Vector3(-s.c.x + xs, -s.c.y + ys, hheight), normal: new BABYLON.Vector3(0, 0, 1), textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[i] = { a: j, b: j + 1, c: j + 2 };
            mesh.vertices[k] = { coordinates: new BABYLON.Vector3(-s.a.x + xs, -s.a.y + ys, -hheight), normal: new BABYLON.Vector3(0, 0, -1), textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[k + 1] = { coordinates: new BABYLON.Vector3(-s.b.x + xs, -s.b.y + ys, -hheight), normal: new BABYLON.Vector3(0, 0, -1), textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.vertices[k + 2] = { coordinates: new BABYLON.Vector3(-s.c.x + xs, -s.c.y + ys, -hheight), normal: new BABYLON.Vector3(0, 0, -1), textureCoordinates: new BABYLON.Vector2(0, 0) };
            mesh.faces[e] = { a: k, b: k + 1, c: k + 2 };
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
    return StencilApp;
})(App);
