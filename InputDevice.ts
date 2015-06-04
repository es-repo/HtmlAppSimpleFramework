class InputDeviceEventArgs extends AbstractEventArgs {
}

class InputDevice<InputDeviceEventArgsT> {
    public inputEvent: AbstractEvent<InputDeviceEventArgsT> = new AbstractEvent<InputDeviceEventArgsT>();
}