class App {

    protected graphicOutput: GraphicOutput;
    protected renderer3d: Renderer3d;
    protected renderer2d: Renderer2d;
    public scene: Scene;
    protected phisics: Phisics;
    protected inputDevices: InputDevices;
    private previousFrameTime: number;

    constructor(graphicOutput: GraphicOutput, inputDevices: InputDevices) {
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
        this.renderer3d = new Renderer3d(this.createRendererOutput());
        this.renderer2d = this.renderer3d.renderer2d;
    }

    private start() {
        this.onStart(() => {
            this.createScene((scene) => {
                this.scene = scene;

                requestAnimationFrame(() => this.loopAnimation());

                if (this.inputDevices.keyboard != null)
                    this.inputDevices.keyboard.inputEvent.addHandler(args => {
                        this.handleKeyboardEvent(args);
                    });

                if (this.inputDevices.mouse != null)
                    this.inputDevices.mouse.inputEvent.addHandler(args => {
                        this.handleMouseEvent(args);
                    });
            });
        });
    }

    protected onStart(continuation: () => any) {
        continuation();
    }

    protected createRendererOutput(): RendererOutput {
        return new RendererOutput(this.graphicOutput.get_buffer());
    }

    protected createScene(continuation: (scene: Scene) => void) {
        continuation(new Scene());
    }

    private loopAnimation() {
        this.doAnimationStep();
        requestAnimationFrame(() => this.loopAnimation());
    }

    private doAnimationStep() {
        var now = new Date().getTime();
        var fps = 1000.0 / (now - this.previousFrameTime) >> 0;
        this.previousFrameTime = now;
        this.doLogicStep();
        this.drawFrame();
        this.drawFps(fps);
    }

    protected doLogicStep() {
        for (var i = 0; i < this.scene.figures.length; i++) {
            var f = this.scene.figures[i];
            f.position.x += f.velocity.x;
            f.position.y += f.velocity.y;
        }
    }

    protected drawFrame() {
        this.renderer3d.output.clear();
        this.renderer3d.drawScene(this.scene);
        this.graphicOutput.drawBuffer();
    }

    private drawFps(fps: number) {
        this.graphicOutput.drawText(fps.toString(), 11, 26, "000000");
        this.graphicOutput.drawText(fps.toString(), 10, 25);
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        var k = eventArgs.pressedKey;
        var cameraDelta = 3;

        if (this.scene) {
            if (k == 189) {
                this.scene.camera.position.z += cameraDelta;
            }

            if (k == 187) {
                this.scene.camera.position.z -= cameraDelta;
            }
        }
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {

        if (this.scene)
            this.scene.camera.position.z += eventArgs.wheelDelta / 50;
    }
}