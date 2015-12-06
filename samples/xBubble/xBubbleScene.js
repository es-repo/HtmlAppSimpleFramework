var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var XBubbleScene = (function (_super) {
    __extends(XBubbleScene, _super);
    function XBubbleScene() {
        _super.call(this);
        this.bubbles = [];
        for (var i = 0; i < 5; i++)
            for (var j = 0; j < 5; j++) {
                var bubble = new Bubble();
                bubble.position.x = -6 + i * 3;
                bubble.position.y = -6 + j * 3;
                bubble.set_radius(Math.random() * 1.25 + 0.25);
                bubble.color = new BABYLON.Color4(1, 0, 0, 1);
                this.figures.push(bubble);
                this.bubbles.push(bubble);
            }
        this.player = new Player();
        this.player.position.x = -9;
        this.player.position.y = -8;
        this.player.set_radius(1);
        this.player.color = new BABYLON.Color4(1, 1, 1, 1);
        this.figures.push(this.player);
    }
    return XBubbleScene;
})(Scene);
