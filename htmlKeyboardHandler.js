var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlKeyboardHandler = (function (_super) {
    __extends(HtmlKeyboardHandler, _super);
    function HtmlKeyboardHandler() {
        var _this = this;
        _super.call(this);
        window.addEventListener("keydown", function (e) { return _this.inputEvent.raise(new KeyboardEventArgs(e.keyCode)); }, true);
    }
    return HtmlKeyboardHandler;
})(Keyboard);
//# sourceMappingURL=htmlKeyboardHandler.js.map