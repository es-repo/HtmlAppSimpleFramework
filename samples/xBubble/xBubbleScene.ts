class XBubbleScene extends Scene {

    public player: Player;
    public bubbles: Bubble[] = [];

    constructor() {
        super();
        
        for (var i = 0; i < 5; i++)
            for (var j = 0; j < 5; j++) {
                var bubble = new Bubble();
                bubble.position.x = -6 + i * 3;
                bubble.position.y = -6 + j * 3;
                bubble.radius = Math.random() * 1.25 + 0.25;
                bubble.color = new BABYLON.Color4(1, 0, 0, 1);
                this.figures.push(bubble);
                this.bubbles.push(bubble);
            }

        this.player = new Player();
        this.player.position.x = -9;
        this.player.position.y = -8;
        this.player.radius = 1;
        this.player.color = new BABYLON.Color4(1, 1, 1, 1);

        this.figures.push(this.player);
    }
} 