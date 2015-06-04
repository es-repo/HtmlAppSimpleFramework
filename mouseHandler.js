var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MouseEventArgs = (function (_super) {
    __extends(MouseEventArgs, _super);
    function MouseEventArgs() {
        _super.apply(this, arguments);
        this.wheelDelta = 0;
    }
    return MouseEventArgs;
})(InputControllerEventArgs);
var MouseHandler = (function (_super) {
    __extends(MouseHandler, _super);
    function MouseHandler() {
        _super.apply(this, arguments);
        this.mouseEvent = new AbstractEvent();
    }
    return MouseHandler;
})(InputControllerHanlder);
//# sourceMappingURL=mouseHandler.js.map