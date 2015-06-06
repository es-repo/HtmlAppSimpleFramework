class D3ObjectApp extends App {

    private static rotateDelta: number = 0.01; 
    private rotateVector: BABYLON.Vector3;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
        this.rotateVector = new BABYLON.Vector3(0, D3ObjectApp.rotateDelta, 0);
    }

    protected createScene(continuation: (Scene: Scene) => void) {

        MeshLoader.loadFromJsonFileAsync("monkey.babylon", meshes => {
            var scene = new Scene();
            scene.figures = meshes;
            scene.camera.position.z = 10;
            this.rotateScene(scene, new BABYLON.Vector3(0, Math.PI, 0));
            continuation((scene));
        });
    }

    protected processScene(scene: Scene, phisics: Phisics) {
        this.rotateScene(scene, this.rotateVector);
    }

    private rotateScene(scene: Scene, rotationDelta: BABYLON.Vector3) {
        for (var i = 0; i < scene.figures.length; i++) {
            var m = <Mesh>scene.figures[i];
            m.rotation.x += rotationDelta.x;
            m.rotation.y += rotationDelta.y;
            m.rotation.z += rotationDelta.z;
        }
    }

    protected handleKeyboardEvent(eventArgs: KeyboardEventArgs, scene: Scene) {

        var k = eventArgs.pressedKey; 
        var cameraDelta = 3;

        if (k == 189) {
            scene.camera.position.z += cameraDelta;
        }

        if (k == 187) {
            scene.camera.position.z -= cameraDelta;
        }

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

    protected handleMouseEvent(eventArgs: MouseEventArgs, scene: Scene) {

        if (eventArgs.leftButtonClicked) {
            this.rotateVector = new BABYLON.Vector3(-eventArgs.deltaY, -eventArgs.deltaX, 0);
            this.rotateVector = this.rotateVector.scale(0.003);
        }
        
        scene.camera.position.z += eventArgs.wheelDelta / 100;
    }
}



