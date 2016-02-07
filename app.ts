class App {

    protected graphicOutput: GraphicOutput;
    public renderer3d: Renderer3d;
    public renderer2d: Renderer2d;
    public scene: Scene;
    protected phisics: Phisics;
    protected inputDevices: InputDevices;
    private previousFrameTime: number;

    protected showDebugInfo = false;
    protected mouseWheelVectorControl: BABYLON.Vector3;

    constructor(graphicOutput: GraphicOutput, inputDevices: InputDevices) {
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
        var rendererOutput = new RendererOutput(this.graphicOutput.get_buffer());
        this.renderer3d = new Renderer3d(rendererOutput);
        this.renderer2d = this.renderer3d.renderer2d;
    }

    private start() {
        this.onStart(() => {
            this.createScene((scene) => {
                this.scene = scene;
                this.mouseWheelVectorControl = this.scene.camera.position;

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
        if (this.showDebugInfo)
            this.drawDebugInfo();
    }

    // TODO: rename to tick.
    protected doLogicStep() {
        
        this.scene.tick();

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

    protected drawDebugInfo() {
        this.drawVectorInfo(this.scene.camera.position, 10, 40, "camera");
        this.drawVectorInfo(this.scene.light.position, 10, 50, "light");
    }

    protected drawVectorInfo(v: BABYLON.Vector3, x: number, y: number, description = "") {
        if (description != "")
            description += ": ";
        this.graphicOutput.drawText(description + "(" + v.x + "," + v.y + "," + v.z + ")", x + 1, y + 1, "000000", 10);
        this.graphicOutput.drawText(description + "(" + v.x + "," + v.y + "," + v.z + ")", x, y, "ffffff", 10);
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {

        var k = eventArgs.pressedKey;
        var cameraDelta = 3;

        if (this.scene) {
            if (k == 187) {
                this.scene.camera.position.z += cameraDelta;
            }

            if (k == 189) {
                this.scene.camera.position.z -= cameraDelta;
            }

            if (k == 67)
                this.mouseWheelVectorControl = this.scene.camera.position;

            if (k == 76)
                this.mouseWheelVectorControl = this.scene.light.position;
        }
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {

        if (this.scene) {
            if (eventArgs.wheelDelta != 0) {
                this.mouseWheelVectorControl.z -= eventArgs.wheelDelta / 50;
            }
        }
    }
}