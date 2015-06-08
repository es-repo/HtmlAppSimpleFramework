var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Figure = (function () {
    function Figure() {
        this.size = BABYLON.Vector3.Zero();
        this.projectedSize = BABYLON.Vector3.Zero();
        this.position = BABYLON.Vector3.Zero();
        this.projectedPosition = BABYLON.Vector3.Zero();
        this.rotation = new BABYLON.Vector3(0, 0, 0);
        this.color = new BABYLON.Color4(0, 0, 0, 0);
    }
    return Figure;
})();
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        _super.apply(this, arguments);
    }
    Circle.prototype.get_diameter = function () {
        return this.size.x;
    };
    Circle.prototype.set_diameter = function (d) {
        this.size.x = d;
    };
    Circle.prototype.get_projectedDiameter = function () {
        return this.projectedSize.x;
    };
    Circle.prototype.get_radius = function () {
        return this.get_diameter() / 2.0;
    };
    Circle.prototype.set_radius = function (r) {
        this.set_diameter(r * 2);
    };
    Circle.prototype.get_square = function () {
        return this.get_radius() * this.get_radius() * Math.PI;
    };
    Circle.prototype.get_projectedRadius = function () {
        return this.get_projectedDiameter() / 2.0;
    };
    return Circle;
})(Figure);
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(image) {
        _super.call(this);
        this.image = image;
        this.size = new BABYLON.Vector3(image.width, image.height, 0);
    }
    return Sprite;
})(Figure);
