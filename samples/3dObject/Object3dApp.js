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
        meshes = [Object3dApp.createCube2()];
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
    Object3dApp.createCube2 = function () {
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
    };
    Object3dApp.createCube = function () {
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
    };
    Object3dApp.prototype.doLogicStep = function () {
        _super.prototype.doLogicStep.call(this);
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
