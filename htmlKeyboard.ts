class HtmlKeyboard extends Keyboard {

    constructor() {
        super();
        window.addEventListener("keydown",(e) => this.inputEvent.raise(new KeyboardEventArgs(e.keyCode)), true);
    }
}