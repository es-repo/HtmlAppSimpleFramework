interface Triangle {
    a: { x: number; y: number };
    b: { x: number; y: number };
    c: { x: number; y: number };
}

class Triangulator {

    public static triangulate(polygon: Coord[]): Triangle[] {
        var triangles = [];
        var points = polygon.slice();
        for (var j = 2, i = 0; j < polygon.length; j++) {
            var l = points.length;
            i = Triangulator.getNextEar(points, i);
            var ia = i % l;
            var ib = (i + 1) % l;
            var ic = (i + 2) % l;
            var t = { a: points[ia], b: points[ib], c: points[ic] };
            if (!Triangulator.collinear(t.a, t.b, t.c))
                triangles.push(t);
            points.splice(ib, 1);
            if (i > ib)
                i--;
        }
        return triangles;
    }

    private static collinear(p1: Coord, p2: Coord, p3: Coord): boolean {
        return (p1.y - p2.y) * (p1.x - p3.x) == (p1.y - p3.y) * (p1.x - p2.x);
    }

    private static getNextEar(points: Coord[], startIndex: number): number {
        var l = points.length;
        for (var j = 0, i = startIndex; j < l; j++ , i++) {
            i = Triangulator.getNextConvexVertex(points, i);
            var ia = i % l;
            var ib = (i + 1) % l;
            var ic = (i + 2) % l;
            if (!Triangulator.anyPointInTriangle(points, ia, ib, ic))
                return i;
        }
        throw new Error("Ear was not found.");
    }

    private static anyPointInTriangle(points: Coord[], ia: number, ib: number, ic: number): boolean {

        var a = points[ia];
        var b = points[ib];
        var c = points[ic];
        for (var i = 0; i < points.length; i++) {
            if (i != ia && i != ib && i != ic && Triangulator.isPointInTriangle(points[i], a, b, c))
                return true;
        }
        return false;
    }

    public static isPointInTriangle(pt: Coord, v1: Coord, v2: Coord, v3: Coord): boolean {
        var b1 = Triangulator.sign(pt, v1, v2) <= 0.0;
        var b2 = Triangulator.sign(pt, v2, v3) <= 0.0;
        var b3 = Triangulator.sign(pt, v3, v1) <= 0.0;
        return ((b1 == b2) && (b2 == b3));
    }

    private static sign(p1: Coord, p2: Coord, p3: Coord): number {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    private static getNextConvexVertex(points: Coord[], startIndex: number) {
        for (var j = 0, i = startIndex; j < points.length; j++ , i++) {
            var a = points[i % points.length];
            var b = points[(i + 1) % points.length];
            var c = points[(i + 2) % points.length];
            if (Triangulator.isConvexVertex(a, b, c))
                return i;
        }
        throw new Error("Convex vertex was not found.");
    }

    public static isConvexVertex(a: Coord, b: Coord, c: Coord): boolean {

        if (a.x == b.x) {
            var r = c.x - a.x;
            return a.y < b.y ? r >= 0 : r <= 0;
        }
        else {
            var qa = (a.y - b.y) / (a.x - b.x);
            var qb = b.y - qa * b.x;
            var r = c.y - qa * c.x - qb;
            return a.x < b.x ? r <= 0 : r >= 0;
        }
    }
} 