class XBubbleScene extends Scene {

    public player: Player;

    constructor() {
        super();

        for (var i = 0; i < 5; i++)
            for (var j = 0; j < 5; j++) {
                var bubble = new Bubble();
                bubble.position.x = -12 + i * 6;
                bubble.position.y = -12 + j * 6;
                bubble.set_radius(Math.random() * 5);
                bubble.color = new BABYLON.Color4(1, 0, 0, 1);
                this.figures.push(bubble);
            }

        this.player = new Player();
        this.player.position.x = -18;
        this.player.position.y = -16;
        this.player.set_radius(3);
        this.player.color = new BABYLON.Color4(1, 1, 1, 1);
        
        this.figures.push(this.player);
    }
} 