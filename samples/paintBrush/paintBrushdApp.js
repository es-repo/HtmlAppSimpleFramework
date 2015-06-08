var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PaintBrushApp = (function (_super) {
    __extends(PaintBrushApp, _super);
    function PaintBrushApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        var imagewWidth = graphicOutput.get_width();
        var imageHeight = graphicOutput.get_height();
        this.image = ColorBuffer.create(imagewWidth, imageHeight);
        var rendererOutput = new RendererOutput(this.image);
        this.imageRenderer2d = new Renderer2d(rendererOutput);
    }
    PaintBrushApp.prototype.createScene = function (continuation) {
        this.image.setAll(255);
        this.imageRenderer2d.drawFilledCircle(100, 100, 0, 80, new BABYLON.Color4(1, 0, 0, 1));
        var scene = new Scene();
        var sprite = new Sprite(this.image);
        scene.figures.push(sprite);
        var circle = new Circle();
        circle.set_radius(3);
        circle.position.x = -5;
        circle.color = new BABYLON.Color4(0, 1, 0, 1);
        scene.figures.push(circle);
        continuation(scene);
    };
    //protected drawFrame() {
    //    this.imageRenderer2d.drawFilledCircle(300, 300, 0, 100, new BABYLON.Color4(1, 1, 1, 1));
    //    this.graphicOutputRender2d.drawImage(0, 0, 0, this.imageRenderer2d.output.colorBuffer);
    //    //ColorBufferUtils.copy(this.renderer2d.output.colorBuffer, 0, 0, 500, 500, this.graphicOutput.get_buffer(), 0, 0);
    //    this.graphicOutput.drawBuffer();
    //}
    PaintBrushApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
    };
    PaintBrushApp.prototype.handleMouseEvent = function (eventArgs) {
        _super.prototype.handleMouseEvent.call(this, eventArgs);
        if (eventArgs.leftButtonClicked) {
            var scale = this.scene.camera.position.z * 0.00055;
            this.scene.camera.direction.y += eventArgs.deltaY * scale;
            this.scene.camera.direction.x += eventArgs.deltaX * scale;
        }
    };
    return PaintBrushApp;
})(App);
