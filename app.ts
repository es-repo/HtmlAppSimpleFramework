class App {
    
    private graphicDevice: GraphicDevice;
    private scene: Scene;
    private phisics: Phisics;
    private inputDevices: InputDevices;

    private previousFrameTime: number;

    constructor(graphicDevice: GraphicDevice, inputDevices: InputDevices) {
        this.graphicDevice = graphicDevice;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
    }

    start() {
        this.createScene((scene) => {
            this.scene = scene;
            requestAnimationFrame(() => this.appLoop());

            if (this.inputDevices.keyboard != null)
                this.inputDevices.keyboard.inputEvent.addHandler(args => this.handleKeyboardEvent(args, this.scene));

            if (this.inputDevices.mouse != null)
                this.inputDevices.mouse.inputEvent.addHandler(args => this.handleMouseEvent(args, this.scene));
        });
    }

    private appLoop() {

        var now = new Date().getTime();
        var fps = 1000.0 / (now - this.previousFrameTime) >> 0;
        this.previousFrameTime = now;
        
        this.processScene(this.scene, this.phisics);
        this.drawFrame(this.graphicDevice, this.scene);
        this.graphicDevice.drawFps(fps);
        requestAnimationFrame(() => this.appLoop());
    }

    protected createScene(continuation: (scene: Scene)=> void) {
        continuation(new Scene());    
    }

    protected processScene(scene: Scene, phisics: Phisics) {
    }

    protected drawFrame(graphicDevice: GraphicDevice, scene: Scene) {

        var outputBuffer = graphicDevice.get_outputBuffer();
        //outputBuffer.clear();
        var renderer3d = new Renderer3d(outputBuffer);
        renderer3d.drawScene(this.scene);
        graphicDevice.presentOutputBuffer();
    }

    protected handleKeyboardEvent(eventArgs: KeyboardEventArgs, scene: Scene) {
    }

    protected handleMouseEvent(eventArgs: MouseEventArgs, scene: Scene) {
    }
}