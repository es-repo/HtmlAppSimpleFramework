var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var Color4 = (function () {
        function Color4(initialR, initialG, initialB, initialA) {
            this.r = initialR;
            this.g = initialG;
            this.b = initialB;
            this.a = initialA;
        }
        Color4.prototype.toString = function () {
            return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
        };
        Color4.white = new Color4(1, 1, 1, 1);
        Color4.black = new Color4(0, 0, 0, 1);
        return Color4;
    })();
    BABYLON.Color4 = Color4;
    var Vector2 = (function () {
        function Vector2(initialX, initialY) {
            this.x = initialX;
            this.y = initialY;
        }
        Vector2.prototype.toString = function () {
            return "{X: " + this.x + " Y:" + this.y + "}";
        };
        Vector2.prototype.add = function (otherVector) {
            return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
        };
        Vector2.prototype.subtract = function (otherVector) {
            return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
        };
        Vector2.prototype.negate = function () {
            return new Vector2(-this.x, -this.y);
        };
        Vector2.prototype.scale = function (scale) {
            return new Vector2(this.x * scale, this.y * scale);
        };
        Vector2.prototype.equals = function (otherVector) {
            return this.x === otherVector.x && this.y === otherVector.y;
        };
        Vector2.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.lengthSquared = function () {
            return (this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.normalize = function () {
            var len = this.length();
            if (len === 0) {
                return;
            }
            var num = 1.0 / len;
            this.x *= num;
            this.y *= num;
        };
        Vector2.Zero = function () {
            return new Vector2(0, 0);
        };
        Vector2.Copy = function (source) {
            return new Vector2(source.x, source.y);
        };
        Vector2.Normalize = function (vector) {
            var newVector = Vector2.Copy(vector);
            newVector.normalize();
            return newVector;
        };
        Vector2.Minimize = function (left, right) {
            var x = (left.x < right.x) ? left.x : right.x;
            var y = (left.y < right.y) ? left.y : right.y;
            return new Vector2(x, y);
        };
        Vector2.Maximize = function (left, right) {
            var x = (left.x > right.x) ? left.x : right.x;
            var y = (left.y > right.y) ? left.y : right.y;
            return new Vector2(x, y);
        };
        Vector2.Transform = function (vector, transformation) {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]);
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]);
            return new Vector2(x, y);
        };
        Vector2.Distance = function (value1, value2) {
            return Math.sqrt(Vector2.DistanceSquared(value1, value2));
        };
        Vector2.DistanceSquared = function (value1, value2) {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;
            return (x * x) + (y * y);
        };
        return Vector2;
    })();
    BABYLON.Vector2 = Vector2;
    var Vector3 = (function () {
        function Vector3(initialX, initialY, initialZ) {
            this.x = initialX;
            this.y = initialY;
            this.z = initialZ;
        }
        Vector3.prototype.toString = function () {
            return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + "}";
        };
        Vector3.prototype.add = function (otherVector) {
            return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
        };
        Vector3.prototype.subtract = function (otherVector) {
            return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
        };
        Vector3.prototype.negate = function () {
            return new Vector3(-this.x, -this.y, -this.z);
        };
        Vector3.prototype.scale = function (scale) {
            return new Vector3(this.x * scale, this.y * scale, this.z * scale);
        };
        Vector3.prototype.equals = function (otherVector) {
            return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
        };
        Vector3.prototype.multiply = function (otherVector) {
            return new Vector3(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z);
        };
        Vector3.prototype.divide = function (otherVector) {
            return new Vector3(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z);
        };
        Vector3.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        };
        Vector3.prototype.lengthSquared = function () {
            return (this.x * this.x + this.y * this.y + this.z * this.z);
        };
        Vector3.prototype.normalize = function () {
            var len = this.length();
            if (len === 0) {
                return;
            }
            var num = 1.0 / len;
            this.x *= num;
            this.y *= num;
            this.z *= num;
        };
        Vector3.FromArray = function (array, offset) {
            if (!offset) {
                offset = 0;
            }
            return new Vector3(array[offset], array[offset + 1], array[offset + 2]);
        };
        Vector3.Zero = function () {
            return new Vector3(0, 0, 0);
        };
        Vector3.Up = function () {
            return new Vector3(0, 1.0, 0);
        };
        Vector3.Copy = function (source) {
            return new Vector3(source.x, source.y, source.z);
        };
        Vector3.TransformCoordinates = function (vector, transformation, resultVector) {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12];
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13];
            var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14];
            var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15];
            resultVector.x = x / w;
            resultVector.y = y / w;
            resultVector.z = z / w;
        };
        Vector3.TransformNormal = function (vector, transformation) {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]);
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]);
            var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]);
            return new Vector3(x, y, z);
        };
        Vector3.Dot = function (left, right) {
            return (left.x * right.x + left.y * right.y + left.z * right.z);
        };
        Vector3.Cross = function (left, right) {
            var x = left.y * right.z - left.z * right.y;
            var y = left.z * right.x - left.x * right.z;
            var z = left.x * right.y - left.y * right.x;
            return new Vector3(x, y, z);
        };
        Vector3.Normalize = function (vector) {
            var newVector = Vector3.Copy(vector);
            newVector.normalize();
            return newVector;
        };
        Vector3.Distance = function (value1, value2) {
            return Math.sqrt(Vector3.DistanceSquared(value1, value2));
        };
        Vector3.DistanceSquared = function (value1, value2) {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;
            var z = value1.z - value2.z;
            return (x * x) + (y * y) + (z * z);
        };
        return Vector3;
    })();
    BABYLON.Vector3 = Vector3;
    var Matrix = (function () {
        function Matrix() {
            this.m = [];
        }
        Matrix.prototype.isIdentity = function () {
            if (this.m[0] != 1.0 || this.m[5] != 1.0 || this.m[10] != 1.0 || this.m[15] != 1.0) {
                return false;
            }
            if (this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0 || this.m[4] != 0.0 || this.m[6] != 0.0 || this.m[7] != 0.0 || this.m[8] != 0.0 || this.m[9] != 0.0 || this.m[11] != 0.0 || this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0) {
                return false;
            }
            return true;
        };
        Matrix.prototype.determinant = function () {
            var temp1 = (this.m[10] * this.m[15]) - (this.m[11] * this.m[14]);
            var temp2 = (this.m[9] * this.m[15]) - (this.m[11] * this.m[13]);
            var temp3 = (this.m[9] * this.m[14]) - (this.m[10] * this.m[13]);
            var temp4 = (this.m[8] * this.m[15]) - (this.m[11] * this.m[12]);
            var temp5 = (this.m[8] * this.m[14]) - (this.m[10] * this.m[12]);
            var temp6 = (this.m[8] * this.m[13]) - (this.m[9] * this.m[12]);
            return ((((this.m[0] * (((this.m[5] * temp1) - (this.m[6] * temp2)) + (this.m[7] * temp3))) - (this.m[1] * (((this.m[4] * temp1) - (this.m[6] * temp4)) + (this.m[7] * temp5)))) + (this.m[2] * (((this.m[4] * temp2) - (this.m[5] * temp4)) + (this.m[7] * temp6)))) - (this.m[3] * (((this.m[4] * temp3) - (this.m[5] * temp5)) + (this.m[6] * temp6))));
        };
        Matrix.prototype.toArray = function () {
            return this.m;
        };
        Matrix.prototype.invert = function () {
            var l1 = this.m[0];
            var l2 = this.m[1];
            var l3 = this.m[2];
            var l4 = this.m[3];
            var l5 = this.m[4];
            var l6 = this.m[5];
            var l7 = this.m[6];
            var l8 = this.m[7];
            var l9 = this.m[8];
            var l10 = this.m[9];
            var l11 = this.m[10];
            var l12 = this.m[11];
            var l13 = this.m[12];
            var l14 = this.m[13];
            var l15 = this.m[14];
            var l16 = this.m[15];
            var l17 = (l11 * l16) - (l12 * l15);
            var l18 = (l10 * l16) - (l12 * l14);
            var l19 = (l10 * l15) - (l11 * l14);
            var l20 = (l9 * l16) - (l12 * l13);
            var l21 = (l9 * l15) - (l11 * l13);
            var l22 = (l9 * l14) - (l10 * l13);
            var l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19);
            var l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21));
            var l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22);
            var l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22));
            var l27 = 1.0 / ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26));
            var l28 = (l7 * l16) - (l8 * l15);
            var l29 = (l6 * l16) - (l8 * l14);
            var l30 = (l6 * l15) - (l7 * l14);
            var l31 = (l5 * l16) - (l8 * l13);
            var l32 = (l5 * l15) - (l7 * l13);
            var l33 = (l5 * l14) - (l6 * l13);
            var l34 = (l7 * l12) - (l8 * l11);
            var l35 = (l6 * l12) - (l8 * l10);
            var l36 = (l6 * l11) - (l7 * l10);
            var l37 = (l5 * l12) - (l8 * l9);
            var l38 = (l5 * l11) - (l7 * l9);
            var l39 = (l5 * l10) - (l6 * l9);
            this.m[0] = l23 * l27;
            this.m[4] = l24 * l27;
            this.m[8] = l25 * l27;
            this.m[12] = l26 * l27;
            this.m[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27;
            this.m[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27;
            this.m[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27;
            this.m[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27;
            this.m[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27;
            this.m[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27;
            this.m[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27;
            this.m[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27;
            this.m[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27;
            this.m[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27;
            this.m[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27;
            this.m[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27;
        };
        Matrix.prototype.multiply = function (other) {
            var result = new Matrix();
            result.m[0] = this.m[0] * other.m[0] + this.m[1] * other.m[4] + this.m[2] * other.m[8] + this.m[3] * other.m[12];
            result.m[1] = this.m[0] * other.m[1] + this.m[1] * other.m[5] + this.m[2] * other.m[9] + this.m[3] * other.m[13];
            result.m[2] = this.m[0] * other.m[2] + this.m[1] * other.m[6] + this.m[2] * other.m[10] + this.m[3] * other.m[14];
            result.m[3] = this.m[0] * other.m[3] + this.m[1] * other.m[7] + this.m[2] * other.m[11] + this.m[3] * other.m[15];
            result.m[4] = this.m[4] * other.m[0] + this.m[5] * other.m[4] + this.m[6] * other.m[8] + this.m[7] * other.m[12];
            result.m[5] = this.m[4] * other.m[1] + this.m[5] * other.m[5] + this.m[6] * other.m[9] + this.m[7] * other.m[13];
            result.m[6] = this.m[4] * other.m[2] + this.m[5] * other.m[6] + this.m[6] * other.m[10] + this.m[7] * other.m[14];
            result.m[7] = this.m[4] * other.m[3] + this.m[5] * other.m[7] + this.m[6] * other.m[11] + this.m[7] * other.m[15];
            result.m[8] = this.m[8] * other.m[0] + this.m[9] * other.m[4] + this.m[10] * other.m[8] + this.m[11] * other.m[12];
            result.m[9] = this.m[8] * other.m[1] + this.m[9] * other.m[5] + this.m[10] * other.m[9] + this.m[11] * other.m[13];
            result.m[10] = this.m[8] * other.m[2] + this.m[9] * other.m[6] + this.m[10] * other.m[10] + this.m[11] * other.m[14];
            result.m[11] = this.m[8] * other.m[3] + this.m[9] * other.m[7] + this.m[10] * other.m[11] + this.m[11] * other.m[15];
            result.m[12] = this.m[12] * other.m[0] + this.m[13] * other.m[4] + this.m[14] * other.m[8] + this.m[15] * other.m[12];
            result.m[13] = this.m[12] * other.m[1] + this.m[13] * other.m[5] + this.m[14] * other.m[9] + this.m[15] * other.m[13];
            result.m[14] = this.m[12] * other.m[2] + this.m[13] * other.m[6] + this.m[14] * other.m[10] + this.m[15] * other.m[14];
            result.m[15] = this.m[12] * other.m[3] + this.m[13] * other.m[7] + this.m[14] * other.m[11] + this.m[15] * other.m[15];
            return result;
        };
        Matrix.prototype.equals = function (value) {
            return (this.m[0] === value.m[0] && this.m[1] === value.m[1] && this.m[2] === value.m[2] && this.m[3] === value.m[3] && this.m[4] === value.m[4] && this.m[5] === value.m[5] && this.m[6] === value.m[6] && this.m[7] === value.m[7] && this.m[8] === value.m[8] && this.m[9] === value.m[9] && this.m[10] === value.m[10] && this.m[11] === value.m[11] && this.m[12] === value.m[12] && this.m[13] === value.m[13] && this.m[14] === value.m[14] && this.m[15] === value.m[15]);
        };
        Matrix.FromValues = function (initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
            var result = new Matrix();
            result.m[0] = initialM11;
            result.m[1] = initialM12;
            result.m[2] = initialM13;
            result.m[3] = initialM14;
            result.m[4] = initialM21;
            result.m[5] = initialM22;
            result.m[6] = initialM23;
            result.m[7] = initialM24;
            result.m[8] = initialM31;
            result.m[9] = initialM32;
            result.m[10] = initialM33;
            result.m[11] = initialM34;
            result.m[12] = initialM41;
            result.m[13] = initialM42;
            result.m[14] = initialM43;
            result.m[15] = initialM44;
            return result;
        };
        Matrix.Identity = function () {
            return Matrix.FromValues(1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0);
        };
        Matrix.Zero = function () {
            return Matrix.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        };
        Matrix.Copy = function (source) {
            return Matrix.FromValues(source.m[0], source.m[1], source.m[2], source.m[3], source.m[4], source.m[5], source.m[6], source.m[7], source.m[8], source.m[9], source.m[10], source.m[11], source.m[12], source.m[13], source.m[14], source.m[15]);
        };
        Matrix.RotationX = function (angle) {
            var result = Matrix.Zero();
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            result.m[0] = 1.0;
            result.m[15] = 1.0;
            result.m[5] = c;
            result.m[10] = c;
            result.m[9] = -s;
            result.m[6] = s;
            return result;
        };
        Matrix.RotationY = function (angle) {
            var result = Matrix.Zero();
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            result.m[5] = 1.0;
            result.m[15] = 1.0;
            result.m[0] = c;
            result.m[2] = -s;
            result.m[8] = s;
            result.m[10] = c;
            return result;
        };
        Matrix.RotationZ = function (angle) {
            var result = Matrix.Zero();
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            result.m[10] = 1.0;
            result.m[15] = 1.0;
            result.m[0] = c;
            result.m[1] = s;
            result.m[4] = -s;
            result.m[5] = c;
            return result;
        };
        Matrix.RotationAxis = function (axis, angle) {
            var s = Math.sin(-angle);
            var c = Math.cos(-angle);
            var c1 = 1 - c;
            axis.normalize();
            var result = Matrix.Zero();
            result.m[0] = (axis.x * axis.x) * c1 + c;
            result.m[1] = (axis.x * axis.y) * c1 - (axis.z * s);
            result.m[2] = (axis.x * axis.z) * c1 + (axis.y * s);
            result.m[3] = 0.0;
            result.m[4] = (axis.y * axis.x) * c1 + (axis.z * s);
            result.m[5] = (axis.y * axis.y) * c1 + c;
            result.m[6] = (axis.y * axis.z) * c1 - (axis.x * s);
            result.m[7] = 0.0;
            result.m[8] = (axis.z * axis.x) * c1 - (axis.y * s);
            result.m[9] = (axis.z * axis.y) * c1 + (axis.x * s);
            result.m[10] = (axis.z * axis.z) * c1 + c;
            result.m[11] = 0.0;
            result.m[15] = 1.0;
            return result;
        };
        Matrix.RotationYawPitchRoll = function (yaw, pitch, roll) {
            return Matrix.RotationZ(roll).multiply(Matrix.RotationX(pitch)).multiply(Matrix.RotationY(yaw));
        };
        Matrix.Scaling = function (x, y, z) {
            var result = Matrix.Zero();
            result.m[0] = x;
            result.m[5] = y;
            result.m[10] = z;
            result.m[15] = 1.0;
            return result;
        };
        Matrix.Translation = function (x, y, z) {
            var result = Matrix.Identity();
            result.m[12] = x;
            result.m[13] = y;
            result.m[14] = z;
            return result;
        };
        Matrix.LookAtLH = function (eye, target, up) {
            var zAxis = target.subtract(eye);
            zAxis.normalize();
            var xAxis = Vector3.Cross(up, zAxis);
            xAxis.normalize();
            var yAxis = Vector3.Cross(zAxis, xAxis);
            yAxis.normalize();
            var ex = -Vector3.Dot(xAxis, eye);
            var ey = -Vector3.Dot(yAxis, eye);
            var ez = -Vector3.Dot(zAxis, eye);
            return Matrix.FromValues(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, ex, ey, ez, 1);
        };
        Matrix.PerspectiveLH = function (width, height, znear, zfar) {
            var matrix = Matrix.Zero();
            matrix.m[0] = (2.0 * znear) / width;
            matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0;
            matrix.m[5] = (2.0 * znear) / height;
            matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0;
            matrix.m[10] = -zfar / (znear - zfar);
            matrix.m[8] = matrix.m[9] = 0.0;
            matrix.m[11] = 1.0;
            matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0;
            matrix.m[14] = (znear * zfar) / (znear - zfar);
            return matrix;
        };
        Matrix.PerspectiveFovLH = function (fov, aspect, znear, zfar) {
            var matrix = Matrix.Zero();
            var tan = 1.0 / (Math.tan(fov * 0.5));
            matrix.m[0] = tan / aspect;
            matrix.m[1] = matrix.m[2] = matrix.m[3] = 0.0;
            matrix.m[5] = tan;
            matrix.m[4] = matrix.m[6] = matrix.m[7] = 0.0;
            matrix.m[8] = matrix.m[9] = 0.0;
            matrix.m[10] = -zfar / (znear - zfar);
            matrix.m[11] = 1.0;
            matrix.m[12] = matrix.m[13] = matrix.m[15] = 0.0;
            matrix.m[14] = (znear * zfar) / (znear - zfar);
            return matrix;
        };
        Matrix.Transpose = function (matrix) {
            var result = new Matrix();
            result.m[0] = matrix.m[0];
            result.m[1] = matrix.m[4];
            result.m[2] = matrix.m[8];
            result.m[3] = matrix.m[12];
            result.m[4] = matrix.m[1];
            result.m[5] = matrix.m[5];
            result.m[6] = matrix.m[9];
            result.m[7] = matrix.m[13];
            result.m[8] = matrix.m[2];
            result.m[9] = matrix.m[6];
            result.m[10] = matrix.m[10];
            result.m[11] = matrix.m[14];
            result.m[12] = matrix.m[3];
            result.m[13] = matrix.m[7];
            result.m[14] = matrix.m[11];
            result.m[15] = matrix.m[15];
            return result;
        };
        return Matrix;
    })();
    BABYLON.Matrix = Matrix;
})(BABYLON || (BABYLON = {}));
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
var Array1dAs2d = (function () {
    function Array1dAs2d(array, width, step) {
        if (step === void 0) { step = 1; }
        this.array = array;
        this.width = width;
        this.height = array.length / width / step;
        this.step = step;
    }
    Array1dAs2d.prototype.get_index = function (x, y) {
        return (y * this.width + x) * this.step;
    };
    Array1dAs2d.prototype.get = function (x, y) {
        return this.array[this.get_index(x, y)];
    };
    Array1dAs2d.prototype.set = function (x, y, v) {
        this.array[this.get_index(x, y)] = v;
    };
    Array1dAs2d.prototype.setAll = function (v) {
        for (var i = 0; i < this.array.length; i++)
            this.array[i] = v;
    };
    Array1dAs2d.prototype.copy = function (from) {
        for (var i = 0; i < this.array.length; i++)
            this.array[i] = from.array[i];
    };
    return Array1dAs2d;
})();
var ColorBuffer = (function (_super) {
    __extends(ColorBuffer, _super);
    function ColorBuffer(array, width) {
        _super.call(this, array, width, 4);
    }
    ColorBuffer.prototype.setColor = function (x, y, r, g, b, a) {
        if (a == 0)
            return;
        var i = this.get_index(x, y);
        this.array[i] = r;
        this.array[i + 1] = g;
        this.array[i + 2] = b;
        this.array[i + 3] = a;
    };
    ColorBuffer.prototype.copyColor = function (x, y, from, xFrom, yFrom) {
        var i = from.get_index(xFrom, yFrom);
        this.setColor(x, y, from.array[i], from.array[i + 1], from.array[i + 2], from.array[i + 3]);
    };
    ColorBuffer.prototype.clear = function () {
        this.setAll(0);
    };
    ColorBuffer.create = function (width, height) {
        return new ColorBuffer(new Array(width * height * 4), width);
    };
    ColorBuffer.fromHtmlImage = function (urlOrBase64Data, continuation) {
        var image = new Image();
        image.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var internalContext = canvas.getContext("2d");
            internalContext.drawImage(image, 0, 0);
            var data = internalContext.getImageData(0, 0, image.width, image.height).data;
            var cb = new ColorBuffer(data, image.width);
            continuation(cb);
        };
        image.src = urlOrBase64Data;
    };
    return ColorBuffer;
})(Array1dAs2d);
var GraphicOutput = (function () {
    function GraphicOutput() {
    }
    GraphicOutput.prototype.get_width = function () { throw new Error("Abstract method."); };
    GraphicOutput.prototype.get_height = function () { throw new Error("Abstract method."); };
    GraphicOutput.prototype.get_buffer = function () { throw new Error("Abstract method."); };
    GraphicOutput.prototype.drawBuffer = function () { throw new Error("Abstract method."); };
    GraphicOutput.prototype.drawText = function (text, x, y, color, size, font) {
        if (color === void 0) { color = "ffffff"; }
        if (size === void 0) { size = 30; }
        if (font === void 0) { font = "Verdana"; }
        throw new Error("Abstract method.");
    };
    return GraphicOutput;
})();
var HtmlCanvasOutput = (function (_super) {
    __extends(HtmlCanvasOutput, _super);
    function HtmlCanvasOutput(canvasId) {
        _super.call(this);
        var canvas = document.getElementById(canvasId);
        this.canvasContext = canvas.getContext("2d");
        this.canvasImageData = this.canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        this.colorBuffer = new ColorBuffer(this.canvasImageData.data, canvas.width);
    }
    HtmlCanvasOutput.prototype.get_width = function () { return this.canvasContext.canvas.width; };
    HtmlCanvasOutput.prototype.get_height = function () { return this.canvasContext.canvas.height; };
    HtmlCanvasOutput.prototype.get_buffer = function () { return this.colorBuffer; };
    HtmlCanvasOutput.prototype.drawBuffer = function () {
        this.canvasContext.putImageData(this.canvasImageData, 0, 0);
    };
    HtmlCanvasOutput.prototype.drawText = function (text, x, y, color, size, font) {
        if (color === void 0) { color = "ffffff"; }
        if (size === void 0) { size = 20; }
        if (font === void 0) { font = "Verdana"; }
        this.canvasContext.font = size + "px " + font;
        this.canvasContext.fillStyle = "#" + color;
        this.canvasContext.fillText(text, x, y);
    };
    return HtmlCanvasOutput;
})(GraphicOutput);
var Figure = (function () {
    function Figure() {
        this.size = BABYLON.Vector3.Zero();
        this.projectedSize = BABYLON.Vector3.Zero();
        this.position = BABYLON.Vector3.Zero();
        this.projectedPosition = BABYLON.Vector3.Zero();
        this.rotation = BABYLON.Vector3.Zero();
        this.velocity = BABYLON.Vector3.Zero();
        this.color = new BABYLON.Color4(0, 0, 0, 0);
    }
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
    }
    return Rectangle;
})(Figure2d);
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
})(Figure2d);
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(image) {
        _super.call(this);
        this.image = image;
    }
    return Sprite;
})(Rectangle);
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(image) {
        _super.call(this, image);
        this.fullSize = BABYLON.Vector3.Zero();
        this.fullProjectedSize = BABYLON.Vector3.Zero();
        this.countH = 1;
        this.countV = 1;
    }
    return Tile;
})(Sprite);
var Texture = (function () {
    // Working with a fix sized texture (512x512, 1024x1024, etc.).
    function Texture(width, height) {
        this.width = width;
        this.height = height;
    }
    Texture.prototype.load = function (filename) {
        var _this = this;
        var image = new Image();
        image.height = this.height;
        image.width = this.width;
        image.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = _this.width;
            canvas.height = _this.height;
            var internalContext = canvas.getContext("2d");
            internalContext.drawImage(image, 0, 0);
            _this.internalBuffer = internalContext.getImageData(0, 0, _this.width, _this.height);
        };
        image.src = filename;
    };
    // Takes the U & V coordinates exported by Blender
    // and return the corresponding pixel color in the texture
    Texture.prototype.map = function (tu, tv) {
        if (this.internalBuffer) {
            // using a % operator to cycle/repeat the texture if needed
            var u = Math.abs(((tu * this.width) % this.width)) >> 0;
            var v = Math.abs(((tv * this.height) % this.height)) >> 0;
            var pos = (u + v * this.width) * 4;
            var r = this.internalBuffer.data[pos];
            var g = this.internalBuffer.data[pos + 1];
            var b = this.internalBuffer.data[pos + 2];
            var a = this.internalBuffer.data[pos + 3];
            return new BABYLON.Color4(r / 255.0, g / 255.0, b / 255.0, a / 255.0);
        }
        else {
            return new BABYLON.Color4(1, 1, 1, 1);
        }
    };
    return Texture;
})();
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    function Mesh(verticesCount, facesCount) {
        _super.call(this);
        this.vertices = Mesh.createArrayOfVertexes(verticesCount);
        this.projectedVertices = Mesh.createArrayOfVertexes(verticesCount);
        this.faces = new Array(facesCount);
    }
    Mesh.createVertex = function () {
        return {
            normal: BABYLON.Vector3.Zero(),
            coordinates: BABYLON.Vector3.Zero(),
            worldCoordinates: BABYLON.Vector3.Zero(),
            textureCoordinates: BABYLON.Vector2.Zero()
        };
    };
    Mesh.createArrayOfVertexes = function (c) {
        var a = new Array(c);
        for (var i = 0; i < c; i++)
            a[i] = Mesh.createVertex();
        return a;
    };
    return Mesh;
})(Figure3d);
// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx
var MeshFactory = (function () {
    function MeshFactory() {
    }
    MeshFactory.loadFromBabylonJsonFileAsync = function (fileName, callback) {
        var jsonObject = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", fileName, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                jsonObject = JSON.parse(xmlhttp.responseText);
                var meshes = MeshFactory.createFromBabylonData(jsonObject);
                callback(meshes);
            }
        };
        xmlhttp.send(null);
    };
    MeshFactory.createFromBabylonData = function (babylonData, loadTextures) {
        if (loadTextures === void 0) { loadTextures = true; }
        var meshes = [];
        var materials = [];
        for (var materialIndex = 0; materialIndex < babylonData.materials.length; materialIndex++) {
            var material = {};
            material.Name = babylonData.materials[materialIndex].name;
            material.ID = babylonData.materials[materialIndex].id;
            if (babylonData.materials[materialIndex].diffuseTexture)
                material.DiffuseTextureName = babylonData.materials[materialIndex].diffuseTexture.name;
            materials[material.ID] = material;
        }
        for (var meshIndex = 0; meshIndex < babylonData.meshes.length; meshIndex++) {
            var verticesArray = babylonData.meshes[meshIndex].vertices;
            // Faces
            var indicesArray = babylonData.meshes[meshIndex].indices;
            var uvCount = babylonData.meshes[meshIndex].uvCount;
            var verticesStep = 1;
            // Depending of the number of texture's coordinates per vertex
            // we're jumping in the vertices array  by 6, 8 & 10 windows frame
            switch (uvCount) {
                case 0:
                    verticesStep = 6;
                    break;
                case 1:
                    verticesStep = 8;
                    break;
                case 2:
                    verticesStep = 10;
                    break;
            }
            // the number of interesting vertices information for us
            var verticesCount = verticesArray.length / verticesStep;
            // number of faces is logically the size of the array divided by 3 (A, B, C)
            var facesCount = indicesArray.length / 3;
            var mesh = new Mesh(verticesCount, facesCount);
            // Filling the Vertices array of our mesh first
            for (var index = 0; index < verticesCount; index++) {
                var x = verticesArray[index * verticesStep];
                var y = verticesArray[index * verticesStep + 1];
                var z = verticesArray[index * verticesStep + 2];
                // Loading the vertex normal exported by Blender
                var nx = verticesArray[index * verticesStep + 3];
                var ny = verticesArray[index * verticesStep + 4];
                var nz = verticesArray[index * verticesStep + 5];
                mesh.vertices[index] = {
                    coordinates: new BABYLON.Vector3(x, y, z),
                    normal: new BABYLON.Vector3(nx, ny, nz)
                };
                if (uvCount > 0) {
                    // Loading the texture coordinates
                    var u = verticesArray[index * verticesStep + 6];
                    var v = verticesArray[index * verticesStep + 7];
                    mesh.vertices[index].textureCoordinates = new BABYLON.Vector2(u, v);
                }
                else {
                    mesh.vertices[index].textureCoordinates = new BABYLON.Vector2(0, 0);
                }
            }
            // Then filling the Faces array
            for (var index = 0; index < facesCount; index++) {
                var a = indicesArray[index * 3];
                var b = indicesArray[index * 3 + 1];
                var c = indicesArray[index * 3 + 2];
                mesh.faces[index] = {
                    a: a,
                    b: b,
                    c: c
                };
            }
            // Getting the position you've set in Blender
            var position = babylonData.meshes[meshIndex].position;
            mesh.position = new BABYLON.Vector3(position[0], position[1], position[2]);
            if (uvCount > 0) {
                var meshTextureID = babylonData.meshes[meshIndex].materialId;
                var meshTextureName = materials[meshTextureID].DiffuseTextureName;
                mesh.texture = new Texture(512, 512);
                if (loadTextures)
                    mesh.texture.load(meshTextureName.toString());
            }
            meshes.push(mesh);
        }
        return meshes;
    };
    MeshFactory.createFromBabylonAndTextureBase64Data = function (json) {
        var meshes = MeshFactory.createFromBabylonData(json.babylonData, false);
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].texture.load(json.textureBase64Data);
        }
        return meshes;
    };
    return MeshFactory;
})();
var Camera = (function () {
    function Camera() {
        this.position = new BABYLON.Vector3(0, 0, -100);
        this.direction = new BABYLON.Vector3(0, 0, 1);
        this.up = BABYLON.Vector3.Up();
        this.fov = 0.78;
        this.zNear = 0.01;
        this.zFar = 1.0;
    }
    return Camera;
})();
var Light = (function () {
    function Light() {
        this.position = new BABYLON.Vector3(0, 0, -1000);
    }
    return Light;
})();
var Scene = (function () {
    function Scene() {
        this.figures = [];
        this.camera = new Camera();
        this.light = new Light();
    }
    return Scene;
})();
var RendererOutput = (function () {
    function RendererOutput(colorBuffer) {
        this.depthBufferMaxValue = 10000000;
        this.colorBuffer = colorBuffer;
        this.width = colorBuffer.width;
        this.widthHalf = this.width / 2;
        this.height = colorBuffer.height;
        this.heightHalf = this.height / 2;
        this.depthBuffer = new Array1dAs2d(new Array(colorBuffer.width * colorBuffer.height), colorBuffer.width);
        this.resetDepthBuffer();
    }
    RendererOutput.prototype.clear = function () {
        for (var i = 0; i < this.colorBuffer.array.length; i++) {
            this.colorBuffer.array[i] = 0;
        }
        this.resetDepthBuffer();
    };
    RendererOutput.prototype.checkDepth = function (x, y, z) {
        var i = this.depthBuffer.get_index(x, y);
        if (this.depthBuffer.array[i] >= z) {
            this.depthBuffer.array[i] = z;
            return true;
        }
        return false;
    };
    RendererOutput.prototype.resetDepthBuffer = function () {
        for (var i = 0; i < this.depthBuffer.array.length; i++) {
            this.depthBuffer.array[i] = this.depthBufferMaxValue;
        }
    };
    return RendererOutput;
})();
var Renderer = (function () {
    function Renderer(output) {
        this.output = output;
    }
    return Renderer;
})();
var Renderer2d = (function (_super) {
    __extends(Renderer2d, _super);
    function Renderer2d(output) {
        _super.call(this, output);
    }
    Renderer2d.prototype.drawPoint = function (x, y, z, c) {
        this.drawPointC(x, y, z, c.r * 255, c.g * 255, c.b * 255, c.a * 255);
    };
    Renderer2d.prototype.drawPointC = function (x, y, z, r, g, b, a) {
        if (a == 0)
            return;
        x = x >> 0;
        y = y >> 0;
        if (x >= 0 && y >= 0 && x < this.output.width && y < this.output.height) {
            if (this.output.checkDepth(x, y, z)) {
                this.output.colorBuffer.setColor(x, y, r, g, b, a);
            }
        }
    };
    Renderer2d.prototype.drawLine = function (x0, y0, x1, y1, z, c) {
        x0 = x0 >> 0;
        y0 = y0 >> 0;
        x1 = x1 >> 0;
        y1 = y1 >> 0;
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;
        while (true) {
            this.drawPoint(x0, y0, z, c);
            if ((x0 == x1) && (y0 == y1))
                break;
            var e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    };
    Renderer2d.prototype.drawCircle = function (x, y, z, radius, color) {
        var x1 = radius;
        var y1 = 0;
        var radiusError = 1 - x1;
        while (x1 >= y1) {
            this.drawPoint(x1 + x, y1 + y, z, color);
            this.drawPoint(-x1 + x, y1 + y, z, color);
            this.drawPoint(y1 + x, x1 + y, z, color);
            this.drawPoint(-y1 + x, x1 + y, z, color);
            this.drawPoint(-x1 + x, -y1 + y, z, color);
            this.drawPoint(x1 + x, -y1 + y, z, color);
            this.drawPoint(-y1 + x, -x1 + y, z, color);
            this.drawPoint(y1 + x, -x1 + y, z, color);
            y1++;
            if (radiusError < 0) {
                radiusError += 2 * y1 + 1;
            }
            else {
                x1--;
                radiusError += 2 * (y1 - x1) + 1;
            }
        }
    };
    Renderer2d.prototype.drawFilledCircle = function (cx, cy, z, radius, color) {
        var yb = Math.min(radius, this.output.height / 2);
        var xb = Math.min(radius, this.output.width / 2);
        for (var y = -yb; y <= yb; y++)
            for (var x = -xb; x <= xb; x++)
                if (x * x + y * y <= radius * radius)
                    this.drawPoint(cx + x, cy + y, z, color);
    };
    Renderer2d.prototype.drawImage = function (image, x, y, z, scalex, scaley) {
        var _this = this;
        if (scalex === void 0) { scalex = 1; }
        if (scaley === void 0) { scaley = 1; }
        ImageTransformer.scale(image, this.output.colorBuffer, scalex, scaley, x, y, function (ox, oy) { return _this.output.checkDepth(ox, oy, z); });
    };
    Renderer2d.prototype.drawTiles = function (image, x, y, z, countH, countV, scalex, scaley) {
        if (countV === void 0) { countV = 1; }
        if (scalex === void 0) { scalex = 1; }
        if (scaley === void 0) { scaley = 1; }
        for (var ty = 0, theight = image.height * scaley, py = y; ty < countV; ty++, py += theight) {
            for (var tx = 0, twidth = image.width * scalex, px = x; tx < countH; tx++, px += twidth) {
                this.drawImage(image, px, py, z, scalex, scaley);
            }
        }
    };
    Renderer2d.prototype.drawRectangle = function (x, y, z, width, height, color) {
        this.drawLine(x, y, x + width, y, z, color);
        this.drawLine(x + width, y, x + width, y + height, z, color);
        this.drawLine(x + width, y + height, x, y + height, z, color);
        this.drawLine(x, y + height, x, y, z, color);
    };
    Renderer2d.prototype.drawFilledRectangle = function (x, y, z, width, height, color) {
        for (var i = y; i < y + width; i++)
            this.drawLine(x, i, x + width - 1, i, z, color);
    };
    Renderer2d.prototype.drawPolygon = function (path, z, color) {
        for (var i = 0; i < path.length - 1; i++) {
            var p1 = path[i];
            var p2 = path[i + 1];
            this.drawLine(p1.x, p1.y, p2.x, p2.y, z, color);
        }
    };
    Renderer2d.prototype.drawTriangle = function (xa, ya, xb, yb, xc, yc, z, color) {
        this.drawLine(xa, ya, xb, yb, z, color);
        this.drawLine(xb, yb, xc, yc, z, color);
        this.drawLine(xc, yc, xa, ya, z, color);
    };
    return Renderer2d;
})(Renderer);
// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx
var Render3dSettings = (function () {
    function Render3dSettings() {
        this.showTextures = true;
        this.showMeshes = false;
        this.showFaces = true;
    }
    return Render3dSettings;
})();
var Renderer3d = (function (_super) {
    __extends(Renderer3d, _super);
    function Renderer3d(output) {
        _super.call(this, output);
        this.renderSettings = new Render3dSettings();
        this.renderer2d = new Renderer2d(output);
    }
    Renderer3d.prototype.get_viewProjectionMatrix = function (camera) {
        var viewMatrix = BABYLON.Matrix.LookAtLH(camera.position, camera.position.add(camera.direction), camera.up);
        var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(camera.fov, this.output.width / this.output.height, camera.zNear, camera.zFar);
        return viewMatrix.multiply(projectionMatrix);
    };
    Renderer3d.prototype.projectScene = function (scene) {
        var viewProjectionMatrix = this.get_viewProjectionMatrix(scene.camera);
        for (var i = 0; i < scene.figures.length; i++) {
            var f = scene.figures[i];
            var rotMatrix = BABYLON.Matrix.RotationYawPitchRoll(f.rotation.y, f.rotation.x, f.rotation.z);
            var worldMatrix = rotMatrix.multiply(BABYLON.Matrix.Translation(f.position.x, f.position.y, f.position.z));
            var transformMatrix = worldMatrix.multiply(viewProjectionMatrix);
            this.projectFigure(f, worldMatrix, transformMatrix, rotMatrix);
        }
    };
    Renderer3d.prototype.projectVector = function (v, transMat, pv) {
        BABYLON.Vector3.TransformCoordinates(v, transMat, pv);
        pv.x = pv.x * this.output.width + this.output.widthHalf;
        pv.y = -pv.y * this.output.height + this.output.heightHalf;
        pv.z = pv.z;
    };
    Renderer3d.prototype.projectVertex = function (vertex, transMat, worldMat, rotMatrix, pvertex) {
        BABYLON.Vector3.TransformCoordinates(vertex.coordinates, worldMat, pvertex.worldCoordinates);
        BABYLON.Vector3.TransformCoordinates(vertex.normal, rotMatrix, pvertex.normal);
        this.projectVector(vertex.coordinates, transMat, pvertex.coordinates);
        pvertex.textureCoordinates = vertex.textureCoordinates;
    };
    Renderer3d.prototype.projectFigure = function (f, worldMatrix, transformMatrix, rotMatrix) {
        this.projectVector(f.position, transformMatrix, f.projectedPosition);
        var posPlusSize = f.position.add(f.size);
        var posPlusSizeProjected = BABYLON.Vector3.Zero();
        this.projectVector(posPlusSize, transformMatrix, posPlusSizeProjected);
        f.projectedSize.x = (posPlusSizeProjected.x - f.projectedPosition.x) * 2;
        f.projectedSize.y = (-posPlusSizeProjected.y + f.projectedPosition.y) * 2;
        if (f instanceof Mesh) {
            this.projectMesh(f, worldMatrix, transformMatrix, rotMatrix);
        }
    };
    Renderer3d.prototype.projectMesh = function (m, worldMatrix, transformMatrix, rotMatrix) {
        for (var indexFaces = 0; indexFaces < m.faces.length; indexFaces++) {
            var currentFace = m.faces[indexFaces];
            this.projectVertex(m.vertices[currentFace.a], transformMatrix, worldMatrix, rotMatrix, m.projectedVertices[currentFace.a]);
            this.projectVertex(m.vertices[currentFace.b], transformMatrix, worldMatrix, rotMatrix, m.projectedVertices[currentFace.b]);
            this.projectVertex(m.vertices[currentFace.c], transformMatrix, worldMatrix, rotMatrix, m.projectedVertices[currentFace.c]);
        }
    };
    Renderer3d.prototype.drawScene = function (scene) {
        this.projectScene(scene);
        for (var i = 0; i < scene.figures.length; i++) {
            this.drawFigure(scene.figures[i], scene.light);
        }
    };
    Renderer3d.prototype.drawFigure = function (f, light) {
        if (f instanceof Circle) {
            this.drawCircle(f);
        }
        else if (f instanceof Tile) {
            this.drawTile(f);
        }
        else if (f instanceof Sprite) {
            this.drawSprite(f);
        }
        else if (f instanceof Mesh) {
            this.drawMesh(f, light);
        }
    };
    Renderer3d.prototype.drawCircle = function (circle) {
        this.renderer2d.drawFilledCircle(circle.projectedPosition.x, circle.projectedPosition.y, circle.projectedPosition.z, circle.get_projectedRadius(), circle.color);
    };
    Renderer3d.prototype.drawSprite = function (sprite) {
        var scalex = sprite.projectedSize.x / sprite.image.width;
        var scaley = sprite.projectedSize.y / sprite.image.height;
        var x = sprite.projectedPosition.x - sprite.projectedSize.x / 2;
        var y = sprite.projectedPosition.y - sprite.projectedSize.y / 2;
        this.renderer2d.drawImage(sprite.image, x, y, sprite.projectedPosition.z, scalex, scaley);
    };
    Renderer3d.prototype.drawTile = function (tile) {
        var scalex = tile.projectedSize.x / tile.image.width;
        var scaley = tile.projectedSize.y / tile.image.height;
        var x = tile.projectedPosition.x - tile.projectedSize.x / 2;
        var y = tile.projectedPosition.y - tile.projectedSize.y / 2;
        this.renderer2d.drawTiles(tile.image, x, y, tile.projectedPosition.z, tile.countH, tile.countV, scalex, scaley);
    };
    Renderer3d.prototype.drawMesh = function (m, light) {
        var linesColor = new BABYLON.Color4(1, 1, 1, 1);
        for (var indexFaces = 0; indexFaces < m.faces.length; indexFaces++) {
            var currentFace = m.faces[indexFaces];
            var va = m.projectedVertices[currentFace.a];
            var vb = m.projectedVertices[currentFace.b];
            var vc = m.projectedVertices[currentFace.c];
            if (this.renderSettings.showFaces) {
                var color = new BABYLON.Color4(1, 1, 1, 1);
                this.drawTriangle(va, vb, vc, color, light, this.renderSettings.showTextures ? m.texture : null);
            }
            if (this.renderSettings.showMeshes) {
                this.renderer2d.drawLine(va.coordinates.x, va.coordinates.y, vb.coordinates.x, vb.coordinates.y, 0, linesColor);
                this.renderer2d.drawLine(vb.coordinates.x, vb.coordinates.y, vc.coordinates.x, vc.coordinates.y, 0, linesColor);
                this.renderer2d.drawLine(vc.coordinates.x, vc.coordinates.y, va.coordinates.x, va.coordinates.y, 0, linesColor);
            }
        }
    };
    Renderer3d.prototype.drawTriangle = function (v1, v2, v3, color, light, texture) {
        // Sorting the points in order to always have this order on screen p1, p2 & p3
        // with p1 always up (thus having the Y the lowest possible to be near the top screen)
        // then p2 between p1 & p3
        if (v1.coordinates.y > v2.coordinates.y) {
            var temp = v2;
            v2 = v1;
            v1 = temp;
        }
        if (v2.coordinates.y > v3.coordinates.y) {
            var temp = v2;
            v2 = v3;
            v3 = temp;
        }
        if (v1.coordinates.y > v2.coordinates.y) {
            var temp = v2;
            v2 = v1;
            v1 = temp;
        }
        var p1 = v1.coordinates;
        var p2 = v2.coordinates;
        var p3 = v3.coordinates;
        // computing the cos of the angle between the light vector and the normal vector
        // it will return a value between 0 and 1 that will be used as the intensity of the color
        //var ndotl = this.computeNDotL(centerPoint, vnFace, lightPos);
        var nl1 = this.computeNDotL(v1.worldCoordinates, v1.normal, light.position);
        var nl2 = this.computeNDotL(v2.worldCoordinates, v2.normal, light.position);
        var nl3 = this.computeNDotL(v3.worldCoordinates, v3.normal, light.position);
        var data = {};
        // computing lines' directions
        var dP1P2;
        var dP1P3;
        // http://en.wikipedia.org/wiki/Slope
        // Computing slopes
        if (p2.y - p1.y > 0)
            dP1P2 = (p2.x - p1.x) / (p2.y - p1.y);
        else
            dP1P2 = 0;
        if (p3.y - p1.y > 0)
            dP1P3 = (p3.x - p1.x) / (p3.y - p1.y);
        else
            dP1P3 = 0;
        if (dP1P2 > dP1P3) {
            for (var y = Math.max(p1.y >> 0, 0), ye = Math.min(p3.y >> 0, this.output.height); y <= ye; y++) {
                data.currentY = y;
                if (y < p2.y) {
                    data.ndotla = nl1;
                    data.ndotlb = nl3;
                    data.ndotlc = nl1;
                    data.ndotld = nl2;
                    data.ua = v1.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v2.textureCoordinates.x;
                    data.va = v1.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v2.textureCoordinates.y;
                    this.processScanLine(data, v1, v3, v1, v2, color, texture);
                }
                else {
                    data.ndotla = nl1;
                    data.ndotlb = nl3;
                    data.ndotlc = nl2;
                    data.ndotld = nl3;
                    data.ua = v1.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v2.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;
                    data.va = v1.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v2.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;
                    this.processScanLine(data, v1, v3, v2, v3, color, texture);
                }
            }
        }
        else {
            for (var y = Math.max(0, p1.y >> 0), ye = Math.min(this.output.height, p3.y >> 0); y <= ye; y++) {
                data.currentY = y;
                if (y < p2.y) {
                    data.ndotla = nl1;
                    data.ndotlb = nl2;
                    data.ndotlc = nl1;
                    data.ndotld = nl3;
                    data.ua = v1.textureCoordinates.x;
                    data.ub = v2.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;
                    data.va = v1.textureCoordinates.y;
                    data.vb = v2.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;
                    this.processScanLine(data, v1, v2, v1, v3, color, texture);
                }
                else {
                    data.ndotla = nl2;
                    data.ndotlb = nl3;
                    data.ndotlc = nl1;
                    data.ndotld = nl3;
                    data.ua = v2.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;
                    data.va = v2.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;
                    this.processScanLine(data, v2, v3, v1, v3, color, texture);
                }
            }
        }
    };
    Renderer3d.prototype.clamp = function (value, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.max(min, Math.min(value, max));
    };
    Renderer3d.prototype.interpolate = function (min, max, gradient) {
        return min + (max - min) * this.clamp(gradient);
    };
    // drawing line between 2 points from left to right
    // papb -> pcpd
    // pa, pb, pc, pd must then be sorted before
    Renderer3d.prototype.processScanLine = function (data, va, vb, vc, vd, color, texture) {
        var pa = va.coordinates;
        var pb = vb.coordinates;
        var pc = vc.coordinates;
        var pd = vd.coordinates;
        // Thanks to current Y, we can compute the gradient to compute others values like
        // the starting X (sx) and ending X (ex) to draw between
        // if pa.Y == pb.Y or pc.Y == pd.Y, gradient is forced to 1
        var gradient1 = pa.y != pb.y ? (data.currentY - pa.y) / (pb.y - pa.y) : 1;
        var gradient2 = pc.y != pd.y ? (data.currentY - pc.y) / (pd.y - pc.y) : 1;
        var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0;
        var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;
        // starting Z & ending Z
        var z1 = this.interpolate(pa.z, pb.z, gradient1);
        var z2 = this.interpolate(pc.z, pd.z, gradient2);
        // Interpolating normals on Y
        var snl = this.interpolate(data.ndotla, data.ndotlb, gradient1);
        var enl = this.interpolate(data.ndotlc, data.ndotld, gradient2);
        // Interpolating texture coordinates on Y
        var su = this.interpolate(data.ua, data.ub, gradient1);
        var eu = this.interpolate(data.uc, data.ud, gradient2);
        var sv = this.interpolate(data.va, data.vb, gradient1);
        var ev = this.interpolate(data.vc, data.vd, gradient2);
        // drawing a line from left (sx) to right (ex) 
        for (var x = Math.max(0, sx), exx = Math.min(ex, this.output.width); x < exx; x++) {
            var gradient = (x - sx) / (ex - sx);
            // Interpolating Z, normal and texture coordinates on X
            var z = this.interpolate(z1, z2, gradient);
            var ndotl = this.interpolate(snl, enl, gradient);
            var u = this.interpolate(su, eu, gradient);
            var v = this.interpolate(sv, ev, gradient);
            var textureColor = texture ? texture.map(u, v) : BABYLON.Color4.white;
            // changing the native color value using the cosine of the angle
            // between the light vector and the normal vector
            // and the texture color
            this.renderer2d.drawPointC(x, data.currentY, z, color.r * ndotl * textureColor.r * 255, color.g * ndotl * textureColor.g * 255, color.b * ndotl * textureColor.b * 255, 255);
        }
    };
    // Compute the cosine of the angle between the light vector and the normal vector
    // Returns a value between 0 and 1
    Renderer3d.prototype.computeNDotL = function (vertex, normal, lightPosition) {
        var lightDirection = lightPosition.subtract(vertex);
        lightDirection.normalize();
        return Math.max(0, BABYLON.Vector3.Dot(normal, lightDirection));
    };
    return Renderer3d;
})(Renderer);
var ImageTransformer = (function () {
    function ImageTransformer() {
    }
    ImageTransformer.rotate = function (input, output, angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var imovx = -input.width / 2;
        var imovy = -input.height / 2;
        var omovx = -output.width / 2;
        var omovy = -output.height / 2;
        for (var i = 0, iy = imovy; i < input.height; i++, iy++) {
            for (var j = 0, ix = imovx; j < input.width; j++, ix++) {
                var ox = ix * cos - iy * sin - omovx >> 0;
                var oy = ix * sin + iy * cos - omovy >> 0;
                if (ox >= 0 && ox < output.width && oy >= 0 && oy < output.height) {
                    var idx = input.get_index(j, i);
                    var oidx = output.get_index(ox, oy);
                    output.array[oidx] = input.array[idx];
                    output.array[oidx + 1] = input.array[idx + 1];
                    output.array[oidx + 2] = input.array[idx + 2];
                    output.array[oidx + 3] = input.array[idx + 3];
                    // Dirty fill potentially unfilled pixels. 
                    if (ox < output.width - 1) {
                        output.array[oidx + 4] = input.array[idx];
                        output.array[oidx + 5] = input.array[idx + 1];
                        output.array[oidx + 6] = input.array[idx + 2];
                        output.array[oidx + 7] = input.array[idx + 3];
                    }
                }
            }
        }
    };
    ImageTransformer.scale = function (input, output, scaleX, scaleY, x, y, filter) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (filter === void 0) { filter = null; }
        var sx = 0;
        if (x < 0) {
            sx = -x / scaleX >> 0;
            x = 0;
        }
        var sy = 0;
        if (y < 0) {
            sy = -y / scaleY >> 0;
            y = 0;
        }
        for (var iy = sy, oy = y >> 0, fullpy = 0; iy < input.height && oy < output.height; iy++) {
            fullpy += scaleY;
            if (fullpy >= 1 || (fullpy > 0.1 && iy == input.height - 1)) {
                while (fullpy > 0.1 && oy < output.height) {
                    for (var ix = sx, ox = x >> 0, fullpx = 0; ix < input.width && ox < output.width; ix++) {
                        fullpx += scaleX;
                        if (fullpx >= 1 || (fullpx > 0.1 && ix == input.width - 1)) {
                            while (fullpx > 0.1 && ox < output.width) {
                                if (filter == null || filter(ox, oy)) {
                                    output.copyColor(ox, oy, input, ix, iy);
                                }
                                fullpx--;
                                ox++;
                            }
                        }
                    }
                    fullpy--;
                    oy++;
                }
            }
        }
    };
    return ImageTransformer;
})();
var ImageEffects = (function () {
    function ImageEffects() {
    }
    ImageEffects.blur = function (input, output, radius) {
        if (radius < 1) {
            output.copy(input);
            return;
        }
        var weights = ImageEffects.getWeights(radius);
        var wsum = 0;
        for (var i = weights.length; i--;) {
            wsum += weights[i];
        }
        var idx;
        for (var i = 0; i < input.height; i++) {
            for (var j = 0; j < input.width; j++) {
                idx = (i * input.width + j) * 4;
                output.array[idx] = ImageEffects.blurPixelH(j, i, input, weights, radius, 0);
                output.array[idx + 1] = ImageEffects.blurPixelH(j, i, input, weights, radius, 1);
                output.array[idx + 2] = ImageEffects.blurPixelH(j, i, input, weights, radius, 2);
                output.array[idx + 3] = input.array[idx + 3];
            }
        }
        for (var i = 0; i < input.height; i++) {
            for (var j = 0; j < input.width; j++) {
                idx = (i * input.width + j) * 4;
                output.array[idx] = ImageEffects.blurPixelV(j, i, output, weights, radius, 0);
                output.array[idx + 1] = ImageEffects.blurPixelV(j, i, output, weights, radius, 1);
                output.array[idx + 2] = ImageEffects.blurPixelV(j, i, output, weights, radius, 2);
            }
        }
    };
    ImageEffects.blurPixelH = function (x, y, simage, weights, radius, offset) {
        var s = x - radius;
        if (s < 0)
            s = 0;
        var e = x + radius;
        if (e > simage.width)
            e = simage.width;
        var sum = 0;
        var wsum = 0;
        for (var w = 0, i = s; i < e; i++, w++) {
            var idx = simage.get_index(i, y) + offset;
            sum += simage.array[idx] * weights[w];
            wsum += weights[w];
        }
        return sum / wsum;
    };
    ImageEffects.blurPixelV = function (x, y, simage, weights, radius, offset) {
        var s = y - radius;
        if (s < 0)
            s = 0;
        var e = y + radius;
        if (e > simage.height)
            e = simage.height;
        var sum = 0;
        var wsum = 0;
        for (var w = 0, i = s; i < e; i++, w++) {
            var idx = simage.get_index(x, i) + offset;
            sum += simage.array[idx] * weights[w];
            wsum += weights[w];
        }
        return sum / wsum;
    };
    ImageEffects.getWeights = function (radius) {
        //var f = x =>  (radius - x) / radius; 
        var sigma = radius / 3;
        var gauss = function (x) { return (1 / Math.sqrt(2 * Math.PI * sigma * sigma)) * Math.exp(-x * x / (2 * sigma * sigma)); };
        var w = new Array(radius * 2);
        for (var i = radius, x = 0; i < radius * 2; i++, x++) {
            w[i] = gauss(x);
        }
        for (var i = radius - 1, j = radius; i >= 0; i--, j++) {
            w[i] = w[j];
        }
        return w;
    };
    return ImageEffects;
})();
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
        var rs = c1.get_radius() + c2.get_radius();
        return xd * xd + yd * yd <= rs * rs;
    };
    return Phisics;
})();
var AbstractEventArgs = (function () {
    function AbstractEventArgs() {
    }
    return AbstractEventArgs;
})();
var AbstractEvent = (function () {
    function AbstractEvent() {
        this.handlers = [];
    }
    AbstractEvent.prototype.addHandler = function (handler) {
        this.handlers.push(handler);
    };
    AbstractEvent.prototype.removeHandler = function (handler) {
        var index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    };
    AbstractEvent.prototype.raise = function (args) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i](args);
        }
    };
    return AbstractEvent;
})();
var InputDeviceEventArgs = (function (_super) {
    __extends(InputDeviceEventArgs, _super);
    function InputDeviceEventArgs() {
        _super.apply(this, arguments);
    }
    return InputDeviceEventArgs;
})(AbstractEventArgs);
var InputDevice = (function () {
    function InputDevice() {
        this.inputEvent = new AbstractEvent();
    }
    return InputDevice;
})();
var MouseEventArgs = (function (_super) {
    __extends(MouseEventArgs, _super);
    function MouseEventArgs() {
        _super.apply(this, arguments);
        this.wheelDelta = 0;
    }
    return MouseEventArgs;
})(InputDeviceEventArgs);
var Mouse = (function (_super) {
    __extends(Mouse, _super);
    function Mouse() {
        _super.apply(this, arguments);
    }
    return Mouse;
})(InputDevice);
var HtmlMouse = (function (_super) {
    __extends(HtmlMouse, _super);
    function HtmlMouse(elementId) {
        var _this = this;
        _super.call(this);
        var elem = document.getElementById(elementId);
        elem.addEventListener('mousemove', function (e) {
            _this.fromBrowserEventArgs(e, 'mousemove');
        });
        elem.addEventListener('click', function (e) {
            _this.fromBrowserEventArgs(e, 'click');
        });
        elem.addEventListener('wheel', function (e) {
            _this.fromBrowserEventArgs(e, 'wheel');
        });
    }
    HtmlMouse.prototype.fromBrowserEventArgs = function (e, eventName) {
        var evt = e;
        var args = new MouseEventArgs();
        if (eventName == "click") {
            args.leftButtonClicked = true;
        }
        else if (eventName == "mousemove") {
            args.leftButtonClicked = evt.buttons == 1;
            args.move = true;
        }
        else if (eventName == "wheel") {
            args.wheelDelta = evt.deltaY || evt.detail || evt.wheelDelta;
        }
        args.x = evt.pageX - evt.target.offsetLeft;
        args.y = evt.pageY - evt.target.offsetTop;
        if (this.prevArgs != null) {
            args.deltaX = args.x - this.prevArgs.x;
            args.deltaY = args.y - this.prevArgs.y;
        }
        this.prevArgs = args;
        this.inputEvent.raise(args);
    };
    return HtmlMouse;
})(Mouse);
var KeyboardEventArgs = (function (_super) {
    __extends(KeyboardEventArgs, _super);
    function KeyboardEventArgs(pressedKey) {
        _super.call(this);
        this.pressedKey = pressedKey;
    }
    return KeyboardEventArgs;
})(InputDeviceEventArgs);
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        _super.apply(this, arguments);
    }
    return Keyboard;
})(InputDevice);
var HtmlKeyboard = (function (_super) {
    __extends(HtmlKeyboard, _super);
    function HtmlKeyboard() {
        var _this = this;
        _super.call(this);
        window.addEventListener("keydown", function (e) { return _this.inputEvent.raise(new KeyboardEventArgs(e.keyCode)); }, true);
    }
    return HtmlKeyboard;
})(Keyboard);
var InputDevices = (function () {
    function InputDevices() {
    }
    return InputDevices;
})();
var App = (function () {
    function App(graphicOutput, inputDevices) {
        this.showDebugInfo = false;
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
        var rendererOutput = new RendererOutput(this.graphicOutput.get_buffer());
        this.renderer3d = new Renderer3d(rendererOutput);
        this.renderer2d = this.renderer3d.renderer2d;
    }
    App.prototype.start = function () {
        var _this = this;
        this.onStart(function () {
            _this.createScene(function (scene) {
                _this.scene = scene;
                _this.mouseWheelVectorControl = _this.scene.camera.position;
                requestAnimationFrame(function () { return _this.loopAnimation(); });
                if (_this.inputDevices.keyboard != null)
                    _this.inputDevices.keyboard.inputEvent.addHandler(function (args) {
                        _this.handleKeyboardEvent(args);
                    });
                if (_this.inputDevices.mouse != null)
                    _this.inputDevices.mouse.inputEvent.addHandler(function (args) {
                        _this.handleMouseEvent(args);
                    });
            });
        });
    };
    App.prototype.onStart = function (continuation) {
        continuation();
    };
    App.prototype.createScene = function (continuation) {
        continuation(new Scene());
    };
    App.prototype.loopAnimation = function () {
        var _this = this;
        this.doAnimationStep();
        requestAnimationFrame(function () { return _this.loopAnimation(); });
    };
    App.prototype.doAnimationStep = function () {
        var now = new Date().getTime();
        var fps = 1000.0 / (now - this.previousFrameTime) >> 0;
        this.previousFrameTime = now;
        this.doLogicStep();
        this.drawFrame();
        this.drawFps(fps);
        if (this.showDebugInfo)
            this.drawDebugInfo();
    };
    App.prototype.doLogicStep = function () {
        for (var i = 0; i < this.scene.figures.length; i++) {
            var f = this.scene.figures[i];
            f.position.x += f.velocity.x;
            f.position.y += f.velocity.y;
        }
    };
    App.prototype.drawFrame = function () {
        this.renderer3d.output.clear();
        this.renderer3d.drawScene(this.scene);
        this.graphicOutput.drawBuffer();
    };
    App.prototype.drawFps = function (fps) {
        this.graphicOutput.drawText(fps.toString(), 11, 26, "000000");
        this.graphicOutput.drawText(fps.toString(), 10, 25);
    };
    App.prototype.drawDebugInfo = function () {
        this.drawVectorInfo(this.scene.camera.position, 10, 40, "camera");
        this.drawVectorInfo(this.scene.light.position, 10, 50, "light");
    };
    App.prototype.drawVectorInfo = function (v, x, y, description) {
        if (description === void 0) { description = ""; }
        if (description != "")
            description += ": ";
        this.graphicOutput.drawText(description + "(" + v.x + "," + v.y + "," + v.z + ")", x + 1, y + 1, "000000", 10);
        this.graphicOutput.drawText(description + "(" + v.x + "," + v.y + "," + v.z + ")", x, y, "ffffff", 10);
    };
    App.prototype.handleKeyboardEvent = function (eventArgs) {
        var k = eventArgs.pressedKey;
        var cameraDelta = 3;
        if (this.scene) {
            if (k == 187) {
                this.scene.camera.position.z += cameraDelta;
            }
            if (k == 189) {
                this.scene.camera.position.z -= cameraDelta;
            }
            if (k == 67)
                this.mouseWheelVectorControl = this.scene.camera.position;
            if (k == 76)
                this.mouseWheelVectorControl = this.scene.light.position;
        }
    };
    App.prototype.handleMouseEvent = function (eventArgs) {
        if (this.scene) {
            if (eventArgs.wheelDelta != 0) {
                this.mouseWheelVectorControl.z -= eventArgs.wheelDelta / 50;
            }
        }
    };
    return App;
})();
//# sourceMappingURL=htmlAppSimpleFramework.js.map