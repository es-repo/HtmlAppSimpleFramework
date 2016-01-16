var Camera = (function () {
    function Camera() {
        this.position = new BABYLON.Vector3(0, 0, -100);
        this.direction = new BABYLON.Vector3(0, 0, 1);
        this.up = BABYLON.Vector3.up();
        this.fov = 0.78;
        this.zNear = 0.01;
        this.zFar = 1.0;
    }
    return Camera;
})();
