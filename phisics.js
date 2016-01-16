var Phisics = (function () {
    function Phisics() {
    }
    Phisics.prototype.applyTime = function (scene, ticks) {
        if (ticks === void 0) { ticks = 1; }
    };
    Phisics.prototype.detectCollision = function (scene, figure) {
        var collidedWith = [];
        for (var i = 0; i < scene.figures.length; i++) {
            var f = scene.figures[i];
            if (f != figure && f.position.z == figure.position.z) {
                if (f instanceof Circle && figure instanceof Circle) {
                    var c1 = f;
                    var c2 = figure;
                    if (this.areCirclesCollided(c1, c2))
                        collidedWith.push(f);
                }
            }
        }
        return collidedWith;
    };
    Phisics.prototype.areCirclesCollided = function (c1, c2) {
        var xd = c1.position.x - c2.position.x;
        var yd = c1.position.y - c2.position.y;
        var rs = c1.radius + c2.radius;
        return xd * xd + yd * yd <= rs * rs;
    };
    return Phisics;
})();
