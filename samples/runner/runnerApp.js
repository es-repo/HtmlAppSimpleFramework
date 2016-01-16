var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RunnerAppResources = (function () {
    function RunnerAppResources() {
        this.images = {};
        this.sounds = {};
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
    RunnerAppResources.prototype.isReady = function () {
        for (var i in this.images)
            if (this.images[i] == null)
                return false;
        for (var i in this.sounds)
            if (this.sounds[i] == null)
                return false;
        return true;
    };
    return RunnerAppResources;
})();
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(image) {
        _super.call(this, image);
    }
    return Wall;
})(Tile);
var Runner = (function (_super) {
    __extends(Runner, _super);
    function Runner(images) {
        _super.call(this, images[0]);
        this.ticks = 0;
        this.currentImageIndex = 0;
        this.speed = 0.3;
        this.gravyAcc = -0.03;
        this.jumpAcc = 0.5;
        this.gatheredCoins = 0;
        this.images = images;
    }
    Runner.prototype.tick = function () {
        this.ticks++;
        if (this.isInJumpOrInFall()) {
            this.currentImageIndex = 2;
        }
        else {
            if (this.ticks % 4 == 0) {
                this.currentImageIndex++;
                if (this.currentImageIndex >= this.images.length)
                    this.currentImageIndex = 0;
            }
            this.stepSound.play();
        }
        this.image = this.images[this.currentImageIndex];
    };
    Runner.prototype.jump = function () {
        if (!this.isInJumpOrInFall()) {
            this.velocity.y = this.jumpAcc;
            this.jumpSound.play();
        }
    };
    Runner.prototype.isInJumpOrInFall = function () {
        return this.velocity.y != 0;
    };
    Runner.prototype.isOnWall = function (wall) {
        var footCenterX = this.position.x;
        var footCenterY = this.position.y - this.size.y / 2.0;
        var wallX = wall.position.x - wall.size.x / 2.0;
        var wallY = wall.position.y - wall.size.y / 2.0;
        var wallW = wall.size.x * wall.countH;
        var wallH = wall.size.y * wall.countV;
        return Geom.Rectangle.isPointInside(footCenterX, footCenterY, wallX, wallY, wallW, wallH);
    };
    Runner.prototype.isNearCoin = function (coin) {
        var x1 = this.position.x - this.size.x / 2;
        var y1 = this.position.y - this.size.y / 2;
        var w1 = this.size.x;
        var h1 = this.size.y;
        var x2 = coin.position.x - coin.size.x / 2;
        var y2 = coin.position.y - coin.size.y / 2;
        var w2 = coin.size.x;
        var h2 = coin.size.y;
        return Geom.Rectangle.isIntersected(x1, y1, w1, h1, x2, y2, w2, h2);
    };
    return Runner;
})(Sprite);
var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle() {
        _super.call(this);
        this.color = new BABYLON.Color4(0.7, 0.3, 1, 1);
    }
    return Particle;
})(Circle);
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin() {
        _super.apply(this, arguments);
    }
    return Coin;
})(Sprite);
var RunnerApp = (function (_super) {
    __extends(RunnerApp, _super);
    function RunnerApp() {
        _super.apply(this, arguments);
        this.gameStarted = false;
        this.gameEnded = false;
        this.inMenu = true;
        this.wallTileSize = 1.3;
        this.wallsMaxDistance = this.wallTileSize * 10;
        this.wallsMinDistance = this.wallTileSize * 2;
        this.wallsMaxLenght = this.wallTileSize * 12;
        this.wallsMinLenght = this.wallTileSize * 3;
        this.wallUpdatePosX = -this.wallTileSize * 40;
        this.resources = new RunnerAppResources();
    }
    RunnerApp.prototype.createScene = function (continuation) {
        var _this = this;
        if (!this.resources.isReady()) {
            setTimeout(function () { return _this.createScene(continuation); }, 300);
            return;
        }
        var scene = new Scene();
        //scene.camera.position.z = -70;
        this.walls = [];
        this.coins = [];
        for (var l = 0; l < 4; l++) {
            this.walls[l] = [];
            for (var i = 0; i < 5; i++) {
                var w = new Wall(this.resources.images["tile"]);
                w.size.x = this.wallTileSize;
                w.size.y = this.wallTileSize;
                w.position.x = this.wallUpdatePosX;
                w.position.y = -this.wallTileSize * 3 * l + 4;
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
            p.radius = Math.random() * 0.5;
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
    };
    RunnerApp.prototype.initRunner = function () {
        this.runner.position.x = -8;
        var w = this.walls[0][0];
        this.runner.position.y = w.position.y + w.size.y + this.runner.size.y;
        this.runner.velocity.y = 0;
    };
    RunnerApp.prototype.doLogicStep = function () {
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
                    if (this.runner.isOnWall(w)) {
                        onWall = w;
                        break;
                    }
                }
                if (onWall != null)
                    break;
            }
            if (onWall == null) {
                this.runner.velocity.y += this.runner.gravyAcc;
            }
            else {
                if (this.runner.velocity.y < 0) {
                    this.runner.velocity.y = 0;
                    this.runner.position.y = onWall.position.y - onWall.size.y / 2 + onWall.size.y * onWall.countV + this.runner.size.y / 2;
                }
            }
            var bottom = -15;
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
    };
    RunnerApp.prototype.hideWallsCoinsAndRunner = function () {
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
    };
    RunnerApp.prototype.rearrangeWalls = function () {
        for (var i = 0; i < this.walls.length; i++) {
            this.rearrangeWallsLevel(this.walls[i]);
        }
    };
    RunnerApp.prototype.rearrangeWallsLevel = function (walls) {
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
    };
    RunnerApp.prototype.rearrangeCoins = function () {
        for (var i = 0; i < this.walls.length; i++) {
            if (this.availableCoins.length == 0)
                break;
            if (Math.random() > 0.5) {
                var c = this.availableCoins[0];
                var w = this.walls[i][this.walls[i].length - 1];
                c.position.x = w.position.x - w.size.x / 2 + Math.random() * (w.size.x * w.countH);
                c.position.y = w.position.y + w.size.y / 2 + c.size.y / 2;
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
    };
    RunnerApp.prototype.takeCoin = function () {
        for (var i = 0; i < this.coins.length; i++) {
            var c = this.coins[i];
            if (this.runner.isNearCoin(c)) {
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
    };
    RunnerApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
        var k = eventArgs.pressedKey;
        if (k == 32) {
            this.onAction();
        }
    };
    RunnerApp.prototype.handleMouseEvent = function (eventArgs) {
        _super.prototype.handleMouseEvent.call(this, eventArgs);
        if (eventArgs.leftButtonClicked) {
            this.onAction();
        }
    };
    RunnerApp.prototype.onAction = function () {
        if (this.inMenu) {
            this.inMenu = false;
            this.gameStarted = true;
            this.initRunner();
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
    };
    RunnerApp.prototype.drawFrame = function () {
        _super.prototype.drawFrame.call(this);
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
    };
    RunnerApp.playAudioInLoop = function (audio) {
        audio.currentTime = 0;
        audio.addEventListener('ended', function () {
            audio.currentTime = 0;
            audio.play();
        }, false);
        audio.play();
    };
    return RunnerApp;
})(App);
