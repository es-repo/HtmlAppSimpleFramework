class Camera {
    public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 200);
    public direction: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, -1);
    public up: BABYLON.Vector3 = BABYLON.Vector3.Up();
    public fov: number = 0.78;
    public zNear: number = 0.01;
    public zFar: number = 1.0;
}