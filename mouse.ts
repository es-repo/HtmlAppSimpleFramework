class MouseEventArgs extends InputDeviceEventArgs {
    public leftButtonClicked: boolean;
    public move: boolean;
    public x: number;
    public y: number;
    public deltaX: number;
    public deltaY: number;
    public wheelDelta: number = 0;
}

class Mouse extends InputDevice<MouseEventArgs> {
}