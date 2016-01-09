class HtmlMouse extends Mouse {

    private prevArgs: MouseEventArgs;

    constructor(elementId: string) {
        super();
        var elem = document.getElementById(elementId);

        elem.addEventListener('mousemove', e => {
            this.fromBrowserEventArgs(e, 'mousemove');
        });

        elem.addEventListener('click', e => {           
            this.fromBrowserEventArgs(e, 'click');
        });

        elem.addEventListener('wheel', e => {
            this.fromBrowserEventArgs(e, 'wheel');
        });
    }

    private fromBrowserEventArgs(e: Event, eventName: string) {
        var evt = <any>e;
        
        var args = new MouseEventArgs();

        if (eventName == "click") {
            args.leftButtonClicked = true;
        }
        else if (eventName == "mousemove") {
            args.leftButtonClicked = evt.buttons == 1;
            args.move = true;
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
    }
}