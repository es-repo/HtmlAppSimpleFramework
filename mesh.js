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
    Mesh.createVertex = function () {
        return {
            normal: BABYLON.Vector3.Zero(),
            coordinates: BABYLON.Vector3.Zero(),
            worldCoordinates: BABYLON.Vector3.Zero(),
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
