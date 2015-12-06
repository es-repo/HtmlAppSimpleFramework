var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InputDeviceEventArgs = (function (_super) {
    __extends(InputDeviceEventArgs, _super);
    function InputDeviceEventArgs() {
        _super.apply(this, arguments);
    }
    return InputDeviceEventArgs;
})(AbstractEventArgs);
var InputDevice = (function () {
    function InputDevice() {
        this.inputEvent = new AbstractEvent();
    }
    return InputDevice;
})();
