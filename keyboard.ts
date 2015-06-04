class KeyboardEventArgs extends InputDeviceEventArgs {
    public pressedKey: number;

    constructor(pressedKey: number) {
        super();
        this.pressedKey = pressedKey;
    }
}

class Keyboard extends InputDevice<KeyboardEventArgs> {
}