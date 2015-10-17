var __extends = (this && this.__extends) || function (d, b) {
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
})(InputDeviceEventArgs);
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        _super.apply(this, arguments);
    }
    return Keyboard;
})(InputDevice);
