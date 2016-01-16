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

    public project(renderer: Renderer3d, worldMatrix: BABYLON.Matrix, transformMatrix: BABYLON.Matrix, rotMatrix: BABYLON.Matrix) {
        for (var indexFaces = 0; indexFaces < this.faces.length; indexFaces++) {
            var currentFace = this.faces[indexFaces];
            renderer.projectVertex(this.vertices[currentFace.a], transformMatrix, worldMatrix, rotMatrix, this.projectedVertices[currentFace.a]);
            renderer.projectVertex(this.vertices[currentFace.b], transformMatrix, worldMatrix, rotMatrix, this.projectedVertices[currentFace.b]);
            renderer.projectVertex(this.vertices[currentFace.c], transformMatrix, worldMatrix, rotMatrix, this.projectedVertices[currentFace.c]);
        }
    }

    public draw(renderer: Renderer3d, light: Light) {

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
    }

    private static createVertex(): Vertex {
        return {
            normal: BABYLON.Vector3.zero(),
            coordinates: BABYLON.Vector3.zero(),
            worldCoordinates: BABYLON.Vector3.zero(),
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