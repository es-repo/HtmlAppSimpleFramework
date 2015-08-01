var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PaintTool;
(function (PaintTool) {
    PaintTool[PaintTool["brush"] = 0] = "brush";
    PaintTool[PaintTool["move"] = 1] = "move";
})(PaintTool || (PaintTool = {}));
var PaintBrushApp = (function (_super) {
    __extends(PaintBrushApp, _super);
    function PaintBrushApp(graphicOutput, inputControllerHandlers) {
        var _this = this;
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.brushColor = new BABYLON.Color4(1, 0, 0, 1);
        this.drunkModeShift = Math.PI / 2;
        var imagewWidth = graphicOutput.get_width() * 0.5;
        var imageHeight = graphicOutput.get_height() * 0.5;
        this.image = ColorBuffer.create(imagewWidth, imageHeight);
        var rendererOutput = new RendererOutput(this.image);
        this.imageRenderer2d = new Renderer2d(rendererOutput);
        this.paintTool = 0 /* brush */;
        this.showDebugInfo = true;
        var canvas = document.getElementById("canvas");
        var brushToolRadio = document.getElementById("brushToolRadio");
        brushToolRadio.addEventListener("click", function (ev) {
            canvas.style.cursor = "pointer";
            _this.paintTool = 0 /* brush */;
        });
        var moveToolRadio = document.getElementById("moveToolRadio");
        moveToolRadio.addEventListener("click", function (ev) {
            canvas.style.cursor = "move";
            _this.paintTool = 1 /* move */;
        });
        var drunkModeCheckbox = document.getElementById("drunkModeCheckbox");
        drunkModeCheckbox.addEventListener("click", function (ev) {
            _this.isDrunkMode = drunkModeCheckbox.checked;
        });
        var colorSelect = document.getElementById("colorSelect");
        colorSelect.addEventListener("change", function (ev) {
            switch (colorSelect.value) {
                case "black":
                    _this.brushColor = new BABYLON.Color4(0, 0, 0, 1);
                    break;
                case "white":
                    _this.brushColor = new BABYLON.Color4(1, 1, 1, 1);
                    break;
                case "red":
                    _this.brushColor = new BABYLON.Color4(1, 0, 0, 1);
                    break;
                case "orange":
                    _this.brushColor = new BABYLON.Color4(1, 0.5, 0, 1);
                    break;
                case "yellow":
                    _this.brushColor = new BABYLON.Color4(1, 1, 0, 1);
                    break;
                case "green":
                    _this.brushColor = new BABYLON.Color4(0, 1, 0, 1);
                    break;
                case "blue":
                    _this.brushColor = new BABYLON.Color4(0, 1, 1, 1);
                    break;
                case "indigo":
                    _this.brushColor = new BABYLON.Color4(0, 0, 1, 1);
                    break;
                case "violet":
                    _this.brushColor = new BABYLON.Color4(1, 0, 1, 1);
                    break;
            }
        });
    }
    PaintBrushApp.prototype.createScene = function (continuation) {
        this.image.setAll(255);
        var scene = new Scene();
        this.sprite = new Sprite(this.image);
        this.sprite.size.x = this.image.width * 0.07;
        this.sprite.size.y = this.image.height * 0.07;
        this.sprite.position.z = 0;
        scene.figures.push(this.sprite);
        continuation(scene);
    };
    PaintBrushApp.prototype.doLogicStep = function () {
        _super.prototype.doLogicStep.call(this);
        if (this.isDrunkMode) {
            var v = new BABYLON.Vector3(Math.sin(this.drunkModeShift) * 0.1, Math.cos(this.drunkModeShift) * 0.1, Math.sin(this.drunkModeShift - Math.PI / 2) * 0.4);
            this.sprite.position.x += v.x;
            this.sprite.position.y += v.y;
            this.scene.camera.position.z += v.z;
            this.drunkModeShift -= 0.05;
        }
    };
    PaintBrushApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
    };
    PaintBrushApp.prototype.handleMouseEvent = function (eventArgs) {
        _super.prototype.handleMouseEvent.call(this, eventArgs);
        if (eventArgs.leftButtonClicked) {
            switch (this.paintTool) {
                case 1 /* move */:
                    var dx = eventArgs.deltaX * this.sprite.size.x / this.sprite.projectedSize.x;
                    var dy = eventArgs.deltaY * this.sprite.size.y / this.sprite.projectedSize.y;
                    this.sprite.position.x -= dx;
                    this.sprite.position.y -= dy;
                    break;
                case 0 /* brush */:
                    var xy0 = this.displayToImageCoords(eventArgs.x - eventArgs.deltaX, eventArgs.y - eventArgs.deltaY);
                    var xy1 = this.displayToImageCoords(eventArgs.x, eventArgs.y);
                    this.imageRenderer2d.drawLine(xy0.x, xy0.y, xy1.x, xy1.y, this.sprite.projectedPosition.z, this.brushColor);
            }
        }
    };
    PaintBrushApp.prototype.displayToImageCoords = function (dx, dy) {
        var scaleX = this.image.width / this.sprite.projectedSize.x;
        var scaleY = this.image.height / this.sprite.projectedSize.y;
        var x = (dx - (this.sprite.projectedPosition.x - this.sprite.projectedSize.x / 2)) * scaleX;
        var y = (dy - (this.sprite.projectedPosition.y - this.sprite.projectedSize.y / 2)) * scaleY;
        return { x: x, y: y };
    };
    return PaintBrushApp;
})(App);
