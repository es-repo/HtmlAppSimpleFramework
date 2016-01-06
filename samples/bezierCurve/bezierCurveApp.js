var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BezierCurveApp = (function (_super) {
    __extends(BezierCurveApp, _super);
    function BezierCurveApp(graphicOutput, inputControllerHandlers) {
        _super.call(this, graphicOutput, inputControllerHandlers);
    }
    BezierCurveApp.prototype.doLogicStep = function () {
    };
    BezierCurveApp.prototype.handleKeyboardEvent = function (eventArgs) {
        _super.prototype.handleKeyboardEvent.call(this, eventArgs);
    };
    BezierCurveApp.prototype.handleMouseEvent = function (eventArgs) {
    };
    return BezierCurveApp;
})(App);
