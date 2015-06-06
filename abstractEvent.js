var AbstractEventArgs = (function () {
    function AbstractEventArgs() {
    }
    return AbstractEventArgs;
})();
var AbstractEvent = (function () {
    function AbstractEvent() {
        this.handlers = [];
    }
    AbstractEvent.prototype.addHandler = function (handler) {
        this.handlers.push(handler);
    };
    AbstractEvent.prototype.removeHandler = function (handler) {
        var index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    };
    AbstractEvent.prototype.raise = function (args) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i](args);
        }
    };
    return AbstractEvent;
})();
