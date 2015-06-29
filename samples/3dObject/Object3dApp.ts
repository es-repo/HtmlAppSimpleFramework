class Object3dApp extends App {

    private static rotateDelta: number = 0.01;
    private rotateVector: BABYLON.Vector3;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
        this.rotateVector = new BABYLON.Vector3(0, Object3dApp.rotateDelta, 0);
    }

    protected createScene(continuation: (Scene: Scene) => void) {

        var scene = new Scene();
        scene.camera.position.z = 10;
        continuation((scene));
            
        //MeshFactory.loadFromBabylonJsonFileAsync("monkey.babylon", meshes => {
        //    var scene = new Scene();
        //    scene.figures = meshes;
        //    scene.camera.position.z = 10;
        //    this.rotateScene(scene, new BABYLON.Vector3(0, Math.PI, 0));
        //    continuation((scene));
        //});
    }

    public static createCube2(): Mesh {
        var vc = 36;
        var mesh = new Mesh(vc, vc / 3);
        mesh.vertices[0] = { coordinates: new BABYLON.Vector3(-1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[1] = { coordinates: new BABYLON.Vector3(1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[2] = { coordinates: new BABYLON.Vector3(-1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[3] = { coordinates: new BABYLON.Vector3(1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[4] = { coordinates: new BABYLON.Vector3(1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[5] = { coordinates: new BABYLON.Vector3(-1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[6] = { coordinates: new BABYLON.Vector3(-1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[7] = { coordinates: new BABYLON.Vector3(1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[8] = { coordinates: new BABYLON.Vector3(-1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[9] = { coordinates: new BABYLON.Vector3(-1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[10] = { coordinates: new BABYLON.Vector3(1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[11] = { coordinates: new BABYLON.Vector3(1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[12] = { coordinates: new BABYLON.Vector3(-1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[13] = { coordinates: new BABYLON.Vector3(-1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[14] = { coordinates: new BABYLON.Vector3(-1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[15] = { coordinates: new BABYLON.Vector3(-1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[16] = { coordinates: new BABYLON.Vector3(-1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[17] = { coordinates: new BABYLON.Vector3(-1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[18] = { coordinates: new BABYLON.Vector3(1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[19] = { coordinates: new BABYLON.Vector3(1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[20] = { coordinates: new BABYLON.Vector3(1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[21] = { coordinates: new BABYLON.Vector3(1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[22] = { coordinates: new BABYLON.Vector3(1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[23] = { coordinates: new BABYLON.Vector3(1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[24] = { coordinates: new BABYLON.Vector3(-1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[25] = { coordinates: new BABYLON.Vector3(1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[26] = { coordinates: new BABYLON.Vector3(-1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[27] = { coordinates: new BABYLON.Vector3(-1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[28] = { coordinates: new BABYLON.Vector3(1, -1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[29] = { coordinates: new BABYLON.Vector3(1, -1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[30] = { coordinates: new BABYLON.Vector3(-1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[31] = { coordinates: new BABYLON.Vector3(1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[32] = { coordinates: new BABYLON.Vector3(-1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.vertices[33] = { coordinates: new BABYLON.Vector3(1, 1, 1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[34] = { coordinates: new BABYLON.Vector3(1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[35] = { coordinates: new BABYLON.Vector3(-1, 1, -1), normal: new BABYLON.Vector3(0, 0, 0), textureCoordinates: new BABYLON.Vector2(0, 0) };
         
        var count = mesh.vertices.length / 3;
        for (var i = 0; i < count; i++) {
            var j = i * 3;
            mesh.faces[i] = { a: j, b: j + 1, c: j + 2 };
            var a = mesh.vertices[j].coordinates;
            var b = mesh.vertices[j + 1].coordinates;
            var c = mesh.vertices[j + 2].coordinates;
             
            mesh.vertices[j].normal = BABYLON.Vector3.Cross(b.subtract(a), c.subtract(a));
            mesh.vertices[j].normal.normalize();
            mesh.vertices[j + 1].normal = BABYLON.Vector3.Cross(c.subtract(b), a.subtract(b));
            mesh.vertices[j + 1].normal.normalize();
            mesh.vertices[j + 2].normal = BABYLON.Vector3.Cross(a.subtract(c), b.subtract(c));
            mesh.vertices[j + 2].normal.normalize();
        }

        return mesh;
    }

    public static createCube(): Mesh {
        var mesh = new Mesh(8, 12);
        mesh.vertices[0] = { coordinates: new BABYLON.Vector3(1.0000, -1.0000, -1.0000), normal: new BABYLON.Vector3(0.5773, -0.5773, -0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[1] = { coordinates: new BABYLON.Vector3(-1.0000, -1.0000, -1.0000), normal: new BABYLON.Vector3(-0.5773, -0.5773, -0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[2] = { coordinates: new BABYLON.Vector3(-1.0000, -1.0000, 1.0000), normal: new BABYLON.Vector3(-0.5773, -0.5773, 0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[3] = { coordinates: new BABYLON.Vector3(-1.0000, 1.0000, 1.0000), normal: new BABYLON.Vector3(-0.5773, 0.5773, 0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[4] = { coordinates: new BABYLON.Vector3(-1.0000, 1.0000, -1.0000), normal: new BABYLON.Vector3(-0.5773, 0.5773, -0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[5] = { coordinates: new BABYLON.Vector3(1.0000, 1.0000, -1.0000), normal: new BABYLON.Vector3(0.5773, 0.5773, -0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[6] = { coordinates: new BABYLON.Vector3(1.0000, 1.0000, 1.0000), normal: new BABYLON.Vector3(0.5773, 0.5773, 0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };
        mesh.vertices[7] = { coordinates: new BABYLON.Vector3(1.0000, -1.0000, 1.0000), normal: new BABYLON.Vector3(0.5773, -0.5773, 0.5773), textureCoordinates: new BABYLON.Vector2(0, 0) };

        mesh.faces[0] = { a: 0, b: 1, c: 2 };
        mesh.faces[1] = { a: 3, b: 4, c: 5 };
        mesh.faces[2] = { a: 6, b: 5, c: 0 };
        mesh.faces[3] = { a: 5, b: 4, c: 1 };
        mesh.faces[4] = { a: 1, b: 4, c: 3 };
        mesh.faces[5] = { a: 7, b: 2, c: 3 };

        mesh.faces[6] = { a: 7, b: 0, c: 2 };
        mesh.faces[7] = { a: 6, b: 3, c: 5 };
        mesh.faces[8] = { a: 7, b: 6, c: 0 };
        mesh.faces[9] = { a: 0, b: 5, c: 1 };
        mesh.faces[10] = { a: 2, b: 1, c: 3 };
        mesh.faces[11] = { a: 6, b: 7, c: 3 };
        return mesh;
    }

    protected doLogicStep() {
        super.doLogicStep();
        Object3dApp.rotateScene(this.scene, this.rotateVector);
    }

    public static rotateScene(scene: Scene, rotationDelta: BABYLON.Vector3) {
        for (var i = 0; i < scene.figures.length; i++) {
            var m = <Mesh>scene.figures[i];
            m.rotation.x += rotationDelta.x;
            m.rotation.y += rotationDelta.y;
            m.rotation.z += rotationDelta.z;
        }
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        super.handleKeyboardEvent(eventArgs);

        var k = eventArgs.pressedKey;

        var rotateDelta = 0.01;

        if (k == 37) {
            this.rotateVector.y += rotateDelta;
        }

        if (k == 38) {
            this.rotateVector.x += rotateDelta;
        }

        if (k == 39) {
            this.rotateVector.y -= rotateDelta;
        }

        if (k == 40) {
            this.rotateVector.x -= rotateDelta;
        }

        if (k == 32) {
            this.rotateVector = new BABYLON.Vector3(0, 0, 0);
        }
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {
        super.handleMouseEvent(eventArgs);

        if (eventArgs.leftButtonClicked) {
            this.rotateVector = new BABYLON.Vector3(-eventArgs.deltaY, -eventArgs.deltaX, 0);
            this.rotateVector = this.rotateVector.scale(0.003);
        }
    }
}



