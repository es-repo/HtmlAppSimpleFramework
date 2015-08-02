class RunnerAppResources {
    public images = {};
    public sounds = {};

    constructor() {
        this.images["tile"] = null;
        this.images["runner1"] = null;
        this.images["runner2"] = null;
        this.images["runner3"] = null;
        this.images["coin"] = null;

        this.sounds["coin"] = null;
        this.sounds["song"] = null;
        this.sounds["start"] = null;
        this.sounds["jump"] = null;
        this.sounds["step"] = null;
        this.sounds["death"] = null;
    }

    public isReady(): boolean {
        for (var i in this.images)
            if (this.images[i] == null)
                return false;

        for (var i in this.sounds)
            if (this.sounds[i] == null)
                return false;

        return true;
    }
}

class Wall extends Tile {
    constructor(image: ColorBuffer) {
        super(image);
    }
}

class Runner extends Sprite {
    private ticks = 0;
    private images: ColorBuffer[];
    private currentImageIndex = 0;

    public speed = 0.3;
    public gravyAcc = -0.03;
    public jumpAcc = 0.5;
    public gatheredCoins = 0;

    public jumpSound;
    public stepSound;

    constructor(images: ColorBuffer[]) {
        super(images[0]);
        this.images = images;
    }

    public tick() {
        this.ticks++;
        if (this.ticks % 4 == 0) {
            this.currentImageIndex++;
            if (this.currentImageIndex >= this.images.length)
                this.currentImageIndex = 0;
            this.image = this.images[this.currentImageIndex];
        }

        if (this.velocity.y == 0)
            this.stepSound.play();
    }

    public jump() {
        if (this.velocity.y == 0) {
            this.velocity.y = this.jumpAcc;
            this.jumpSound.play();
        }
    }
}

class Particle extends Circle {
    constructor() {
        super();
        this.color = new BABYLON.Color4(0.7, 0.3, 1, 1);
    }
}

class Coin extends Sprite {
    public sound;
}

class RunnerApp extends App {

    private gameStarted = false;
    private gameEnded = false;
    private inMenu = true;

    private wallTileSize = 1.3;
    private walls: Wall[][];
    private wallsMaxDistance = this.wallTileSize * 10;
    private wallsMinDistance = this.wallTileSize * 2;
    private wallsMaxLenght = this.wallTileSize * 12;
    private wallsMinLenght = this.wallTileSize * 3;
    private wallUpdatePosX = -this.wallTileSize * 40;

    private particles: Particle[];
    private coins: Coin[];
    private availableCoins: Coin[];

    private runner: Runner;

    public resources: RunnerAppResources = new RunnerAppResources();

    protected createScene(continuation: (Scene: Scene) => void) {

        if (!this.resources.isReady()) {
            setTimeout(() => this.createScene(continuation), 300);
            return;
        }

        var scene = new Scene();
        this.walls = [];
        this.coins = [];
        for (var l = 0; l < 4; l++) {
            this.walls[l] = [];
            for (var i = 0; i < 5; i++) {
                var w = new Wall(this.resources.images["tile"]);
                w.size.x = this.wallTileSize;
                w.size.y = this.wallTileSize;
                w.position.x = this.wallUpdatePosX;
                w.position.y = - this.wallTileSize * 3 * l + 4;
                this.walls[l].push(w);
                scene.figures.push(w);
            }
        }

        this.runner = new Runner([this.resources.images["runner1"], this.resources.images["runner2"], this.resources.images["runner3"], this.resources.images["runner2"]]);
        this.runner.size.x = this.wallTileSize * 1.5;
        this.runner.size.y = this.wallTileSize * 1.5;
        this.runner.position.x = this.wallUpdatePosX;
        this.runner.jumpSound = this.resources.sounds["jump"];
        this.runner.stepSound = this.resources.sounds["step"];

        scene.figures.push(this.runner);

        this.particles = [];
        for (var i = 0; i < 100; i++) {
            var p = new Particle();
            p.set_radius(Math.random() * 0.5);
            p.position.x = 70 - Math.random() * 140;
            p.position.y = 50 - Math.random() * 100;
            p.position.z = 100 + Math.random() * 100;
            this.particles.push(p);
            scene.figures.push(p);
        }

        this.coins = [];
        this.availableCoins = [];
        for (var i = 0; i < 5; i++) {
            var c = new Coin(this.resources.images["coin"]);
            c.size.x = this.wallTileSize;
            c.size.y = this.wallTileSize;
            c.sound = this.resources.sounds["coin"];
            this.availableCoins.push(c);
        }
        this.resources.sounds["start"].play();
        continuation(scene);
    }

    private initRunnerPosition() {
        this.runner.position.x = -8;
        this.runner.position.y = this.walls[0][0].get_boundingBox()[1].y + this.runner.size.y / 2;
    }

    protected doLogicStep() {

        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            p.position.x -= this.runner.speed;
            if (p.position.x < -70) {
                p.position.x = 70;
            }
        }

        if (this.gameStarted) {
            for (var l = 0; l < this.walls.length; l++) {
                for (var i = 0; i < this.walls[l].length; i++) {
                    this.walls[l][i].position.x -= this.runner.speed;
                }
                this.rearrangeWalls();
            }

            for (var i = 0; i < this.coins.length; i++) {
                this.coins[i].position.x -= this.runner.speed;
            }
            this.rearrangeCoins();
            this.takeCoin();

            this.runner.position.y += this.runner.velocity.y;

            var onWall = null;
            for (var l = 0; l < this.walls.length; l++) {
                for (var i = 0; i < this.walls[l].length; i++) {
                    var w = this.walls[l][i];
                    if (RunnerApp.isRunnerOnWall(this.runner, w)) {
                        onWall = w;
                        break;
                    }
                }
                if (onWall != null)
                    break;
            }

            if (onWall == null) {
                this.runner.velocity.y += this.runner.gravyAcc;
            } else {
                if (this.runner.velocity.y < 0) {
                    this.runner.velocity.y = 0;
                    this.runner.position.y = onWall.boundingBox[1].y + this.runner.size.y / 2;
                }
            }

            var bottom = - 15;
            //var top = 10;
            if (this.runner.position.y < bottom) {
                //this.runner.position.y = top;
                this.gameEnded = true;
                this.gameStarted = false;
                this.resources.sounds["song"].pause();
                this.resources.sounds["death"].play();
                this.hideWallsCoinsAndRunner();
            }

            this.runner.tick();
        }
    }

    private hideWallsCoinsAndRunner() {
        for (var l = 0; l < this.walls.length; l++) {
            for (var i = 0; i < this.walls[l].length; i++) {
                this.walls[l][i].position.x = this.wallUpdatePosX;
            }
        }

        this.runner.position.x = this.wallUpdatePosX;

        for (var i = 0; i < this.coins.length; i++) {
            var c = this.coins[i];
            c.position.x = this.wallUpdatePosX;
        }
    }

    private rearrangeWalls() {
        for (var i = 0; i < this.walls.length; i++) {
            this.rearrangeWallsLevel(this.walls[i]);
        }
    }

    private rearrangeWallsLevel(walls: Wall[]) {
        while (true) {
            var w = walls[0];
            var lw = walls[walls.length - 1];

            if (w.position.x <= this.wallUpdatePosX) {
                w.position.x = lw.position.x + lw.size.x * lw.countH + this.wallsMinDistance + Math.random() * this.wallsMaxDistance >> 0;
                w.countH = this.wallsMinLenght + Math.random() * this.wallsMaxLenght >> 0;
                walls.splice(0, 1);
                walls.push(w);
            }
            else {
                return;
            }
        }
    }

    private rearrangeCoins() {

        for (var i = 0; i < this.walls.length; i++) {
            if (this.availableCoins.length == 0)
                break;
            if (Math.random() > 0.5) {
                var c = this.availableCoins[0];
                var w = this.walls[i][this.walls[i].length - 1];
                c.position.x = w.get_boundingBox()[0].x + Math.random() * w.get_fullSize().x;
                c.position.y = w.get_boundingBox()[1].y + c.size.y / 2;
                this.availableCoins.splice(0, 1);
                this.coins.push(c);
                this.scene.figures.push(c);
            }
        }

        for (var i = 0; i < this.coins.length; i++) {
            var c = this.coins[i];
            if (c.position.x <= this.wallUpdatePosX) {
                this.coins.splice(i, 1);
                var sceneIdx = this.scene.figures.indexOf(c);
                this.scene.figures.splice(sceneIdx, 1);
                this.availableCoins.push(c);
            }
        }
    }

    private takeCoin() {
        for (var i = 0; i < this.coins.length; i++) {
            var c = this.coins[i];
            if (RunnerApp.isRunnerNearCoin(this.runner, c)) {
                this.runner.gatheredCoins++;
                this.coins.splice(i, 1);
                var sceneIdx = this.scene.figures.indexOf(c);
                this.scene.figures.splice(sceneIdx, 1);
                this.availableCoins.push(c);
                c.sound.currentTime = 0;
                c.sound.play();
                break;
            }
        }
    }

    private static isRunnerOnWall(runner: Runner, wall: Wall): boolean {
        return RunnerApp.isPointInsideBox(runner.get_boundingBox()[0], wall.get_boundingBox());
    }

    private static isRunnerNearCoin(runner: Runner, coin: Coin): boolean {
        return RunnerApp.areBoxesIntersects(runner.get_boundingBox(), coin.get_boundingBox());
    }

    private static isPointInsideBox(point: BABYLON.Vector3, box: BABYLON.Vector3[]) {
        return point.x >= box[0].x && point.x <= box[1].x && point.y >= box[0].y && point.y <= box[1].y;
    }

    private static areBoxesIntersects(box1: BABYLON.Vector3[], box2: BABYLON.Vector3[]) {
        return RunnerApp.isPointInsideBox(box1[0], box2) || RunnerApp.isPointInsideBox(box1[1], box2) ||
            RunnerApp.isPointInsideBox(box2[0], box1) || RunnerApp.isPointInsideBox(box2[1], box1);
    }

    private static playAudioInLoop(audio) {
        audio.currentTime = 0;
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play();
        }, false);
        audio.play();
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        super.handleKeyboardEvent(eventArgs);

        var k = eventArgs.pressedKey;

        if (k == 32) {
            this.onAction();
        }
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {
        super.handleMouseEvent(eventArgs);

        if (eventArgs.leftButtonClicked) {
            this.onAction();
        }
    }

    private onAction() {
        if (this.inMenu) {
            this.inMenu = false;
            this.gameStarted = true;
            this.initRunnerPosition();
            this.rearrangeWalls();
            this.runner.gatheredCoins = 0;
            RunnerApp.playAudioInLoop(this.resources.sounds["song"]);
        }
        else if (this.gameStarted) {
            this.runner.jump();
        }
        else if (this.gameEnded) {
            this.inMenu = true;
            this.gameEnded = false;
            this.resources.sounds["start"].play();
        }
    }

    protected drawFrame() {
        super.drawFrame();
        
        if (this.inMenu) {
            this.graphicOutput.drawText("RUNNER", this.graphicOutput.get_width() / 2 - 140, this.graphicOutput.get_height() / 2 - 50, "ffffff", 80, "Lucida Console");
            this.graphicOutput.drawText("Press space or", this.graphicOutput.get_width() / 2 - 125, this.graphicOutput.get_height() / 2 + 50, "ffffff", 30, "Lucida Console");
            this.graphicOutput.drawText("left mouse button", this.graphicOutput.get_width() / 2 - 150, this.graphicOutput.get_height() / 2 + 80, "ffffff", 30, "Lucida Console");
            this.graphicOutput.drawText("to start!", this.graphicOutput.get_width() / 2 - 80, this.graphicOutput.get_height() / 2 + 110, "ffffff", 30, "Lucida Console");
        }
        else {
            var s = "score:" + this.runner.gatheredCoins;
            this.graphicOutput.drawText(s, this.graphicOutput.get_width() - 200, 30, "ffffff", 32, "Lucida Console");

            if (this.gameEnded) {
                this.graphicOutput.drawText("Game over!", this.graphicOutput.get_width() / 2 - 240, this.graphicOutput.get_height() / 2 + 30, "ffffff", 80, "Lucida Console");
            }
        }
    }
}