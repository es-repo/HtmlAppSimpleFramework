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
    XBubbleApp.prototype.processScene = function (scene, phisics) {
        var xBubbleScene = scene;
        if (this.gameOver)
            return;
        if (xBubbleScene.player.isAnnihilated()) {
            console.log("Game over!");
            this.gameOver = true;
        }
        else if (xBubbleScene.figures.length == 1) {
            console.log("Win!");
            this.gameOver = true;
        }
        xBubbleScene.player.position.x += xBubbleScene.player.moveVector.x;
        xBubbleScene.player.position.y += xBubbleScene.player.moveVector.y;
        for (var i = 0; i < xBubbleScene.figures.length; i++) {
            var f = xBubbleScene.figures[i];
            if (f != xBubbleScene.player && f instanceof Bubble) {
                var b = f;
                b.color = xBubbleScene.player.canAbsorb(b) ? Bubble.canBeAbsorbedColor : xBubbleScene.player.canDamage(b) ? Bubble.canDamageColor : Bubble.canAnnihilateColor;
            }
        }
        var collidedWith = phisics.detectCollision(xBubbleScene, xBubbleScene.player);
        for (var i = 0; i < collidedWith.length; i++) {
            var f = collidedWith[i];
            if (f instanceof Bubble) {
                var b = f;
                if (xBubbleScene.player.canAbsorb(b)) {
                    xBubbleScene.player.absorb(b, xBubbleScene.player.moveVector.length());
                }
                else {
                    xBubbleScene.player.annihilate(b, xBubbleScene.player.moveVector.length());
                }
                if (b.isAnnihilated()) {
                    var idx = xBubbleScene.figures.indexOf(b);
                    xBubbleScene.figures.splice(idx, 1);
                }
            }
        }
    };
    XBubbleApp.prototype.handleKeyboardEvent = function (eventArgs, scene) {
        var k = eventArgs.pressedKey;
        var xBubbleScene = scene;
        var cameraDelta = 3;
        if (k == 189) {
            scene.camera.position.z += cameraDelta;
        }
        if (k == 187) {
            scene.camera.position.z -= cameraDelta;
        }
        if (k == 37) {
            xBubbleScene.player.moveVector.x += xBubbleScene.player.moveDelta;
        }
        if (k == 38) {
            xBubbleScene.player.moveVector.y += xBubbleScene.player.moveDelta;
        }
        if (k == 39) {
            xBubbleScene.player.moveVector.x -= xBubbleScene.player.moveDelta;
        }
        if (k == 40) {
            xBubbleScene.player.moveVector.y -= xBubbleScene.player.moveDelta;
        }
    };
    XBubbleApp.prototype.handleMouseEvent = function (eventArgs, scene) {
        var xBubbleScene = scene;
        scene.camera.position.z += eventArgs.wheelDelta / 50;
        if (eventArgs.leftButtonClicked) {
            var mv = new BABYLON.Vector3(eventArgs.x, eventArgs.y, 0);
            var dv = xBubbleScene.player.projectedPosition.subtract(mv);
            dv.normalize();
            xBubbleScene.player.moveVector.x += dv.x * xBubbleScene.player.moveDelta;
            xBubbleScene.player.moveVector.y += dv.y * xBubbleScene.player.moveDelta;
        }
    };
    return XBubbleApp;
})(App);
//# sourceMappingURL=xBubbleApp.js.map