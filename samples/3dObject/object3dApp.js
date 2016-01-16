var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object3dApp = (function (_super) {
    __extends(Object3dApp, _super);
    function Object3dApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.rotateVector = new BABYLON.Vector3(0, Object3dApp.rotateDelta, 0);
        this.showDebugInfo = true;
    }
    Object3dApp.prototype.createScene = function (continuation) {
        var scene = new Scene();
        scene.camera.position.z = -10;
        continuation((scene));
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
            var normal = BABYLON.Vector3.cross(b.subtract(a), c.subtract(a));
            normal.normalize();
            mesh.vertices[j].normal = normal;
            mesh.vertices[j + 1].normal = normal;
            mesh.vertices[j + 2].normal = normal;
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
        Object3dApp.rotateScene(this.scene, this.rotateVector);
    };
    Object3dApp.rotateScene = function (scene, rotationDelta) {
        for (var i = 0; i < scene.figures.length; i++) {
            var m = scene.figures[i];
            m.rotation.x += rotationDelta.x;
            m.rotation.y += rotationDelta.y;
            m.rotation.z += rotationDelta.z;
        }
    };
    Object3dApp.prototype.drawDebugInfo = function () {
        _super.prototype.drawDebugInfo.call(this);
        var o = this.scene.figures[0];
        if (o)
            this.drawVectorInfo(o.position, 10, 60, "object");
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
        if (k == 79) {
            this.mouseWheelVectorControl = this.scene.figures[0].position;
        }
    };
    Object3dApp.prototype.handleMouseEvent = function (eventArgs) {
        _super.prototype.handleMouseEvent.call(this, eventArgs);
        if (eventArgs.leftButtonClicked) {
            this.rotateVector = new BABYLON.Vector3(-eventArgs.deltaY, -eventArgs.deltaX, 0);
            this.rotateVector.scale(0.003);
        }
    };
    Object3dApp.rotateDelta = 0.01;
    return Object3dApp;
})(App);
