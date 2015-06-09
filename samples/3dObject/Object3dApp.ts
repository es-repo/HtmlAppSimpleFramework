class Object3dApp extends App {

    private static rotateDelta: number = 0.01; 
    private rotateVector: BABYLON.Vector3;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
        this.rotateVector = new BABYLON.Vector3(0, Object3dApp.rotateDelta, 0);

        var showTexturesCheckBox = <HTMLInputElement>document.getElementById("showTexturesCheckBox");
        showTexturesCheckBox.addEventListener("click", ev => this.renderer3d.renderSettings.showTextures = showTexturesCheckBox.checked);
    }

    protected createScene(continuation: (Scene: Scene) => void) {

        var meshes = MeshFactory.createFromBabylonAndTextureBase64Data(Objects3dLib.monkey);
        var scene = new Scene();
        scene.figures = meshes;
        scene.camera.position.z = 10;
        this.rotateScene(scene, new BABYLON.Vector3(0, Math.PI, 0));
        continuation((scene));
            
        //MeshFactory.loadFromBabylonJsonFileAsync("monkey.babylon", meshes => {
        //    var scene = new Scene();
        //    scene.figures = meshes;
        //    scene.camera.position.z = 10;
        //    this.rotateScene(scene, new BABYLON.Vector3(0, Math.PI, 0));
        //    continuation((scene));
        //});
    }

    protected doLogicStep() {
        super.doLogicStep();
        this.rotateScene(this.scene, this.rotateVector);
    }

    private rotateScene(scene: Scene, rotationDelta: BABYLON.Vector3) {
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



