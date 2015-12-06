var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Figure = (function () {
    function Figure() {
        this.boundingBox = new Array(2);
        this.projectedBoundingBox = new Array(2);
        this.size = BABYLON.Vector3.Zero();
        this.projectedSize = BABYLON.Vector3.Zero();
        this.position = BABYLON.Vector3.Zero();
        this.projectedPosition = BABYLON.Vector3.Zero();
        this.rotation = BABYLON.Vector3.Zero();
        this.velocity = BABYLON.Vector3.Zero();
        this.color = new BABYLON.Color4(0, 0, 0, 0);
        this.boundingBox[0] = BABYLON.Vector3.Zero();
        this.boundingBox[1] = BABYLON.Vector3.Zero();
        this.projectedBoundingBox[0] = BABYLON.Vector3.Zero();
        this.projectedBoundingBox[1] = BABYLON.Vector3.Zero();
    }
    Figure.prototype.set_size = function (v) { };
    Figure.prototype.get_boundingBox = function () {
        this.boundingBox[0].x = this.position.x - this.size.x / 2;
        this.boundingBox[0].y = this.position.y - this.size.y / 2;
        this.boundingBox[1].x = this.position.x + this.size.x / 2;
        this.boundingBox[1].y = this.position.y + this.size.y / 2;
        return this.boundingBox;
    };
    Figure.prototype.get_projectedBoundingBox = function () {
        this.projectedBoundingBox[0].x = this.projectedPosition.x - this.projectedSize.x / 2;
        this.projectedBoundingBox[0].y = this.projectedPosition.y - this.projectedSize.y / 2;
        this.projectedBoundingBox[1].x = this.projectedPosition.x + this.projectedSize.x / 2;
        this.projectedBoundingBox[1].y = this.projectedPosition.y + this.projectedSize.y / 2;
        return this.projectedBoundingBox;
    };
    return Figure;
})();
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        _super.apply(this, arguments);
    }
    Circle.prototype.get_diameter = function () { return this.size.x; };
    Circle.prototype.set_diameter = function (d) { this.size.x = d; };
    Circle.prototype.get_projectedDiameter = function () { return this.projectedSize.x; };
    Circle.prototype.get_radius = function () { return this.get_diameter() / 2.0; };
    Circle.prototype.set_radius = function (r) { this.set_diameter(r * 2); };
    Circle.prototype.get_square = function () { return this.get_radius() * this.get_radius() * Math.PI; };
    Circle.prototype.get_projectedRadius = function () { return this.get_projectedDiameter() / 2.0; };
    return Circle;
})(Figure);
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(image) {
        _super.call(this);
        this.image = image;
    }
    return Sprite;
})(Figure);
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(image) {
        _super.call(this, image);
        this.fullSize = BABYLON.Vector3.Zero();
        this.fullProjectedSize = BABYLON.Vector3.Zero();
        this.countH = 1;
        this.countV = 1;
    }
    Tile.prototype.get_boundingBox = function () {
        _super.prototype.get_boundingBox.call(this);
        this.boundingBox[1].x += (this.size.x * (this.countH - 1));
        this.boundingBox[1].y += (this.size.y * (this.countV - 1));
        return this.boundingBox;
    };
    Tile.prototype.get_projectedBoundingBox = function () {
        _super.prototype.get_projectedBoundingBox.call(this);
        this.projectedBoundingBox[1].x += (this.projectedSize.x * (this.countH - 1));
        this.projectedBoundingBox[1].y += (this.projectedSize.y * (this.countV - 1));
        return this.projectedBoundingBox;
    };
    Tile.prototype.get_fullSize = function () {
        this.fullSize.x = this.size.x * this.countH;
        this.fullSize.y = this.size.y * this.countV;
        return this.fullSize;
    };
    Tile.prototype.get_fullProjectedSize = function () {
        this.fullProjectedSize.x = this.projectedSize.x * this.countH;
        this.fullProjectedSize.y = this.projectedSize.y * this.countV;
        return this.fullProjectedSize;
    };
    return Tile;
})(Sprite);
