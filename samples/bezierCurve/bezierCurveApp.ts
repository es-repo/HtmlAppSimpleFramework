class BezierCurveApp extends App {    

    private controlPoints: BABYLON.Vector2[] = [];
    private controlPointSize: number = 8;
    private controlPointColor: BABYLON.Color4 = new BABYLON.Color4(1, 1, 1, 1);

    constructor(graphicOutput: GraphicOutput, inputControllerHandlers: InputDevices) {
        super(graphicOutput, inputControllerHandlers);        
    }    

    protected doLogicStep() {
    }
    
    protected drawFrame() {
        this.drawControlPoints();        
        this.graphicOutput.drawBuffer();
    }   
    
    private drawControlPoints()
    {
        for (var i = 0; i < this.controlPoints.length; i++){
            var cp = this.controlPoints[i];
            var x = cp.x - this.controlPointSize / 2;
            var y = cp.y - this.controlPointSize / 2;
            this.renderer2d.drawFilledRectangle(x, y, 0, this.controlPointSize, this.controlPointSize, this.controlPointColor);
        }        
    } 

    public handleKeyboardEvent(eventArgs: KeyboardEventArgs) {
        super.handleKeyboardEvent(eventArgs);
    }

    public handleMouseEvent(eventArgs: MouseEventArgs) {
        if (eventArgs.leftButtonClicked && !eventArgs.move) {
            var cp = new BABYLON.Vector2(eventArgs.x, eventArgs.y);
            this.controlPoints.push(cp);
        }        
    }
}