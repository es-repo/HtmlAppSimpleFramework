// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Render3dSettings = (function () {
    function Render3dSettings() {
        this.showTextures = true;
        this.showMeshes = false;
        this.showFaces = true;
    }
    return Render3dSettings;
})();
var Renderer3d = (function (_super) {
    __extends(Renderer3d, _super);
    function Renderer3d(output) {
        _super.call(this, output);
        this.renderSettings = new Render3dSettings();
        this.renderer2d = new Renderer2d(output);
    }
    Renderer3d.prototype.get_viewProjectionMatrix = function (camera) {
        var viewMatrix = BABYLON.Matrix.LookAtLH(camera.position, camera.position.add(camera.direction), camera.up);
        var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(camera.fov, this.output.width / this.output.height, camera.zNear, camera.zFar);
        return viewMatrix.multiply(projectionMatrix);
    };
    Renderer3d.prototype.projectScene = function (scene) {
        var viewProjectionMatrix = this.get_viewProjectionMatrix(scene.camera);
        for (var i = 0; i < scene.figures.length; i++) {
            var f = scene.figures[i];
            var rotMatrix = BABYLON.Matrix.RotationYawPitchRoll(f.rotation.y, f.rotation.x, f.rotation.z);
            var worldMatrix = rotMatrix.multiply(BABYLON.Matrix.Translation(f.position.x, f.position.y, f.position.z));
            var transformMatrix = worldMatrix.multiply(viewProjectionMatrix);
            this.projectFigure(f, worldMatrix, transformMatrix, rotMatrix);
        }
    };
    Renderer3d.prototype.projectVector = function (v, transMat) {
        var point = BABYLON.Vector3.TransformCoordinates(v, transMat);
        var x = point.x * this.output.width + this.output.width / 2.0;
        var y = -point.y * this.output.height + this.output.height / 2.0;
        return (new BABYLON.Vector3(x, y, point.z));
    };
    Renderer3d.prototype.projectVertex = function (vertex, transMat, worldMat, rotMatrix) {
        var worldCoords = BABYLON.Vector3.TransformCoordinates(vertex.coordinates, worldMat);
        var normal = BABYLON.Vector3.TransformCoordinates(vertex.normal, rotMatrix);
        var coord = this.projectVector(vertex.coordinates, transMat);
        return ({
            coordinates: coord,
            normal: normal,
            worldCoordinates: worldCoords,
            textureCoordinates: vertex.textureCoordinates
        });
    };
    Renderer3d.prototype.projectFigure = function (f, worldMatrix, transformMatrix, rotMatrix) {
        f.projectedPosition = this.projectVector(f.position, transformMatrix);
        var posPlusSize = f.position.add(f.size);
        var posPlusSizeProjected = this.projectVector(posPlusSize, transformMatrix);
        f.projectedSize.x = (posPlusSizeProjected.x - f.projectedPosition.x) * 2;
        f.projectedSize.y = (-posPlusSizeProjected.y + f.projectedPosition.y) * 2;
        if (f instanceof Mesh) {
            this.projectMesh(f, worldMatrix, transformMatrix, rotMatrix);
        }
    };
    Renderer3d.prototype.projectMesh = function (m, worldMatrix, transformMatrix, rotMatrix) {
        for (var indexFaces = 0; indexFaces < m.faces.length; indexFaces++) {
            var currentFace = m.faces[indexFaces];
            var vertexA = m.vertices[currentFace.a];
            var vertexB = m.vertices[currentFace.b];
            var vertexC = m.vertices[currentFace.c];
            m.projectedVertices[currentFace.a] = this.projectVertex(vertexA, transformMatrix, worldMatrix, rotMatrix);
            m.projectedVertices[currentFace.b] = this.projectVertex(vertexB, transformMatrix, worldMatrix, rotMatrix);
            m.projectedVertices[currentFace.c] = this.projectVertex(vertexC, transformMatrix, worldMatrix, rotMatrix);
        }
    };
    Renderer3d.prototype.drawScene = function (scene) {
        this.projectScene(scene);
        for (var i = 0; i < scene.figures.length; i++) {
            this.drawFigure(scene.figures[i], scene.light);
        }
    };
    Renderer3d.prototype.drawFigure = function (f, light) {
        if (f instanceof Circle) {
            this.drawCircle(f);
        }
        else if (f instanceof Tile) {
            this.drawTile(f);
        }
        else if (f instanceof Sprite) {
            this.drawSprite(f);
        }
        else if (f instanceof Mesh) {
            this.drawMesh(f, light);
        }
    };
    Renderer3d.prototype.drawCircle = function (circle) {
        this.renderer2d.drawFilledCircle(circle.projectedPosition.x, circle.projectedPosition.y, circle.projectedPosition.z, circle.get_projectedRadius(), circle.color);
    };
    Renderer3d.prototype.drawSprite = function (sprite) {
        var scalex = sprite.projectedSize.x / sprite.image.width;
        var scaley = sprite.projectedSize.y / sprite.image.height;
        var x = sprite.projectedPosition.x - sprite.projectedSize.x / 2;
        var y = sprite.projectedPosition.y - sprite.projectedSize.y / 2;
        this.renderer2d.drawImage(sprite.image, x, y, sprite.projectedPosition.z, scalex, scaley);
    };
    Renderer3d.prototype.drawTile = function (tile) {
        var scalex = tile.projectedSize.x / tile.image.width;
        var scaley = tile.projectedSize.y / tile.image.height;
        var x = tile.projectedPosition.x - tile.projectedSize.x / 2;
        var y = tile.projectedPosition.y - tile.projectedSize.y / 2;
        this.renderer2d.drawTiles(tile.image, x, y, tile.projectedPosition.z, tile.countH, tile.countV, scalex, scaley);
    };
    Renderer3d.prototype.drawMesh = function (m, light) {
        var linesColor = new BABYLON.Color4(1, 1, 1, 1);
        for (var indexFaces = 0; indexFaces < m.faces.length; indexFaces++) {
            var currentFace = m.faces[indexFaces];
            var va = m.projectedVertices[currentFace.a];
            var vb = m.projectedVertices[currentFace.b];
            var vc = m.projectedVertices[currentFace.c];
            if (this.renderSettings.showFaces) {
                var color = new BABYLON.Color4(1, 1, 1, 1);
                this.drawTriangle(va, vb, vc, color, light, this.renderSettings.showTextures ? m.texture : null);
            }
            if (this.renderSettings.showMeshes) {
                this.renderer2d.drawLine(va.coordinates.x, va.coordinates.y, vb.coordinates.x, vb.coordinates.y, 0, linesColor);
                this.renderer2d.drawLine(vb.coordinates.x, vb.coordinates.y, vc.coordinates.x, vc.coordinates.y, 0, linesColor);
                this.renderer2d.drawLine(vc.coordinates.x, vc.coordinates.y, va.coordinates.x, va.coordinates.y, 0, linesColor);
            }
        }
    };
    Renderer3d.prototype.drawTriangle = function (v1, v2, v3, color, light, texture) {
        // Sorting the points in order to always have this order on screen p1, p2 & p3
        // with p1 always up (thus having the Y the lowest possible to be near the top screen)
        // then p2 between p1 & p3
        if (v1.coordinates.y > v2.coordinates.y) {
            var temp = v2;
            v2 = v1;
            v1 = temp;
        }
        if (v2.coordinates.y > v3.coordinates.y) {
            var temp = v2;
            v2 = v3;
            v3 = temp;
        }
        if (v1.coordinates.y > v2.coordinates.y) {
            var temp = v2;
            v2 = v1;
            v1 = temp;
        }
        var p1 = v1.coordinates;
        var p2 = v2.coordinates;
        var p3 = v3.coordinates;
        // computing the cos of the angle between the light vector and the normal vector
        // it will return a value between 0 and 1 that will be used as the intensity of the color
        //var ndotl = this.computeNDotL(centerPoint, vnFace, lightPos);
        var nl1 = this.computeNDotL(v1.worldCoordinates, v1.normal, light.position);
        var nl2 = this.computeNDotL(v2.worldCoordinates, v2.normal, light.position);
        var nl3 = this.computeNDotL(v3.worldCoordinates, v3.normal, light.position);
        var data = {};
        // computing lines' directions
        var dP1P2;
        var dP1P3;
        // http://en.wikipedia.org/wiki/Slope
        // Computing slopes
        if (p2.y - p1.y > 0)
            dP1P2 = (p2.x - p1.x) / (p2.y - p1.y);
        else
            dP1P2 = 0;
        if (p3.y - p1.y > 0)
            dP1P3 = (p3.x - p1.x) / (p3.y - p1.y);
        else
            dP1P3 = 0;
        if (dP1P2 > dP1P3) {
            for (var y = Math.max(p1.y >> 0, 0), ye = Math.min(p3.y >> 0, this.output.height); y <= ye; y++) {
                data.currentY = y;
                if (y < p2.y) {
                    data.ndotla = nl1;
                    data.ndotlb = nl3;
                    data.ndotlc = nl1;
                    data.ndotld = nl2;
                    data.ua = v1.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v2.textureCoordinates.x;
                    data.va = v1.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v2.textureCoordinates.y;
                    this.processScanLine(data, v1, v3, v1, v2, color, texture);
                }
                else {
                    data.ndotla = nl1;
                    data.ndotlb = nl3;
                    data.ndotlc = nl2;
                    data.ndotld = nl3;
                    data.ua = v1.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v2.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;
                    data.va = v1.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v2.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;
                    this.processScanLine(data, v1, v3, v2, v3, color, texture);
                }
            }
        }
        else {
            for (var y = Math.max(0, p1.y >> 0), ye = Math.min(this.output.height, p3.y >> 0); y <= ye; y++) {
                data.currentY = y;
                if (y < p2.y) {
                    data.ndotla = nl1;
                    data.ndotlb = nl2;
                    data.ndotlc = nl1;
                    data.ndotld = nl3;
                    data.ua = v1.textureCoordinates.x;
                    data.ub = v2.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;
                    data.va = v1.textureCoordinates.y;
                    data.vb = v2.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;
                    this.processScanLine(data, v1, v2, v1, v3, color, texture);
                }
                else {
                    data.ndotla = nl2;
                    data.ndotlb = nl3;
                    data.ndotlc = nl1;
                    data.ndotld = nl3;
                    data.ua = v2.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;
                    data.va = v2.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;
                    this.processScanLine(data, v2, v3, v1, v3, color, texture);
                }
            }
        }
    };
    Renderer3d.prototype.clamp = function (value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.max(min, Math.min(value, max));
    };
    Renderer3d.prototype.interpolate = function (min, max, gradient) {
        return min + (max - min) * this.clamp(gradient);
    };
    // drawing line between 2 points from left to right
    // papb -> pcpd
    // pa, pb, pc, pd must then be sorted before
    Renderer3d.prototype.processScanLine = function (data, va, vb, vc, vd, color, texture) {
        var pa = va.coordinates;
        var pb = vb.coordinates;
        var pc = vc.coordinates;
        var pd = vd.coordinates;
        // Thanks to current Y, we can compute the gradient to compute others values like
        // the starting X (sx) and ending X (ex) to draw between
        // if pa.Y == pb.Y or pc.Y == pd.Y, gradient is forced to 1
        var gradient1 = pa.y != pb.y ? (data.currentY - pa.y) / (pb.y - pa.y) : 1;
        var gradient2 = pc.y != pd.y ? (data.currentY - pc.y) / (pd.y - pc.y) : 1;
        var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0;
        var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;
        // starting Z & ending Z
        var z1 = this.interpolate(pa.z, pb.z, gradient1);
        var z2 = this.interpolate(pc.z, pd.z, gradient2);
        // Interpolating normals on Y
        var snl = this.interpolate(data.ndotla, data.ndotlb, gradient1);
        var enl = this.interpolate(data.ndotlc, data.ndotld, gradient2);
        // Interpolating texture coordinates on Y
        var su = this.interpolate(data.ua, data.ub, gradient1);
        var eu = this.interpolate(data.uc, data.ud, gradient2);
        var sv = this.interpolate(data.va, data.vb, gradient1);
        var ev = this.interpolate(data.vc, data.vd, gradient2);
        for (var x = Math.max(0, sx), exx = Math.min(ex, this.output.width); x < exx; x++) {
            var gradient = (x - sx) / (ex - sx);
            // Interpolating Z, normal and texture coordinates on X
            var z = this.interpolate(z1, z2, gradient);
            var ndotl = this.interpolate(snl, enl, gradient);
            var u = this.interpolate(su, eu, gradient);
            var v = this.interpolate(sv, ev, gradient);
            var textureColor = texture ? texture.map(u, v) : BABYLON.Color4.white;
            // changing the native color value using the cosine of the angle
            // between the light vector and the normal vector
            // and the texture color
            this.renderer2d.drawPointC(x, data.currentY, z, color.r * ndotl * textureColor.r * 255, color.g * ndotl * textureColor.g * 255, color.b * ndotl * textureColor.b * 255, 255);
        }
    };
    // Compute the cosine of the angle between the light vector and the normal vector
    // Returns a value between 0 and 1
    Renderer3d.prototype.computeNDotL = function (vertex, normal, lightPosition) {
        var lightDirection = lightPosition.subtract(vertex);
        lightDirection.normalize();
        return Math.max(0, BABYLON.Vector3.Dot(normal, lightDirection));
    };
    return Renderer3d;
})(Renderer);
