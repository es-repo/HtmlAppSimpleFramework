var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var D3ObjectApp = (function (_super) {
    __extends(D3ObjectApp, _super);
    function D3ObjectApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.rotateVector = new BABYLON.Vector3(0, D3ObjectApp.rotateDelta, 0);
    }
    D3ObjectApp.prototype.createScene = function (continuation) {
        var _this = this;
        MeshLoader.loadFromJsonFileAsync("monkey.babylon", function (meshes) {
            var scene = new Scene();
            scene.figures = meshes;
            scene.camera.position.z = 10;
            _this.rotateScene(scene, new BABYLON.Vector3(0, Math.PI, 0));
            continuation((scene));
        });
    };
    D3ObjectApp.prototype.processScene = function (scene, phisics) {
        this.rotateScene(scene, this.rotateVector);
    };
    D3ObjectApp.prototype.rotateScene = function (scene, rotationDelta) {
        for (var i = 0; i < scene.figures.length; i++) {
            var m = scene.figures[i];
            m.rotation.x += rotationDelta.x;
            m.rotation.y += rotationDelta.y;
            m.rotation.z += rotationDelta.z;
        }
    };
    D3ObjectApp.prototype.handleKeyboardEvent = function (eventArgs, scene) {
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
    };
    D3ObjectApp.prototype.handleMouseEvent = function (eventArgs, scene) {
        if (eventArgs.leftButtonClicked) {
            this.rotateVector = new BABYLON.Vector3(-eventArgs.deltaY, -eventArgs.deltaX, 0);
            this.rotateVector = this.rotateVector.scale(0.003);
        }
        scene.camera.position.z += eventArgs.wheelDelta / 100;
    };
    D3ObjectApp.rotateDelta = 0.01;
    return D3ObjectApp;
})(App);
