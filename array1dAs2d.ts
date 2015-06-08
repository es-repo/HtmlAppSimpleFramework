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

    public get_index(x: number, y: number) {
        return (y * this.width + x) * this.step; 
    }

    public get(x: number, y: number) {
        return this.array[this.get_index(x, y)];
    }

    public set(x: number, y: number, v: T) {
        return this.array[this.get_index(x, y)] = v;
    }

    public setAll(v: T) {
        for (var i = 0; i < this.array.length; i++)
            this.array[i] = v;
    }

    public copy(source: Array1dAs2d<T>, sourceX: number, sourceY, sourceWidth: number, sourceHeight: number, destX: number, destY) {
        for (var y = 0; y < sourceHeight; y++) {
            var sourceIndex = this.get_index(sourceX, sourceY + y);
            var destIndex = this.get_index(destX, destY + y);
            for (var x = 0; x < sourceWidth * this.step; x++) {
                this.array[destIndex + x] = source[sourceIndex + x];
            } 
        }
    }
}