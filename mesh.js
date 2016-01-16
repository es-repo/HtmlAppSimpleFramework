var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    function Mesh(verticesCount, facesCount) {
        _super.call(this);
        this.vertices = Mesh.createArrayOfVertexes(verticesCount);
        this.projectedVertices = Mesh.createArrayOfVertexes(verticesCount);
        this.faces = new Array(facesCount);
    }
    Mesh.prototype.project = function (renderer, worldMatrix, transformMatrix, rotMatrix) {
        for (var indexFaces = 0; indexFaces < this.faces.length; indexFaces++) {
            var currentFace = this.faces[indexFaces];
            renderer.projectVertex(this.vertices[currentFace.a], transformMatrix, worldMatrix, rotMatrix, this.projectedVertices[currentFace.a]);
            renderer.projectVertex(this.vertices[currentFace.b], transformMatrix, worldMatrix, rotMatrix, this.projectedVertices[currentFace.b]);
            renderer.projectVertex(this.vertices[currentFace.c], transformMatrix, worldMatrix, rotMatrix, this.projectedVertices[currentFace.c]);
        }
    };
    Mesh.prototype.draw = function (renderer, light) {
        var linesColor = new BABYLON.Color4(1, 1, 1, 1);
        for (var indexFaces = 0; indexFaces < this.faces.length; indexFaces++) {
            var currentFace = this.faces[indexFaces];
            var va = this.projectedVertices[currentFace.a];
            var vb = this.projectedVertices[currentFace.b];
            var vc = this.projectedVertices[currentFace.c];
            if (renderer.renderSettings.showFaces) {
                var color = new BABYLON.Color4(1, 1, 1, 1);
                renderer.drawTriangle(va, vb, vc, color, light, renderer.renderSettings.showTextures ? this.texture : null);
            }
            if (renderer.renderSettings.showMeshes) {
                renderer.renderer2d.drawLine(va.coordinates.x, va.coordinates.y, vb.coordinates.x, vb.coordinates.y, 0, linesColor);
                renderer.renderer2d.drawLine(vb.coordinates.x, vb.coordinates.y, vc.coordinates.x, vc.coordinates.y, 0, linesColor);
                renderer.renderer2d.drawLine(vc.coordinates.x, vc.coordinates.y, va.coordinates.x, va.coordinates.y, 0, linesColor);
            }
        }
    };
    Mesh.createVertex = function () {
        return {
            normal: BABYLON.Vector3.zero(),
            coordinates: BABYLON.Vector3.zero(),
            worldCoordinates: BABYLON.Vector3.zero(),
            textureCoordinates: BABYLON.Vector2.Zero()
        };
    };
    Mesh.createArrayOfVertexes = function (c) {
        var a = new Array(c);
        for (var i = 0; i < c; i++)
            a[i] = Mesh.createVertex();
        return a;
    };
    return Mesh;
})(Figure3d);
