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

    protected createScene(continuation: (Scene: Scene) => void) {

        if (!this.resources.isReady()) {
            setTimeout(() => this.createScene(continuation), 300);
            return;
        }

        var scene = new Scene();

        var tile1 = new Tile(this.resources.images["tile"]);
        tile1.size.x = 1;
        tile1.size.y = 1;
        tile1.countH = 10;
        tile1.position.x = 0;
        tile1.position.y = 0;

        var tile2 = new Tile(this.resources.images["tile"]);
        tile2.size.x = 1;
        tile2.size.y = 1;
        tile2.countV = 5;
        tile2.position.x = 2;
        tile2.position.y = 2;

        var tile3 = new Tile(this.resources.images["tile"]);
        tile3.size.x = 2;
        tile3.size.y = 2;
        tile3.countV = 5;
        tile3.countH = 5;
        tile3.position.x = -9;
        tile3.position.y = 0;

        scene.figures.push(tile1);
        scene.figures.push(tile2);
        scene.figures.push(tile3);

        continuation(scene);
    }

    //protected drawFrame() {
    //    if (this.resources.isReady())
    //        super.drawFrame();
    //    //this.renderer2d.output.clear();
    //    //if (this.resources.isReady()) {
    //    //    console.log("draw some tiles");
    //    //    this.drawSomeTiles();
    //    //}
    //    //this.graphicOutput.drawBuffer();
    //}

    private drawSomeTiles() {
        this.renderer2d.drawTiles(this.resources.images["tile"], 100, 100, 0, 5);
        this.renderer2d.drawTiles(this.resources.images["tile"], 100, 200, 0, 1, 5, 0.5, 0.5);
        this.renderer2d.drawTiles(this.resources.images["tile"], 200, 200, 0, 8, 8, 0.5, 0.5);
    }
}