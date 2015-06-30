var Scene = (function () {
    function Scene() {
        this.figures = [];
        this.camera = new Camera();
        this.light = new Light();
    }
    return Scene;
})();
