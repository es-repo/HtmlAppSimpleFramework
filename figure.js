var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Figure = (function () {
    function Figure() {
        this.position = BABYLON.Vector3.zero();
        this.projectedPosition = BABYLON.Vector3.zero();
        this.rotation = BABYLON.Vector3.zero();
        this.velocity = BABYLON.Vector3.zero();
        this.color = new BABYLON.Color4(0, 0, 0, 0);
    }
    Figure.prototype.project = function (renderer, worldMatrix, transformMatrix, rotMatrix) {
        renderer.projectVector(this.position, transformMatrix, this.projectedPosition);
    };
    Figure.prototype.draw = function (renderer, light) {
    };
    return Figure;
})();
var Figure3d = (function (_super) {
    __extends(Figure3d, _super);
    function Figure3d() {
        _super.apply(this, arguments);
    }
    return Figure3d;
})(Figure);
var Figure2d = (function (_super) {
    __extends(Figure2d, _super);
    function Figure2d() {
        _super.apply(this, arguments);
    }
    return Figure2d;
})(Figure);
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        _super.apply(this, arguments);
        this.tempVector = BABYLON.Vector3.zero();
        this.tempVector2 = BABYLON.Vector3.zero();
        this.size = BABYLON.Vector3.zero();
        this.projectedSize = BABYLON.Vector3.zero();
    }
    Rectangle.prototype.project = function (renderer, worldMatrix, transformMatrix, rotMatrix) {
        _super.prototype.project.call(this, renderer, worldMatrix, transformMatrix, rotMatrix);
        this.position.copyTo(this.tempVector);
        this.tempVector.add(this.size);
        renderer.projectVector(this.tempVector, transformMatrix, this.tempVector2);
        this.projectedSize.x = (this.tempVector2.x - this.projectedPosition.x) * 2;
        this.projectedSize.y = (-this.tempVector2.y + this.projectedPosition.y) * 2;
    };
    return Rectangle;
})(Figure2d);
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        _super.apply(this, arguments);
        this.tempVector = BABYLON.Vector3.zero();
        this.tempVector2 = BABYLON.Vector3.zero();
    }
    Circle.prototype.get_square = function () { return this.radius * this.radius * Math.PI; };
    Circle.prototype.project = function (renderer, worldMatrix, transformMatrix, rotMatrix) {
        _super.prototype.project.call(this, renderer, worldMatrix, transformMatrix, rotMatrix);
        this.position.copyTo(this.tempVector);
        this.tempVector.x += this.radius;
        renderer.projectVector(this.tempVector, transformMatrix, this.tempVector2);
        this.projectedRadius = (this.tempVector2.x - this.projectedPosition.x) * 2;
    };
    Circle.prototype.draw = function (renderer, light) {
        renderer.renderer2d.drawFilledCircle(this.projectedPosition.x, this.projectedPosition.y, this.projectedPosition.z, this.projectedRadius, this.color);
    };
    return Circle;
})(Figure2d);
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(image) {
        _super.call(this);
        this.image = image;
    }
    Sprite.prototype.draw = function (renderer, light) {
        var scalex = this.projectedSize.x / this.image.width;
        var scaley = this.projectedSize.y / this.image.height;
        var x = this.projectedPosition.x - this.projectedSize.x / 2;
        var y = this.projectedPosition.y - this.projectedSize.y / 2;
        renderer.renderer2d.drawImage(this.image, x, y, this.projectedPosition.z, scalex, scaley);
    };
    return Sprite;
})(Rectangle);
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(image) {
        _super.call(this, image);
        this.fullSize = BABYLON.Vector3.zero();
        this.fullProjectedSize = BABYLON.Vector3.zero();
        this.countH = 1;
        this.countV = 1;
    }
    Tile.prototype.draw = function (renderer, light) {
        var scalex = this.projectedSize.x / this.image.width;
        var scaley = this.projectedSize.y / this.image.height;
        var x = this.projectedPosition.x - this.projectedSize.x / 2;
        var y = this.projectedPosition.y - this.projectedSize.y / 2;
        renderer.renderer2d.drawTiles(this.image, x, y, this.projectedPosition.z, this.countH, this.countV, scalex, scaley);
    };
    return Tile;
})(Sprite);
