class AbstractEventArgs {
}

class AbstractEvent<EventArgsT> {
    protected handlers: {(EventArgsT): void; }[] = [];

    public addHandler(handler: (args: EventArgsT) => void) {
        this.handlers.push(handler);
    }

    public removeHandler(handler: (args: EventArgsT) => void) {
        var index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }

    public raise(args: EventArgsT) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i](args);
        }
    }
}