var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RunnerAppResources = (function () {
    function RunnerAppResources() {
        this.images = {};
        this.images["tile"] = null;
    }
    RunnerAppResources.prototype.isReady = function () {
        for (var i in this.images)
            if (this.images[i] == null)
                return false;
        return true;
    };
    return RunnerAppResources;
})();
var RunnerApp = (function (_super) {
    __extends(RunnerApp, _super);
    function RunnerApp() {
        _super.apply(this, arguments);
        this.resources = new RunnerAppResources();
    }
    RunnerApp.prototype.drawFrame = function () {
        this.renderer2d.output.clear();
        if (this.resources.isReady()) {
            console.log("draw some tiles");
            this.drawSomeTiles();
        }
        this.graphicOutput.drawBuffer();
    };
    RunnerApp.prototype.drawSomeTiles = function () {
        this.renderer2d.drawTiles(this.resources.images["tile"], 100, 100, 0, 5);
        this.renderer2d.drawTiles(this.resources.images["tile"], 100, 200, 0, 1, 5, 0.5, 0.5);
        this.renderer2d.drawTiles(this.resources.images["tile"], 200, 200, 0, 8, 8, 0.5, 0.5);
    };
    return RunnerApp;
})(App);
