var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HtmlMouse = (function (_super) {
    __extends(HtmlMouse, _super);
    function HtmlMouse(elementId) {
        var _this = this;
        _super.call(this);
        var elem = document.getElementById(elementId);
        elem.addEventListener('mousemove', function (e) {
            _this.fromBrowserEventArgs(e, 'mousemove');
        });
        elem.addEventListener('click', function (e) {
            _this.fromBrowserEventArgs(e, 'click');
        });
        elem.addEventListener('wheel', function (e) {
            _this.fromBrowserEventArgs(e, 'wheel');
        });
    }
    HtmlMouse.prototype.fromBrowserEventArgs = function (e, eventName) {
        var evt = e;
        var args = new MouseEventArgs();
        if (eventName == "click") {
            args.leftButtonClicked = true;
        }
        else if (eventName == "mousemove") {
            args.leftButtonClicked = evt.buttons == 1;
        }
        else if (eventName == "wheel") {
            args.wheelDelta = evt.deltaY || evt.detail || evt.wheelDelta;
        }
        args.x = evt.pageX - evt.target.offsetLeft;
        args.y = evt.pageY - evt.target.offsetTop;
        if (this.prevArgs != null) {
            args.deltaX = args.x - this.prevArgs.x;
            args.deltaY = args.y - this.prevArgs.y;
        }
        this.prevArgs = args;
        this.inputEvent.raise(args);
    };
    return HtmlMouse;
})(Mouse);
