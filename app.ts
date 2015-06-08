﻿class App {

    protected graphicOutput: GraphicOutput;
    protected renderer3d: Renderer3d;
    protected scene: Scene;
    protected phisics: Phisics;
    protected inputDevices: InputDevices;
    private previousFrameTime: number;

    constructor(graphicOutput: GraphicOutput, inputDevices: InputDevices) {
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
        this.renderer3d = new Renderer3d(this.createRendererOutput());
    }

    private start() {
        this.onStart();
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
    }

    protected onStart() {}

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
    }

    protected drawFrame() {
        this.renderer3d.output.clear();
        this.renderer3d.drawScene(this.scene);
        this.graphicOutput.drawBuffer();
    }

    private drawFps(fps: number) {
        this.graphicOutput.drawText(fps.toString(), 10, 25);
    }

    protected handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
    }

    protected handleMouseEvent(eventArgs: MouseEventArgs) {
    }
}