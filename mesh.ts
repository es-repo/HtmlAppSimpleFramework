class Mesh extends Figure {
    vertices: Vertex[];
    projectedVertices: Vertex[];
    faces: Face[];
    texture: Texture;

    constructor(verticesCount: number, facesCount: number) {
        super();
        this.vertices = new Array(verticesCount);
        this.projectedVertices = new Array(verticesCount);
        this.faces = new Array(facesCount);
    }
}