var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KeyboardEventArgs = (function (_super) {
    __extends(KeyboardEventArgs, _super);
    function KeyboardEventArgs(pressedKey) {
        _super.call(this);
        this.pressedKey = pressedKey;
    }
    return KeyboardEventArgs;
})(InputControllerEventArgs);
var KeyboardHandler = (function (_super) {
    __extends(KeyboardHandler, _super);
    function KeyboardHandler() {
        _super.apply(this, arguments);
        this.keyboardEvent = new AbstractEvent();
    }
    return KeyboardHandler;
})(InputControllerHanlder);
//# sourceMappingURL=keyboardHandler.js.map