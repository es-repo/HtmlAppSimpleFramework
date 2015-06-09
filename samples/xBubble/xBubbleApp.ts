class XBubbleApp extends App {

    private gameOver: boolean;
    private win: boolean;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
    }

    protected createScene(continuation: (Scene: Scene) => void) {
        continuation(new XBubbleScene());
    }

    protected doLogicStep() {
        super.doLogicStep();
        var xBubbleScene = <XBubbleScene>this.scene;

        if (this.gameOver) return;

        if (xBubbleScene.player.isAnnihilated()) {
            console.log("Game over!");
            this.gameOver = true;
        } else if (xBubbleScene.figures.length == 1) {
            console.log("Win!");
            this.gameOver = true;
            this.win = true;
        }

        for (var i = 0; i < xBubbleScene.bubbles.length; i++) {
            var b = xBubbleScene.bubbles[i];

            b.color = xBubbleScene.player.canAbsorb(b)
                ? Bubble.canBeAbsorbedColor
                : xBubbleScene.player.canDamage(b)
                    ? Bubble.canDamageColor
                    : Bubble.canAnnihilateColor;

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
                var b = <Bubble>f;

                if (xBubbleScene.player.canAbsorb(b)) {
                    xBubbleScene.player.absorb(b, xBubbleScene.player.velocity.length());
                } else {
                    xBubbleScene.player.annihilate(b, xBubbleScene.player.velocity.length());
                }

                if (b.isAnnihilated()) {
                    var idx = xBubbleScene.figures.indexOf(b);
                    xBubbleScene.figures.splice(idx, 1);
                }
            }
        }
    }

    protected drawFrame() {
        super.drawFrame();
        if (this.win) {
            this.graphicOutput.drawText("Win!", this.graphicOutput.get_width() / 2 - 50, this.graphicOutput.get_height() / 2 + 10, "white", 40);
        } else if (this.gameOver) {
            this.graphicOutput.drawText("Game over!", this.graphicOutput.get_width() / 2 - 120, this.graphicOutput.get_height() / 2 + 10, "white", 40);
        }
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        super.handleKeyboardEvent(eventArgs);

        var k = eventArgs.pressedKey;
        var xBubbleScene = <XBubbleScene>this.scene;

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
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {
        super.handleMouseEvent(eventArgs);

        var xBubbleScene = <XBubbleScene>this.scene;

        if (eventArgs.leftButtonClicked) {
            var mv = new BABYLON.Vector3(eventArgs.x, eventArgs.y, 0);
            var dv = xBubbleScene.player.projectedPosition.subtract(mv);
            dv.normalize();
            xBubbleScene.player.velocity.x += dv.x * xBubbleScene.player.velocityDelta;
            xBubbleScene.player.velocity.y += dv.y * xBubbleScene.player.velocityDelta;
        }
    }
}



