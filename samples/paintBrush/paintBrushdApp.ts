enum PaintTool {
    brush,
    move
}

class PaintBrushApp extends App {

    private image: ColorBuffer;
    private sprite: Sprite;
    private imageRenderer2d: Renderer2d;
    private paintTool: PaintTool;
    private brushColor: BABYLON.Color4 = new BABYLON.Color4(1, 0, 0, 1);
    private isDrunkMode: boolean;
    private drunkModeShift: number = Math.PI / 2;

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);
        var imagewWidth = graphicOutput.get_width() * 0.5;
        var imageHeight = graphicOutput.get_height() * 0.5;
        this.image = ColorBuffer.create(imagewWidth, imageHeight);
        var rendererOutput = new RendererOutput(this.image);
        this.imageRenderer2d = new Renderer2d(rendererOutput);
        this.paintTool = PaintTool.brush;

        var canvas = document.getElementById("canvas");

        var brushToolRadio = <HTMLInputElement>document.getElementById("brushToolRadio");
        brushToolRadio.addEventListener("click", ev => {
            canvas.style.cursor = "pointer";
            this.paintTool = PaintTool.brush;
        });

        var moveToolRadio = <HTMLInputElement>document.getElementById("moveToolRadio");
        moveToolRadio.addEventListener("click", ev => {
            canvas.style.cursor = "move";
            this.paintTool = PaintTool.move;
        });

        var drunkModeCheckbox = <HTMLInputElement>document.getElementById("drunkModeCheckbox");
        drunkModeCheckbox.addEventListener("click", ev => {
            this.isDrunkMode = drunkModeCheckbox.checked;
        });

        var colorSelect = <HTMLSelectElement>document.getElementById("colorSelect");
        colorSelect.addEventListener("change", ev => {
            switch (colorSelect.value) {
                case "black":
                    this.brushColor = new BABYLON.Color4(0, 0, 0, 1);
                    break;
                case "white":
                    this.brushColor = new BABYLON.Color4(1, 1, 1, 1);
                    break;
                case "red":
                    this.brushColor = new BABYLON.Color4(1, 0, 0, 1);
                    break;
                case "orange":
                    this.brushColor = new BABYLON.Color4(1, 0.5, 0, 1);
                    break;
                case "yellow":
                    this.brushColor = new BABYLON.Color4(1, 1, 0, 1);
                    break;
                case "green":
                    this.brushColor = new BABYLON.Color4(0, 1, 0, 1);
                    break;
                case "blue":
                    this.brushColor = new BABYLON.Color4(0, 1, 1, 1);
                    break;
                case "indigo":
                    this.brushColor = new BABYLON.Color4(0, 0, 1, 1);
                    break;
                case "violet":
                    this.brushColor = new BABYLON.Color4(1, 0, 1, 1);
                    break;
            }
        });
    }

    protected createScene(continuation: (Scene: Scene) => void) {
        this.image.setAll(255);
        var scene = new Scene();
        this.sprite = new Sprite(this.image);
        this.sprite.size.x = this.image.width * 0.07;
        this.sprite.size.y = this.image.height * 0.07;
        this.sprite.position.z = 45;
        scene.figures.push(this.sprite);
        continuation(scene);
    }

    protected doLogicStep() {
        super.doLogicStep();

        if (this.isDrunkMode) {
            var v = new BABYLON.Vector3(
                Math.sin(this.drunkModeShift) * 0.1,
                Math.cos(this.drunkModeShift) * 0.1,
                Math.sin(this.drunkModeShift - Math.PI / 2) * 0.4);
            this.sprite.position.x += v.x;
            this.sprite.position.y += v.y;
            this.scene.camera.position.z += v.z;
            this.drunkModeShift -= 0.05;
        }
    }

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
        super.handleKeyboardEvent(eventArgs);
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {
        super.handleMouseEvent(eventArgs);

        if (eventArgs.leftButtonClicked) {
            switch (this.paintTool) {
                case PaintTool.move:
                    var dx = eventArgs.deltaX * this.sprite.size.x / this.sprite.projectedSize.x;
                    var dy = eventArgs.deltaY * this.sprite.size.y / this.sprite.projectedSize.y;
                    this.sprite.position.x -= dx;
                    this.sprite.position.y -= dy;
                    break;

                case PaintTool.brush:
                    var xy0 = this.displayToImageCoords(eventArgs.x - eventArgs.deltaX, eventArgs.y - eventArgs.deltaY);
                    var xy1 = this.displayToImageCoords(eventArgs.x, eventArgs.y);
                    this.imageRenderer2d.drawLine(xy0.x, xy0.y, xy1.x, xy1.y, this.sprite.projectedPosition.z, this.brushColor);
            }
        }
    }

    private displayToImageCoords(dx: number, dy: number): { x: number; y: number } {
        var scaleX = this.image.width / this.sprite.projectedSize.x;
        var scaleY = this.image.height / this.sprite.projectedSize.y;
        var x = (dx - (this.sprite.projectedPosition.x - this.sprite.projectedSize.x / 2)) * scaleX;
        var y = (dy - (this.sprite.projectedPosition.y - this.sprite.projectedSize.y / 2)) * scaleY;
        return { x: x, y: y };
    }
}