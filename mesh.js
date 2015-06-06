var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    function Mesh(verticesCount, facesCount) {
        _super.call(this);
        this.vertices = new Array(verticesCount);
        this.projectedVertices = new Array(verticesCount);
        this.faces = new Array(facesCount);
    }
    return Mesh;
})(Figure);
