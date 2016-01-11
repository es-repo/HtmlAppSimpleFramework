class Mesh extends Figure3d {
    vertices: Vertex[];
    projectedVertices: Vertex[];
    faces: Face[];
    texture: Texture;

    constructor(verticesCount: number, facesCount: number) {
        super();
        this.vertices = Mesh.createArrayOfVertexes(verticesCount);        
        this.projectedVertices = Mesh.createArrayOfVertexes(verticesCount);
        this.faces = new Array(facesCount);
    }

    private static createVertex(): Vertex {
        return {
            normal: BABYLON.Vector3.Zero(),
            coordinates: BABYLON.Vector3.Zero(),
            worldCoordinates: BABYLON.Vector3.Zero(),
            textureCoordinates: BABYLON.Vector2.Zero()
        }
    }

    private static createArrayOfVertexes(c: number): Vertex[] {
        var a = new Array(c);
        for (var i = 0; i < c; i++)
            a[i] = Mesh.createVertex();
        return a;
    }
}