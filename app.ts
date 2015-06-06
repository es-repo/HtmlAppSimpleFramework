class App {
    
    private graphicOutput: GraphicOutput;
    private renderer: Renderer;
    private scene: Scene;
    private phisics: Phisics;
    private inputDevices: InputDevices;

    private previousFrameTime: number;

    constructor(graphicOutput: GraphicOutput, inputDevices: InputDevices) {
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
    }

    start() {
        this.createScene((scene) => {
            this.scene = scene;
            this.renderer = this.createRenderer(this.graphicOutput);

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
        this.drawFrame(this.graphicOutput, this.scene, this.renderer);
        this.drawFps(this.graphicOutput, fps);
        requestAnimationFrame(() => this.appLoop());
    }

    protected createScene(continuation: (scene: Scene)=> void) {
        continuation(new Scene());    
    }

    protected processScene(scene: Scene, phisics: Phisics) {
    }

    protected createRenderer(graphicOutput: GraphicOutput) : Renderer {
        var renderOutput = new RendererOutput(graphicOutput.get_buffer(), graphicOutput.get_width(), graphicOutput.get_height());
        return new Renderer3d(renderOutput);
    }

    protected drawFrame(graphicOutput: GraphicOutput, scene: Scene, renderer: Renderer) {
        renderer.output.clear();
        (<Renderer3d>renderer).drawScene(this.scene);
        graphicOutput.drawBuffer();
    }

    private drawFps(graphicalOutput: GraphicOutput, fps: number) {
        graphicalOutput.drawText(fps.toString(), 10, 30);
    }

    protected handleKeyboardEvent(eventArgs: KeyboardEventArgs, scene: Scene) {
    }

    protected handleMouseEvent(eventArgs: MouseEventArgs, scene: Scene) {
    }
}