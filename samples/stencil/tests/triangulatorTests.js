///<reference path="~/tests/jasmine/jasmine.js"/>
///<reference path="../triangulator.js"/>

describe('Triangulator.triangulate2', function () {

    it('1', function () {
        var p = [{ x: 0, y: 0 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([]);
    });

    it('2', function () {
        var p = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([]);
    });

    it('3', function () {
        var p = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([{ a: { x: 0, y: 0 }, b: { x: 0, y: 1 }, c: { x: 1, y: 1 } }]);
    });

    it('4', function () {
        var p = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([
            { a: { x: 0, y: 0 }, b: { x: 0, y: 1 }, c: { x: 1, y: 1 } },
            { a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, c: { x: 1, y: 0 } }]);
    });

    it('5', function () {
        var p = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 2, y: 1 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([
            { a: { x: 1, y: 1 }, b: { x: 0, y: 2 }, c: { x: 2, y: 1 } },
            { a: { x: 1, y: 1 }, b: { x: 2, y: 1 }, c: { x: 0, y: 0 } }]);
    });

    it('6', function () {
        var p = [{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 }, { x: 1, y: 1 }];

        var res = Triangulator.triangulate(p);
        expect(res).toEqual([
            { a: { x: 1, y: 2 }, b: { x: 2, y: 0 }, c: { x: 1, y: 1 } },
            { a: { x: 1, y: 2 }, b: { x: 1, y: 1 }, c: { x: 0, y: 0 } }]);
    });

    it('7', function () {
        var p = [{ x: 0, y: 4 }, { x: 6, y: 4 }, { x: 2, y: 2 }, { x: 6, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 3 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([
            { a: { x: 2, y: 2 }, b: { x: 6, y: 0 }, c: { x: 0, y: 0 } },
            { a: { x: 2, y: 2 }, b: { x: 0, y: 0 }, c: { x: 2, y: 3 } },
            { a: { x: 2, y: 3 }, b: { x: 0, y: 4 }, c: { x: 6, y: 4 } },
            { a: { x: 2, y: 3 }, b: { x: 6, y: 4 }, c: { x: 2, y: 2 } }]);
    });

    it('8', function () {
        var p = [{ x: 0, y: 0 }, { x: 3, y: 2 }, { x: 0, y: 1 }, { x: 4, y: 4 }, { x: 3, y: 0 }, { x: 3, y: 1 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([
            { a: { x: 3, y: 2 }, b: { x: 0, y: 1 }, c: { x: 4, y: 4 } },
            { a: { x: 4, y: 4 }, b: { x: 3, y: 0 }, c: { x: 3, y: 1 } },
            { a: { x: 3, y: 1 }, b: { x: 0, y: 0 }, c: { x: 3, y: 2 } },
            { a: { x: 3, y: 1 }, b: { x: 3, y: 2 }, c: { x: 4, y: 4 } }]);
    });

    it('9', function () {
        var p = [{ x: 3, y: 3 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 2, y: 1 }];
        var res = Triangulator.triangulate(p);
        expect(res).toEqual([{ a: { x: 1, y: -1 }, b: { x: 0, y: 0 }, c: { x: 2, y: 1 } }]);
    });

    it('10', function () {
        var p = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 3 }, { x: 2, y: 3 },
            { x: 1, y: 3 }, { x: 0, y: 4 }, { x: 1, y: 5 }, { x: 4, y: 4 },
            { x: 5, y: 2 }, { x: 4, y: 0 }, { x: 2, y: -1 }, { x: 1, y: -1 }];

        var res = Triangulator.triangulate(p);

        expect(res).toEqual([
            { a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, c: { x: 2, y: 1 } },
            { a: { x: 3, y: 3 }, b: { x: 1, y: 3 }, c: { x: 0, y: 4 } },
            { a: { x: 3, y: 3 }, b: { x: 0, y: 4 }, c: { x: 1, y: 5 } },
            { a: { x: 3, y: 3 }, b: { x: 1, y: 5 }, c: { x: 4, y: 4 } },
            { a: { x: 3, y: 3 }, b: { x: 4, y: 4 }, c: { x: 5, y: 2 } },
            { a: { x: 3, y: 3 }, b: { x: 5, y: 2 }, c: { x: 4, y: 0 } },
            { a: { x: 3, y: 3 }, b: { x: 4, y: 0 }, c: { x: 2, y: -1 } },
            { a: { x: 2, y: -1 }, b: { x: 1, y: -1 }, c: { x: 0, y: 0 } },
            { a: { x: 2, y: -1 }, b: { x: 0, y: 0 }, c: { x: 2, y: 1 } },
            { a: { x: 2, y: -1 }, b: { x: 2, y: 1 }, c: { x: 3, y: 3 } }]);
    });

    it('11', function () {
        var p = [
            { x: 4, y: 8 }, { x: 6, y: 6 }, { x: 5, y: 3 }, { x: 7, y: 2 },
            { x: 6, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 6 }, { x: 4, y: 7 },
            { x: 2, y: 1 }, { x: 4, y: 0 }, { x: 3, y: -1 }, { x: 0, y: 0 },
            { x: 2, y: 5 }, { x: 2, y: 7 }];
        
        var res = Triangulator.triangulate(p);

        expect(res).toEqual([
            { a: { x: 5, y: 3 }, b: { x: 7, y: 2 }, c: { x: 6, y: 1 } },
            { a: { x: 5, y: 3 }, b: { x: 6, y: 1 }, c: { x: 4, y: 2 } },
            { a: { x: 5, y: 3 }, b: { x: 4, y: 2 }, c: { x: 5, y: 6 } },
            { a: { x: 2, y: 1 }, b: { x: 4, y: 0 }, c: { x: 3, y: -1 } },
            { a: { x: 2, y: 1 }, b: { x: 3, y: -1 }, c: { x: 0, y: 0 } },
            { a: { x: 2, y: 1 }, b: { x: 0, y: 0 }, c: { x: 2, y: 5 } },
            { a: { x: 2, y: 1 }, b: { x: 2, y: 7 }, c: { x: 4, y: 8 } },
            { a: { x: 6, y: 6 }, b: { x: 5, y: 3 }, c: { x: 5, y: 6 } },
            { a: { x: 6, y: 6 }, b: { x: 5, y: 6 }, c: { x: 4, y: 7 } },
            { a: { x: 4, y: 7 }, b: { x: 2, y: 1 }, c: { x: 4, y: 8 } },
            { a: { x: 4, y: 7 }, b: { x: 4, y: 8 }, c: { x: 6, y: 6 } }]);
    });

    //it('12', function () {
    //    var p = [
    //        { x: 245, y: 259 }, { x: 240, y: 283 }, { x: 241, y: 311 },
    //        { x: 270, y: 313 }, { x: 248, y: 305 }, { x: 246, y: 277 },
    //        { x: 263, y: 265 }, { x: 257, y: 294 }, { x: 281, y: 309 },
    //        { x: 282, y: 294 }, { x: 271, y: 278 }, { x: 256, y: 254 }];
    //    debugger
    //    var res = Triangulator.triangulate(p);

    //    expect(res).toEqual([
    //        { a: { x: 0, y: 0 }, b: { x: 1, y: 1 }, c: { x: 2, y: 1 } },
    //        { a: { x: 3, y: 3 }, b: { x: 1, y: 3 }, c: { x: 0, y: 4 } },
    //        { a: { x: 3, y: 3 }, b: { x: 0, y: 4 }, c: { x: 1, y: 5 } },
    //        { a: { x: 3, y: 3 }, b: { x: 1, y: 5 }, c: { x: 4, y: 4 } },
    //        { a: { x: 3, y: 3 }, b: { x: 4, y: 4 }, c: { x: 5, y: 2 } },
    //        { a: { x: 3, y: 3 }, b: { x: 5, y: 2 }, c: { x: 4, y: 0 } },
    //        { a: { x: 3, y: 3 }, b: { x: 4, y: 0 }, c: { x: 2, y: -1 } },
    //        { a: { x: 2, y: -1 }, b: { x: 1, y: -1 }, c: { x: 0, y: 0 } },
    //        { a: { x: 2, y: -1 }, b: { x: 0, y: 0 }, c: { x: 2, y: 1 } },
    //        { a: { x: 2, y: -1 }, b: { x: 2, y: 1 }, c: { x: 3, y: 3 } }]);
    //});

});

describe('Triangulator.isConvexVertex', function () {

    it('1', function () {
        var res = Triangulator.isConvexVertex({ x: 3, y: 2 }, { x: 2, y: 3 }, { x: 1, y: 5 });
        expect(res).toBeTruthy();
    });

    it('2', function () {
        var res = Triangulator.isConvexVertex({ x: 3, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 });
        expect(res).toBeTruthy();
    });

    it('3', function () {
        var res = Triangulator.isConvexVertex({ x: 2, y: 3 }, { x: 3, y: 5 }, { x: 5, y: 6 });
        expect(res).toBeTruthy();
    });

    it('4', function () {
        var res = Triangulator.isConvexVertex({ x: 3, y: 5 }, { x: 5, y: 6 }, { x: 6, y: 5 });
        expect(res).toBeTruthy();
    });

    it('5', function () {
        var res = Triangulator.isConvexVertex({ x: 5, y: 6 }, { x: 6, y: 5 }, { x: 8, y: 4 });
        expect(res).toBeFalsy();
    });

    it('6', function () {
        var res = Triangulator.isConvexVertex({ x: 6, y: 5 }, { x: 8, y: 4 }, { x: 7, y: 3 });
        expect(res).toBeTruthy();
    });

    it('7', function () {
        var res = Triangulator.isConvexVertex({ x: 8, y: 4 }, { x: 7, y: 3 }, { x: 5, y: 2 });
        expect(res).toBeTruthy();
    });

    it('8', function () {
        var res = Triangulator.isConvexVertex({ x: 7, y: 3 }, { x: 5, y: 2 }, { x: 4, y: 3 });
        expect(res).toBeTruthy();
    });

    it('9', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 2 });
        expect(res).toBeFalsy();
    });

    it('10', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 });
        expect(res).toBeTruthy();
    });

    it('11', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 });
        expect(res).toBeTruthy();
    });

    it('12', function () {
        var res = Triangulator.isConvexVertex({ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 });
        expect(res).toBeTruthy();
    });

    it('13', function () {
        var res = Triangulator.isConvexVertex({ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 });
        expect(res).toBeTruthy();
    });

    it('14', function () {
        var res = Triangulator.isConvexVertex({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 });
        expect(res).toBeFalsy();
    });

    it('15', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 });
        expect(res).toBeFalsy();
    });

    it('16', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 });
        expect(res).toBeFalsy();
    });

    it('17', function () {
        var res = Triangulator.isConvexVertex({ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 });
        expect(res).toBeFalsy();
    });

    it('line.1', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 });
        expect(res).toBeTruthy();
    });

    it('line.2', function () {
        var res = Triangulator.isConvexVertex({ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 });
        expect(res).toBeTruthy();
    });

    it('line.3', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 });
        expect(res).toBeTruthy();
    });

    it('line.4', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 });
        expect(res).toBeTruthy();
    });

    it('line.5', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 });
        expect(res).toBeTruthy();
    });

    it('line.6', function () {
        var res = Triangulator.isConvexVertex({ x: 2, y: 2 }, { x: 1, y: 1 }, { x: 0, y: 0 });
        expect(res).toBeTruthy();
    });

    it('line.7', function () {
        var res = Triangulator.isConvexVertex({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
        expect(res).toBeTruthy();
    });

    it('line.8', function () {
        var res = Triangulator.isConvexVertex({ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 });
        expect(res).toBeTruthy();
    });
});

describe('Triangulator.isPointInTriangle', function () {

    it('1', function () {
        var res = Triangulator.isPointInTriangle({ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 });
        expect(res).toBeTruthy();
    });

    it('2', function () {
        var res = Triangulator.isPointInTriangle({ x: 0.5, y: 0.5 }, { x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 });
        expect(res).toBeTruthy();
    });

    it('3', function () {
        var res = Triangulator.isPointInTriangle({ x: 0, y: 3 }, { x: 0, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 0 });
        expect(res).toBeFalsy();
    });
});