var Scene = (function () {
    function Scene() {
        this.figures = [];
        this.camera = new Camera();
        this.light = new Light();
        this.ticks = 0;
    }
    Scene.prototype.tick = function () {
        this.ticks++;
        for (var i = 0; i < this.figures.length; i++)
            this.figures[i].onSceneTick(this.ticks);
    };
    return Scene;
})();
