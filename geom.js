var Geom;
(function (Geom) {
    var Rectangle = (function () {
        function Rectangle() {
        }
        Rectangle.isPointInside = function (x, y, rx, ry, rw, rh) {
            return x >= rx && x <= (rx + rw) && y >= ry && y <= (ry + rh);
        };
        Rectangle.isIntersected = function (rx1, ry1, rw1, rh1, rx2, ry2, rw2, rh2) {
            var intersectedByX = (rx2 >= rx1 && rx2 <= rx1 + rw1) || (rx1 >= rx2 && rx1 <= rx2 + rw2);
            var intersectedByY = (ry2 >= ry1 && ry2 <= ry1 + rh1) || (ry1 >= ry2 && ry1 <= ry2 + rh2);
            return intersectedByX && intersectedByY;
        };
        return Rectangle;
    })();
    Geom.Rectangle = Rectangle;
})(Geom || (Geom = {}));
