class RunnerAppResources {
    public images = {};

    constructor() {
        this.images["tile"] = null;
    }

    public isReady(): boolean {
        for (var i in this.images)
            if (this.images[i] == null)
                return false;
        return true;
    }
}

class RunnerApp extends App {

    public resources: RunnerAppResources = new RunnerAppResources();

    protected drawFrame() {
        this.renderer2d.output.clear();
        if (this.resources.isReady()) {
            console.log("draw some tiles");
            this.drawSomeTiles();
        }
        this.graphicOutput.drawBuffer();
    }

    private drawSomeTiles() {
        this.renderer2d.drawTiles(this.resources.images["tile"], 100, 100, 0, 5);
        this.renderer2d.drawTiles(this.resources.images["tile"], 100, 200, 0, 1, 5, 0.5, 0.5);
        this.renderer2d.drawTiles(this.resources.images["tile"], 200, 200, 0, 8, 8, 0.5, 0.5);
    }
}