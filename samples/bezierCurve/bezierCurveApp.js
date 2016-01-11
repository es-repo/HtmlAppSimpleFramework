var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BezierCurveApp = (function (_super) {
    __extends(BezierCurveApp, _super);
    function BezierCurveApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
        this.controlPoints = [];
        this.controlPointSize = 8;
        this.controlPointColor = new BABYLON.Color4(1, 1, 1, 1);
    }
    BezierCurveApp.prototype.doLogicStep = function () {
    };
    BezierCurveApp.prototype.drawFrame = function () {
        this.drawControlPoints();
        this.graphicOutput.drawBuffer();
    };
    BezierCurveApp.prototype.drawControlPoints = function () {
        for (var i = 0; i < this.controlPoints.length; i++) {
            var cp = this.controlPoints[i];
            var x = cp.x - this.controlPointSize / 2;
            var y = cp.y - this.controlPointSize / 2;
            this.renderer2d.drawFilledRectangle(x, y, 0, this.controlPointSize, this.controlPointSize, this.controlPointColor);
        }
    };
    BezierCurveApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
    };
    BezierCurveApp.prototype.handleMouseEvent = function (eventArgs) {
        if (eventArgs.leftButtonClicked && !eventArgs.move) {
            var cp = new BABYLON.Vector2(eventArgs.x, eventArgs.y);
            this.controlPoints.push(cp);
        }
    };
    return BezierCurveApp;
})(App);
