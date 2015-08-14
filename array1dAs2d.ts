class Array1dAs2d<T> {
    public array: T[];
    public width: number;
    public height: number;
    private step: number;

    constructor(array: T[], width: number, step: number = 1) {
        this.array = array;
        this.width = width;
        this.height = array.length / width / step;
        this.step = step;
    }

    public get_index(x: number, y: number) : number {
        return (y * this.width + x) * this.step; 
    }

    public get(x: number, y: number): T {
        return this.array[this.get_index(x, y)];
    }

    public set(x: number, y: number, v: T) {
        this.array[this.get_index(x, y)] = v;
    }

    public setAll(v: T) {
        for (var i = 0; i < this.array.length; i++)
            this.array[i] = v;
    }

    public copy(from: Array1dAs2d<T>) {
        for (var i = 0; i < this.array.length; i++)
            this.array[i] = from.array[i];
    }
}