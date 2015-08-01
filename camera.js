var Camera = (function () {
    function Camera() {
        this.position = new BABYLON.Vector3(0, 0, 200);
        this.direction = new BABYLON.Vector3(0, 0, -1);
        this.up = BABYLON.Vector3.Up();
        this.fov = 0.78;
        this.zNear = 0.01;
        this.zFar = 1.0;
    }
    return Camera;
})();
