///<reference path="~/tests/jasmine/jasmine.js"/>
///<reference path="../outliner.js"/>

describe('Outliner tests', function () {

    it('1', function () {
        var arr = [[0]];
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([]);
    });

    it('2', function () {
        var arr = [[1]];
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([[{ x: 0, y: 0 }]]);
    });

    it('3', function () {
        var arr =
            [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]];
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([]);
    });

    it('4', function () {
        var arr =
            [[0, 0, 0],
             [0, 1, 0],
             [0, 0, 0]];
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([[{ x: 1, y: 1 }]]);
    });

    it('5', function () {
        var arr =
            [[1, 0, 1],
             [0, 0, 0],
             [1, 0, 1]];
         
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 0, y: 0 }],
            [{ x: 2, y: 0 }],
            [{ x: 0, y: 2 }],
            [{ x: 2, y: 2 }]]);
    });

    it('6', function () {
        var arr =
            [[1, 1, 0],
             [1, 1, 0]];
          
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 } ]]);
    });

    it('7', function () {
        var arr =
            [[1, 1, 0],
             [1, 0, 0]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }]]);
    });

    it('8', function () {
        var arr =
            [[1, 0, 0],
             [1, 1, 0]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]]);
    });

    it('9', function () {
        var arr =
            [[0, 1, 0],
             [1, 1, 1],
             [0, 1, 0]];
         
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }]]);
    });

    it('10', function () {
        var arr =
            [[0, 0, 0, 0],
             [0, 1, 1, 0],
             [0, 1, 1, 0],
             [0, 0, 0, 0]];
         
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }]]);
    });

    it('11', function () {
        var arr =
            [[0, 0, 0, 0, 0],
             [0, 1, 1, 1, 0],
             [0, 1, 1, 1, 0],
             [0, 1, 1, 1, 1],
             [0, 1, 1, 1, 1],
             [0, 1, 1, 1, 1]];
         
        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }, { x: 1, y: 5 }, { x: 1, y: 4 }, { x: 1, y: 3 }, { x: 1, y: 2 }]]);
    });

    it('12', function () {
        var arr =
            [[0, 0, 0, 0, 0],
             [0, 1, 1, 1, 0],
             [0, 1, 1, 1, 0],
             [1, 1, 1, 1, 0],
             [1, 1, 1, 1, 0],
             [1, 1, 1, 1, 0]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 2, y: 5 }, { x: 1, y: 5 }, { x: 0, y: 5 }, { x: 0, y: 4 }, { x: 0, y: 3 }, { x: 1, y: 2 }]]);
    });

    it('12', function () {
        var arr =
            [[0, 0, 0, 0, 0],
             [0, 1, 1, 1, 0],
             [0, 1, 1, 1, 0],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }, { x: 1, y: 5 }, { x: 0, y: 5 }, { x: 0, y: 4 }, { x: 0, y: 3 }, {x:1, y:2}]]);
    });

    it('12', function () {
        var arr =
            [[1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [0, 1, 1, 1, 0],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 },
             { x: 3, y: 6 }, { x: 2, y: 6 }, { x: 1, y: 6 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 0, y: 4 }, { x: 1, y: 3 }, { x: 0, y: 2 }, { x: 0, y: 1 }]]);
    });

    it('13', function () {
        var arr =
            [[0, 1, 0, 1, 0],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [0, 1, 1, 1, 0],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [0, 1, 0, 1, 0]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 3, y: 6 }, { x: 2, y: 5 }, { x: 1, y: 6 },
             { x: 0, y: 5 }, { x: 0, y: 4 }, { x: 1, y: 3 }, { x: 0, y: 2 }, { x: 0, y: 1 }]]);
    });

    it('13', function () {
        var arr =
            [[0, 1, 0, 1, 0],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [0, 1, 1, 1, 0],
             [1, 1, 1, 1, 1],
             [1, 1, 1, 1, 1],
             [0, 1, 0, 1, 0]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 3, y: 6 }, { x: 2, y: 5 }, { x: 1, y: 6 },
             { x: 0, y: 5 }, { x: 0, y: 4 }, { x: 1, y: 3 }, { x: 0, y: 2 }, { x: 0, y: 1 }]]);
    });

    it('14', function () {
        var arr =
            [[0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
             [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
             [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
             [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
             [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
             [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
             [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
             [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
             [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]];

        var res = Outliner.findOutlinesBW(arr);
        expect(res).toEqual([
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 3, y: 7 }, { x: 4, y: 8 },
             { x: 3, y: 9 }, { x: 2, y: 9 }, { x: 1, y: 9 }, { x: 0, y: 8 }, { x: 0, y: 7 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 1, y: 4 }, { x: 2, y: 3 }, { x: 1, y: 2 }, { x: 0, y: 1 }],

            [{ x: 7, y: 0 }, { x: 8, y: 1 }, { x: 8, y: 2 }, { x: 9, y: 3 }, { x: 10, y: 2 }, { x: 10, y: 1 }, { x: 11, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 13, y: 3 }, { x: 14, y: 4 },
             { x: 14, y: 5 }, { x: 14, y: 6 }, { x: 14, y: 7 }, { x: 14, y: 8 }, { x: 13, y: 9 }, { x: 12, y: 8 }, { x: 12, y: 7 }, { x: 11, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 }, { x: 9, y: 9 },
             { x: 8, y: 8 }, { x: 8, y: 7 }, { x: 8, y: 6 }, { x: 8, y: 5 }, { x: 7, y: 4 }, { x: 6, y: 3 }, { x: 6, y: 2 }, { x: 6, y: 1 } ]]);
    });

});