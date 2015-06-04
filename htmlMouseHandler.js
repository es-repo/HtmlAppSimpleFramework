var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlMouseHandler = (function (_super) {
    __extends(HtmlMouseHandler, _super);
    function HtmlMouseHandler() {
        var _this = this;
        _super.call(this);
        window.addEventListener('mousemove', function (e) {
            _this.fromBrowserEventArgs(e, 'mousemove');
        });
        window.addEventListener('wheel', function (e) {
            _this.fromBrowserEventArgs(e, 'wheel');
        });
    }
    HtmlMouseHandler.prototype.fromBrowserEventArgs = function (e, eventName) {
        var evt = e;
        var args = new MouseEventArgs();
        if (eventName == "mousemove") {
            var button = typeof evt.buttons == "undefined" ? evt.which : evt.buttons;
            args.leftButtonClicked = button == 1;
        }
        else if (eventName == "wheel") {
            args.wheelDelta = evt.deltaY || evt.detail || evt.wheelDelta;
        }
        args.x = evt.pageX;
        args.y = evt.pageY;
        if (this.prevArgs != null) {
            args.deltaX = args.x - this.prevArgs.x;
            args.deltaY = args.y - this.prevArgs.y;
        }
        this.prevArgs = args;
        this.inputEvent.raise(args);
    };
    return HtmlMouseHandler;
})(Mouse);
//# sourceMappingURL=htmlMouseHandler.js.map