var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bubble = (function (_super) {
    __extends(Bubble, _super);
    function Bubble() {
        _super.apply(this, arguments);
    }
    Bubble.prototype.canAbsorb = function (b) {
        var r1 = this.get_radius();
        var r2 = b.get_radius();
        return r1 * r1 > 2 * r2 * r2;
    };
    Bubble.prototype.canDamage = function (b) {
        var r1 = this.get_radius();
        var r2 = b.get_radius();
        return r1 * r1 > r2 * r2;
    };
    Bubble.prototype.absorb = function (b, amount) {
        var diff = Bubble.subtract(b, amount);
        var r = Math.sqrt((this.get_square() + diff) / Math.PI);
        this.set_radius(r);
    };
    Bubble.prototype.annihilate = function (b, amount) {
        var b1, b2;
        if (this.get_diameter() >= b.get_diameter()) {
            b1 = this;
            b2 = b;
        }
        else {
            b1 = b;
            b2 = this;
        }
        var diff = Bubble.subtract(b2, amount);
        var r = Math.sqrt((b1.get_square() - diff) / Math.PI);
        b1.set_radius(r);
    };
    Bubble.subtract = function (b, amount) {
        var r = b.get_radius() - amount;
        var s = b.get_square();
        b.set_radius(r);
        return s - b.get_square();
    };
    Bubble.prototype.isAnnihilated = function () {
        return this.get_radius() <= 0;
    };
    Bubble.canBeAbsorbedColor = new BABYLON.Color4(0, 0, 1, 1);
    Bubble.canDamageColor = new BABYLON.Color4(1, 0, 1, 1);
    Bubble.canAnnihilateColor = new BABYLON.Color4(1, 0, 0, 1);
    return Bubble;
})(Circle);
