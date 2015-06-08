var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Object3dApp = (function (_super) {
    __extends(Object3dApp, _super);
    function Object3dApp(graphicOutput, inputControllerHandlers) {
        var _this = this;
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.rotateVector = new BABYLON.Vector3(0, Object3dApp.rotateDelta, 0);
        var showTexturesCheckBox = document.getElementById("showTexturesCheckBox");
        showTexturesCheckBox.addEventListener("click", function (ev) { return _this.renderer3d.renderSettings.showTextures = showTexturesCheckBox.checked; });
    }
    Object3dApp.prototype.createScene = function (continuation) {
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
    };
    Object3dApp.prototype.doLogicStep = function () {
        this.rotateScene(this.scene, this.rotateVector);
    };
    Object3dApp.prototype.rotateScene = function (scene, rotationDelta) {
        for (var i = 0; i < scene.figures.length; i++) {
            var m = scene.figures[i];
            m.rotation.x += rotationDelta.x;
            m.rotation.y += rotationDelta.y;
            m.rotation.z += rotationDelta.z;
        }
    };
    Object3dApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
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
    };
    Object3dApp.prototype.handleMouseEvent = function (eventArgs) {
        _super.prototype.handleMouseEvent.call(this, eventArgs);
        if (eventArgs.leftButtonClicked) {
            this.rotateVector = new BABYLON.Vector3(-eventArgs.deltaY, -eventArgs.deltaX, 0);
            this.rotateVector = this.rotateVector.scale(0.003);
        }
    };
    Object3dApp.rotateDelta = 0.01;
    return Object3dApp;
})(App);
