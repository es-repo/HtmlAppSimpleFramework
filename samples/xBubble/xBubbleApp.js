var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var XBubbleApp = (function (_super) {
    __extends(XBubbleApp, _super);
    function XBubbleApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
    }
    XBubbleApp.prototype.createScene = function (continuation) {
        continuation(new XBubbleScene());
    };
    XBubbleApp.prototype.doLogicStep = function () {
        _super.prototype.doLogicStep.call(this);
        var xBubbleScene = this.scene;
        if (this.gameOver)
            return;
        if (xBubbleScene.player.isAnnihilated()) {
            console.log("Game over!");
            this.gameOver = true;
        }
        else if (xBubbleScene.figures.length == 1) {
            console.log("Win!");
            this.gameOver = true;
            this.win = true;
        }
        for (var i = 0; i < xBubbleScene.bubbles.length; i++) {
            var b = xBubbleScene.bubbles[i];
            b.color = xBubbleScene.player.canAbsorb(b) ? Bubble.canBeAbsorbedColor : xBubbleScene.player.canDamage(b) ? Bubble.canDamageColor : Bubble.canAnnihilateColor;
            var changeBubbleVelocity = Math.random() < 0.05;
            if (changeBubbleVelocity) {
                var maxSpeed = 0.1;
                b.velocity.x = (-0.5 + Math.random()) * maxSpeed;
                b.velocity.y = (-0.5 + Math.random()) * maxSpeed;
            }
        }
        var collidedWith = this.phisics.detectCollision(xBubbleScene, xBubbleScene.player);
        for (var i = 0; i < collidedWith.length; i++) {
            var f = collidedWith[i];
            if (f instanceof Bubble) {
                var b = f;
                if (xBubbleScene.player.canAbsorb(b)) {
                    xBubbleScene.player.absorb(b, xBubbleScene.player.velocity.length());
                }
                else {
                    xBubbleScene.player.annihilate(b, xBubbleScene.player.velocity.length());
                }
                if (b.isAnnihilated()) {
                    var idx = xBubbleScene.figures.indexOf(b);
                    xBubbleScene.figures.splice(idx, 1);
                }
            }
        }
    };
    XBubbleApp.prototype.drawFrame = function () {
        _super.prototype.drawFrame.call(this);
        if (this.win) {
            this.graphicOutput.drawText("Win!", this.graphicOutput.get_width() / 2 - 50, this.graphicOutput.get_height() / 2 + 10, "white", 40);
        }
        else if (this.gameOver) {
            this.graphicOutput.drawText("Game over!", this.graphicOutput.get_width() / 2 - 120, this.graphicOutput.get_height() / 2 + 10, "white", 40);
        }
    };
    XBubbleApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
        var k = eventArgs.pressedKey;
        var xBubbleScene = this.scene;
        if (k == 37) {
            xBubbleScene.player.velocity.x += xBubbleScene.player.velocityDelta;
        }
        if (k == 38) {
            xBubbleScene.player.velocity.y += xBubbleScene.player.velocityDelta;
        }
        if (k == 39) {
            xBubbleScene.player.velocity.x -= xBubbleScene.player.velocityDelta;
        }
        if (k == 40) {
            xBubbleScene.player.velocity.y -= xBubbleScene.player.velocityDelta;
        }
    };
    XBubbleApp.prototype.handleMouseEvent = function (eventArgs) {
        _super.prototype.handleMouseEvent.call(this, eventArgs);
        var xBubbleScene = this.scene;
        if (eventArgs.leftButtonClicked) {
            var mv = new BABYLON.Vector3(eventArgs.x, eventArgs.y, 0);
            var dv = xBubbleScene.player.projectedPosition.subtract(mv);
            dv.normalize();
            xBubbleScene.player.velocity.x += dv.x * xBubbleScene.player.velocityDelta;
            xBubbleScene.player.velocity.y += dv.y * xBubbleScene.player.velocityDelta;
        }
    };
    return XBubbleApp;
})(App);
