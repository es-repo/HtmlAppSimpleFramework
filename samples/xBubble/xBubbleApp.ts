﻿class XBubbleApp extends App {

    private gameOver: boolean;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    protected createScene(continuation: (Scene: Scene) => void) {
        continuation(new XBubbleScene());
    }

    protected doLogicStep() {
        var xBubbleScene = <XBubbleScene>this.scene;

        if (this.gameOver) return;

        if (xBubbleScene.player.isAnnihilated()) {
            console.log("Game over!");
            this.gameOver = true;
        } else if (xBubbleScene.figures.length == 1) {
            console.log("Win!");
            this.gameOver = true;
        }

        xBubbleScene.player.position.x += xBubbleScene.player.moveVector.x;
        xBubbleScene.player.position.y += xBubbleScene.player.moveVector.y;

        for (var i = 0; i < xBubbleScene.figures.length; i++) {
            var f = xBubbleScene.figures[i];
            if (f != xBubbleScene.player && f instanceof Bubble) {
                var b = <Bubble>f;
                b.color = xBubbleScene.player.canAbsorb(b)
                    ? Bubble.canBeAbsorbedColor
                    : xBubbleScene.player.canDamage(b)
                        ? Bubble.canDamageColor
                        : Bubble.canAnnihilateColor;
            }
        }

        var collidedWith = this.phisics.detectCollision(xBubbleScene, xBubbleScene.player);
        for (var i = 0; i < collidedWith.length; i++) {
            var f = collidedWith[i];
            if (f instanceof Bubble) {
                var b = <Bubble>f;

                if (xBubbleScene.player.canAbsorb(b)) {
                    xBubbleScene.player.absorb(b, xBubbleScene.player.moveVector.length());
                } else {
                    xBubbleScene.player.annihilate(b, xBubbleScene.player.moveVector.length());
                }

                if (b.isAnnihilated()) {
                    var idx = xBubbleScene.figures.indexOf(b);
                    xBubbleScene.figures.splice(idx, 1);
                }
            }
        }
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        super.handleKeyboardEvent(eventArgs);

        var k = eventArgs.pressedKey;
        var xBubbleScene = <XBubbleScene>this.scene;

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
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {
        super.handleMouseEvent(eventArgs);

        var xBubbleScene = <XBubbleScene>this.scene;

        if (eventArgs.leftButtonClicked) {
            var mv = new BABYLON.Vector3(eventArgs.x, eventArgs.y, 0);
            var dv = xBubbleScene.player.projectedPosition.subtract(mv);
            dv.normalize();
            xBubbleScene.player.moveVector.x += dv.x * xBubbleScene.player.moveDelta;
            xBubbleScene.player.moveVector.y += dv.y * xBubbleScene.player.moveDelta;
        }
    }
}



