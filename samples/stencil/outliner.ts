class Outliner {

    public static findOutlines(colorBuffer: ColorBuffer): { x: number; y: number }[][] {
        var bw = Outliner.toBlackWhite(colorBuffer);
        return Outliner.findOutlinesBW(bw);
    }

    public static findOutlinesBW(arr: number[][]): { x: number; y: number }[][] {

        var outlines = [];
        var outlineStart = { x: 0, y: 0 };
        while ((outlineStart = Outliner.findNextOutlineStart(arr, outlineStart)) != null) {
            var outline = Outliner.findOutline(arr, outlineStart);
            outlines.push(outline);
        }
        return outlines;
    }

    private static toBlackWhite(colorBuffer: ColorBuffer): number[][] {
        var arr = new Array(colorBuffer.height);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(colorBuffer.width);
            for (var j = 0; j < colorBuffer.width; j++) {
                var c = colorBuffer.get_index(j, i);
                var r = colorBuffer.array[c];
                var g = colorBuffer.array[c + 1];
                var b = colorBuffer.array[c + 2];
                var bw = r > 127 || g > 127 || b > 127 ? 1 : 0;
                arr[i][j] = bw;;
            }
        }
        return arr;
    }

    private static findOutline(arr: number[][], lookupStart: { x: number; y: number }): { x: number; y: number }[] {

        var pos = lookupStart;
        var outline = [pos];
        arr[pos.y][pos.x] = 2;
        var nextd;
        while ((nextd = Outliner.getNextDirection(arr, pos)) != null) {
            pos = { x: pos.x + nextd.x, y: pos.y + nextd.y };
            outline.push(pos);
            arr[pos.y][pos.x] = 2;
        }
        return outline;
    }

    private static findNextOutlineStart(arr: number[][], start: { x: number; y: number }): { x: number; y: number } {
        
        var startx = start.x;
        for (var i = start.y; i < arr.length; i++) {
            var inside = false;
            for (var j = startx; j < arr[0].length; j++) {
                switch (arr[i][j]) {
                    case 0:
                        inside = false;
                        break;
                    case 1:
                        if (!inside)
                            return { x: j, y: i };
                        break;
                    case 2:
                        inside = true;
                        break;
                }
            }
            startx = 0;
        }
        return null;
    }

    private static getNextDirection(arr: number[][], pos: { x: number; y: number }) {

        var rightd = { x: 1, y: 0 };
        var upd = { x: 0, y: 1 };
        var downd = { x: 0, y: -1 };
        var rightupd = { x: 1, y: 1 };
        var leftd = { x: -1, y: 0 };
        var rightdownd = { x: 1, y: -1 };
        var leftdownd = { x: -1, y: -1 }
        var leftupd = { x: -1, y: 1 }

        var directions = [rightd, upd, downd, leftd, rightupd, rightdownd, leftdownd, leftupd];
        for (var i = 0; i < directions.length; i++) {
            var d = directions[i];
            if (Outliner.canGo(arr, pos, d))
                return d;
        }
        return null;
    }

    private static canGo(arr: number[][], pos: { x: number; y: number }, d: { x: number; y: number }): boolean {
        var nextPos = { x: pos.x + d.x, y: pos.y + d.y };
        var freeInNextPos = Outliner.inArrayBoundares(arr, nextPos.x, nextPos.y) && arr[nextPos.y][nextPos.x] == 1;
        var emptyDown = !Outliner.inArrayBoundares(arr, nextPos.x, nextPos.y + 1) || arr[nextPos.y + 1][nextPos.x] == 0;
        var emptyUp = !Outliner.inArrayBoundares(arr, nextPos.x, nextPos.y - 1) || arr[nextPos.y - 1][nextPos.x] == 0;
        var emptyLeft = !Outliner.inArrayBoundares(arr, nextPos.x - 1, nextPos.y) || arr[nextPos.y][nextPos.x - 1] == 0;
        var emptyRight = !Outliner.inArrayBoundares(arr, nextPos.x + 1, nextPos.y) || arr[nextPos.y][nextPos.x + 1] == 0;
        return freeInNextPos && (emptyUp || emptyDown || emptyLeft || emptyRight);

    }

    private static inArrayBoundares(arr: number[][], x: number, y: number): boolean {
        return x >= 0 && x < arr[0].length && y >= 0 && y < arr.length;
    }
}