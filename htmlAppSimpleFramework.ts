module BABYLON {
    export class Color4 {
        r: number;
        g: number;
        b: number;
        a: number;

        constructor(initialR: number, initialG: number, initialB: number, initialA: number) {
            this.r = initialR;
            this.g = initialG;
            this.b = initialB;
            this.a = initialA;
        }

        public toString(): string {
            return "{R: " + this.r + " G:" + this.g + " B:" + this.b + " A:" + this.a + "}";
        }
    }

    export class Vector2 {
        x: number;
        y: number;

        constructor(initialX, initialY) {
            this.x = initialX;
            this.y = initialY;
        }

        public toString(): string {
            return "{X: " + this.x + " Y:" + this.y + "}";
        }
        public add(otherVector: Vector2): Vector2 {
            return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
        }
        public subtract(otherVector: Vector2): Vector2 {
            return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
        }
        public negate(): Vector2 {
            return new Vector2(-this.x, -this.y);
        }
        public scale(scale: number): Vector2 {
            return new Vector2(this.x * scale, this.y * scale);
        }
        public equals(otherVector: Vector2): boolean {
            return this.x === otherVector.x && this.y === otherVector.y;
        }
        public length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        public lengthSquared(): number {
            return (this.x * this.x + this.y * this.y);
        }
        public normalize(): void {
            var len = this.length();
            if (len === 0) {
                return;
            }
            var num = 1.0 / len;
            this.x *= num;
            this.y *= num;
        }
        static Zero(): Vector2 {
            return new Vector2(0, 0);
        }
        static Copy(source: Vector2): Vector2 {
            return new Vector2(source.x, source.y);
        }
        static Normalize(vector: Vector2): Vector2 {
            var newVector = Vector2.Copy(vector);
            newVector.normalize();
            return newVector;
        }
        static Minimize(left: Vector2, right: Vector2): Vector2 {
            var x = (left.x < right.x) ? left.x : right.x;
            var y = (left.y < right.y) ? left.y : right.y;
            return new Vector2(x, y);
        }
        static Maximize(left: Vector2, right: Vector2): Vector2 {
            var x = (left.x > right.x) ? left.x : right.x;
            var y = (left.y > right.y) ? left.y : right.y;
            return new Vector2(x, y);
        }
        static Transform(vector: Vector2, transformation): Vector2 {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]);
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]);
            return new Vector2(x, y);
        }
        static Distance(value1: Vector2, value2: Vector2): number {
            return Math.sqrt(Vector2.DistanceSquared(value1, value2));
        }
        static DistanceSquared(value1: Vector2, value2: Vector2): number {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;
            return (x * x) + (y * y);
        }
    }

    export class Vector3 {
        x: number;
        y: number;
        z: number;

        constructor(initialX: number, initialY: number, initialZ: number) {
            this.x = initialX;
            this.y = initialY;
            this.z = initialZ;
        }

        public toString(): string {
            return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + "}";
        }
        public add(otherVector: Vector3): Vector3 {
            return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
        }
        public subtract(otherVector: Vector3): Vector3 {
            return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
        }
        public negate(): Vector3 {
            return new Vector3(-this.x, -this.y, -this.z);
        }
        public scale(scale: number): Vector3 {
            return new Vector3(this.x * scale, this.y * scale, this.z * scale);
        }
        public equals(otherVector: Vector3): boolean {
            return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
        }
        public multiply(otherVector: Vector3): Vector3 {
            return new Vector3(this.x * otherVector.x, this.y * otherVector.y, this.z * otherVector.z);
        }
        public divide(otherVector: Vector3): Vector3 {
            return new Vector3(this.x / otherVector.x, this.y / otherVector.y, this.z / otherVector.z);
        }
        public length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        public lengthSquared(): number {
            return (this.x * this.x + this.y * this.y + this.z * this.z);
        }
        public normalize(): void {
            var len = this.length();
            if (len === 0) {
                return;
            }
            var num = 1.0 / len;
            this.x *= num;
            this.y *= num;
            this.z *= num;
        }

        static FromArray(array, offset): Vector3 {
            if (!offset) {
                offset = 0;
            }
            return new Vector3(array[offset], array[offset + 1], array[offset + 2]);
        }
        static Zero(): Vector3 {
            return new Vector3(0, 0, 0);
        }
        static Up(): Vector3 {
            return new Vector3(0, 1.0, 0);
        }
        static Copy(source: Vector3): Vector3 {
            return new Vector3(source.x, source.y, source.z);
        }
        static TransformCoordinates(vector: Vector3, transformation): Vector3 {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]) + transformation.m[12];
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]) + transformation.m[13];
            var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]) + transformation.m[14];
            var w = (vector.x * transformation.m[3]) + (vector.y * transformation.m[7]) + (vector.z * transformation.m[11]) + transformation.m[15];
            return new Vector3(x / w, y / w, z / w);
        }
        static TransformNormal(vector: Vector3, transformation): Vector3 {
            var x = (vector.x * transformation.m[0]) + (vector.y * transformation.m[4]) + (vector.z * transformation.m[8]);
            var y = (vector.x * transformation.m[1]) + (vector.y * transformation.m[5]) + (vector.z * transformation.m[9]);
            var z = (vector.x * transformation.m[2]) + (vector.y * transformation.m[6]) + (vector.z * transformation.m[10]);
            return new Vector3(x, y, z);
        }
        public static Dot(left: Vector3, right: Vector3): number {
            return (left.x * right.x + left.y * right.y + left.z * right.z);
        }
        static Cross(left: Vector3, right: Vector3) {
            var x = left.y * right.z - left.z * right.y;
            var y = left.z * right.x - left.x * right.z;
            var z = left.x * right.y - left.y * right.x;
            return new Vector3(x, y, z);
        }
        static Normalize(vector: Vector3): Vector3 {
            var newVector = Vector3.Copy(vector);
            newVector.normalize();
            return newVector;
        }
        static Distance(value1: Vector3, value2: Vector3): number {
            return Math.sqrt(Vector3.DistanceSquared(value1, value2));
        }
        static DistanceSquared(value1: Vector3, value2: Vector3): number {
            var x = value1.x - value2.x;
            var y = value1.y - value2.y;
            var z = value1.z - value2.z;
            return (x * x) + (y * y) + (z * z);
        }
    }

    export class Matrix {
        m: any[];

        constructor() {
            this.m = [];
        }

        public isIdentity(): boolean {
            if (this.m[0] != 1.0 || this.m[5] != 1.0 || this.m[10] != 1.0 || this.m[15] != 1.0) {
                return false;
            }
            if (this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0 || this.m[4] != 0.0 || this.m[6] != 0.0 || this.m[7] != 0.0 || this.m[8] != 0.0 || this.m[9] != 0.0 || this.m[11] != 0.0 || this.m[12] != 0.0 || this.m[13] != 0.0 || this.m[14] != 0.0) {
                return false;
            }
            return true;
        }
        public determinant(): number {
            var temp1 = (this.m[10] * this.m[15]) - (this.m[11] * this.m[14]);
            var temp2 = (this.m[9] * this.m[15]) - (this.m[11] * this.m[13]);
            var temp3 = (this.m[9] * this.m[14]) - (this.m[10] * this.m[13]);
            var temp4 = (this.m[8] * this.m[15]) - (this.m[11] * this.m[12]);
            var temp5 = (this.m[8] * this.m[14]) - (this.m[10] * this.m[12]);
            var temp6 = (this.m[8] * this.m[13]) - (this.m[9] * this.m[12]);
            return ((((this.m[0] * (((this.m[5] * temp1) - (this.m[6] * temp2)) + (this.m[7] * temp3))) - (this.m[1] * (((this.m[4] * temp1) - (this.m[6] * temp4)) + (this.m[7] * temp5)))) + (this.m[2] * (((this.m[4] * temp2) - (this.m[5] * temp4)) + (this.m[7] * temp6)))) - (this.m[3] * (((this.m[4] * temp3) - (this.m[5] * temp5)) + (this.m[6] * temp6))));
        }
        public toArray(): any[] {
            return this.m;
        }
        public invert(): void {
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
        }
        public multiply(other: Matrix): Matrix {
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
        }
        public equals(value: Matrix): boolean {
            return (this.m[0] === value.m[0] && this.m[1] === value.m[1] && this.m[2] === value.m[2] && this.m[3] === value.m[3] && this.m[4] === value.m[4] && this.m[5] === value.m[5] && this.m[6] === value.m[6] && this.m[7] === value.m[7] && this.m[8] === value.m[8] && this.m[9] === value.m[9] && this.m[10] === value.m[10] && this.m[11] === value.m[11] && this.m[12] === value.m[12] && this.m[13] === value.m[13] && this.m[14] === value.m[14] && this.m[15] === value.m[15]);
        }
        static FromValues(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number): Matrix {
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
        }
        static Identity(): Matrix {
            return Matrix.FromValues(1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 1.0);
        }
        static Zero(): Matrix {
            return Matrix.FromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        static Copy(source: Matrix): Matrix {
            return Matrix.FromValues(source.m[0], source.m[1], source.m[2], source.m[3], source.m[4], source.m[5], source.m[6], source.m[7], source.m[8], source.m[9], source.m[10], source.m[11], source.m[12], source.m[13], source.m[14], source.m[15]);
        }
        static RotationX(angle: number): Matrix {
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
        }
        static RotationY(angle: number): Matrix {
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
        }
        static RotationZ(angle: number): Matrix {
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
        }
        static RotationAxis(axis: Vector3, angle: number): Matrix {
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
        }
        static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix {
            return Matrix.RotationZ(roll).multiply(Matrix.RotationX(pitch)).multiply(Matrix.RotationY(yaw));
        }
        static Scaling(x: number, y: number, z: number): Matrix {
            var result = Matrix.Zero();
            result.m[0] = x;
            result.m[5] = y;
            result.m[10] = z;
            result.m[15] = 1.0;
            return result;
        }
        static Translation(x: number, y: number, z: number): Matrix {
            var result = Matrix.Identity();
            result.m[12] = x;
            result.m[13] = y;
            result.m[14] = z;
            return result;
        }
        static LookAtLH(eye: Vector3, target: Vector3, up: Vector3): Matrix {
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
        }
        static PerspectiveLH(width: number, height: number, znear: number, zfar: number): Matrix {
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
        }
        static PerspectiveFovLH(fov: number, aspect: number, znear: number, zfar: number): Matrix {
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
        }
        static Transpose(matrix: Matrix): Matrix {
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
        }
    }
}
class GraphicOutput {
    
    public get_width(): number { throw new Error("Abstract method.");}

    public get_height(): number { throw new Error("Abstract method."); }

    public get_buffer(): number[] { throw new Error("Abstract method."); }

    public drawBuffer() { throw new Error("Abstract method."); }

    public drawText(text: string, x: number, y: number, color: string = "ffffff", size: number = 30, font: string = "Verdana") { throw new Error("Abstract method."); }
}
class HtmlCanvasOutput extends GraphicOutput {
    
    private canvasContext: CanvasRenderingContext2D;
    private outputBuffer: ImageData;

    constructor(canvasId: string) {
        super();
        var canvas = <HTMLCanvasElement> document.getElementById(canvasId);
        this.canvasContext = canvas.getContext("2d");
        this.outputBuffer = this.canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    }

    public get_width() { return this.canvasContext.canvas.width; }

    public get_height() { return this.canvasContext.canvas.height; }

    public get_buffer(): number[] { return this.outputBuffer.data; }

    public drawBuffer() {
        this.canvasContext.putImageData(this.outputBuffer, 0, 0);
    }

    public drawText(text: string, x: number, y: number, color: string = "ffffff", size: number = 20, font: string = "Verdana") {
        this.canvasContext.font = size + "px " + font;
        this.canvasContext.fillStyle = "#" + color;
        this.canvasContext.fillText(text, x, y);
    }
} 
class Figure {
    public size: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public projectedSize:BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public position: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public projectedPosition: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public rotation: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    public color: BABYLON.Color4 = new BABYLON.Color4(0, 0, 0, 0);
}

class Circle extends Figure {

    public get_diameter(): number { return this.size.x; }
    public set_diameter(d: number) { this.size.x = d; }
    public get_projectedDiameter(): number { return this.projectedSize.x; }

    public get_radius(): number { return this.get_diameter() / 2.0; }
    public set_radius(r: number) { this.set_diameter(r * 2); }
    public get_square() { return this.get_radius() * this.get_radius() * Math.PI; }
    public get_projectedRadius(): number { return this.get_projectedDiameter() / 2.0; }
}
interface Vertex {
    normal: BABYLON.Vector3;
    coordinates: BABYLON.Vector3;
    worldCoordinates?: BABYLON.Vector3;
    textureCoordinates?: BABYLON.Vector2;
}
interface Face {
    a: number;
    b: number;
    c: number;
} 
interface Material {
    Name?: string;
    ID?: number;
    DiffuseTextureName?: number;
}
class Texture {
    width: number;
    height: number;
    internalBuffer: ImageData;

    // Working with a fix sized texture (512x512, 1024x1024, etc.).
    constructor(filename: string, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.load(filename);
    }

    public load(filename: string): void {
        var imageTexture = new Image();
        imageTexture.height = this.height;
        imageTexture.width = this.width;
        imageTexture.onload = () => {
            var internalCanvas: HTMLCanvasElement = document.createElement("canvas");
            internalCanvas.width = this.width;
            internalCanvas.height = this.height;
            var internalContext: CanvasRenderingContext2D = internalCanvas.getContext("2d");
            internalContext.drawImage(imageTexture, 0, 0);
            this.internalBuffer = internalContext.getImageData(0, 0, this.width, this.height);
        };
        imageTexture.src = filename;
    }

    // Takes the U & V coordinates exported by Blender
    // and return the corresponding pixel color in the texture
    public map(tu: number, tv: number): BABYLON.Color4 {
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
        // Image is not loaded yet
        else {
            return new BABYLON.Color4(1, 1, 1, 1);
        }
    }
}
class Mesh extends Figure {
    vertices: Vertex[];
    projectedVertices: Vertex[];
    faces: Face[];
    texture: Texture;

    constructor(verticesCount: number, facesCount: number) {
        super();
        this.vertices = new Array(verticesCount);
        this.projectedVertices = new Array(verticesCount);
        this.faces = new Array(facesCount);
    }
}
// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx

class MeshLoader {

    public static loadFromJsonFileAsync(fileName: string, callback: (result: Mesh[]) => any): void {
        var jsonObject = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", fileName, true);
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                jsonObject = JSON.parse(xmlhttp.responseText);
                callback(this.createMeshesFromJSON(jsonObject));
            }
        };
        xmlhttp.send(null);
    }

    private static createMeshesFromJSON(jsonObject): Mesh[] {
        var meshes: Mesh[] = [];
        var materials: Material[] = [];

        for (var materialIndex = 0; materialIndex < jsonObject.materials.length; materialIndex++) {
            var material: Material = {};

            material.Name = jsonObject.materials[materialIndex].name;
            material.ID = jsonObject.materials[materialIndex].id;
            if (jsonObject.materials[materialIndex].diffuseTexture)
                material.DiffuseTextureName = jsonObject.materials[materialIndex].diffuseTexture.name;

            materials[material.ID] = material;
        }

        for (var meshIndex = 0; meshIndex < jsonObject.meshes.length; meshIndex++) {
            var verticesArray: number[] = jsonObject.meshes[meshIndex].vertices;
            // Faces
            var indicesArray: number[] = jsonObject.meshes[meshIndex].indices;

            var uvCount: number = jsonObject.meshes[meshIndex].uvCount;
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
            var position = jsonObject.meshes[meshIndex].position;
            mesh.position = new BABYLON.Vector3(position[0], position[1], position[2]);

            if (uvCount > 0) {
                var meshTextureID = jsonObject.meshes[meshIndex].materialId;
                var meshTextureName = materials[meshTextureID].DiffuseTextureName;
                mesh.texture = new Texture(meshTextureName.toString(), 512, 512);
            }

            meshes.push(mesh);
        }
        return meshes;
    }
} 
class Camera {
    public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 200);
    public direction: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    public up: BABYLON.Vector3 = BABYLON.Vector3.Up();
    public fov: number = 0.78;
    public zNear: number = 0.01;
    public zFar: number = 1.0;
}
 class Scene {
     public figures: Figure[] = [];
     public camera: Camera = new Camera();
 }
class RendererOutput {
    
    public colorBuffer: number[];
    public depthBuffer: number[];
    public width: number;
    public height: number;

    constructor(colorBuffer: number[], w: number, h: number) {
        this.colorBuffer = colorBuffer;
        this.width = w;
        this.height = h;
        this.depthBuffer = new Array(w * h);
        this.clear();
    }

    public clear() {
        for (var i = 0; i < this.depthBuffer.length; i++) {
            var i4: number = i * 4;
            this.colorBuffer[i4] = this.colorBuffer[i4 + 1] = this.colorBuffer[i4 + 2]   = 0;
            this.colorBuffer[i4 + 3] = 1;
            this.depthBuffer[i] = 10000000; // Max possible value 
        }
    }
}
class Renderer {
    public output: RendererOutput;

    constructor(output: RendererOutput) {
        this.output = output;
    }
}
class Renderer2d extends Renderer {

    constructor(output: RendererOutput) {
        super(output);
    }

    public drawPoint(x: number, y: number, z: number, color: BABYLON.Color4): void {

        if (x >= 0 && y >= 0 && x < this.output.width && y < this.output.height) {

            var index: number = ((x >> 0) + (y >> 0) * this.output.width);

            if (this.output.depthBuffer[index] >= z) {
                this.output.depthBuffer[index] = z;

                var index4: number = index * 4;
                this.output.colorBuffer[index4] = color.r * 255;
                this.output.colorBuffer[index4 + 1] = color.g * 255;
                this.output.colorBuffer[index4 + 2] = color.b * 255;
                this.output.colorBuffer[index4 + 3] = color.a * 255;
            }
        }
    }

    public drawLine(x0: number, y0: number, x1: number, y1, z: number, c: BABYLON.Color4): void {
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

            if ((x0 == x1) && (y0 == y1)) break;
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
    }

    public drawCircle(x: number, y: number, z: number, radius: number, color: BABYLON.Color4) {
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
    }

    public drawFilledCircle(cx: number, cy: number, z: number, radius: number, color: BABYLON.Color4) {
        for (var y = -radius; y <= radius; y++)
            for (var x = -radius; x <= radius; x++)
                if (x * x + y * y <= radius * radius)
                    this.drawPoint(cx + x, cy + y, z, color);
    }
}
// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx

class Renderer3d extends Renderer {

    public renderer2d: Renderer2d;

    constructor(output: RendererOutput) {
        super(output);
        this.renderer2d = new Renderer2d(output);
    }

    public projectScene(scene: Scene) {

        var viewMatrix = BABYLON.Matrix.LookAtLH(scene.camera.position, scene.camera.direction, scene.camera.up);
        var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(scene.camera.fov, this.output.width / this.output.height,
            scene.camera.zNear, scene.camera.zFar);

        for (var i = 0; i < scene.figures.length; i++) {
            var f = scene.figures[i];

            var worldMatrix = BABYLON.Matrix.RotationYawPitchRoll(
                f.rotation.y, f.rotation.x, f.rotation.z)
                .multiply(BABYLON.Matrix.Translation(
                f.position.x, f.position.y, f.position.z));

            var transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
            this.projectFigure(f, worldMatrix, transformMatrix);
        }
    }

    private projectVector(v: BABYLON.Vector3, transMat: BABYLON.Matrix): BABYLON.Vector3 {

        var point = BABYLON.Vector3.TransformCoordinates(v, transMat);
        var x = point.x * this.output.width + this.output.width / 2.0;
        var y = -point.y * this.output.height + this.output.height / 2.0;
        return (new BABYLON.Vector3(x, y, point.z));
    }

    private projectVertex(vertex: Vertex, transMat: BABYLON.Matrix, worldMat: BABYLON.Matrix): Vertex {

        var point3DWorld = BABYLON.Vector3.TransformCoordinates(vertex.coordinates, worldMat);
        var normal3DWorld = BABYLON.Vector3.TransformCoordinates(vertex.normal, worldMat);
        var coord = this.projectVector(vertex.coordinates, transMat);

        return ({
            coordinates: coord,
            normal: normal3DWorld,
            worldCoordinates: point3DWorld,
            textureCoordinates: vertex.textureCoordinates
        });
    }

    private projectFigure(f: Figure, worldMatrix: BABYLON.Matrix, transformMatrix: BABYLON.Matrix) {

        f.projectedPosition = this.projectVector(f.position, transformMatrix);
        var left = f.position.subtract(f.size);
        var right = f.position.add(f.size);
        var projectedSizeX = (this.projectVector(left, transformMatrix).x - this.projectVector(right, transformMatrix).x);
        f.projectedSize.x = projectedSizeX;

        if (f instanceof Mesh) {
            this.projectMesh(<Mesh>f, worldMatrix, transformMatrix);
        }
    }

    private projectMesh(m: Mesh, worldMatrix: BABYLON.Matrix, transformMatrix: BABYLON.Matrix) {

        for (var indexFaces = 0; indexFaces < m.faces.length; indexFaces++) {
            var currentFace = m.faces[indexFaces];
            var vertexA = m.vertices[currentFace.a];
            var vertexB = m.vertices[currentFace.b];
            var vertexC = m.vertices[currentFace.c];

            m.projectedVertices[currentFace.a] = this.projectVertex(vertexA, transformMatrix, worldMatrix);
            m.projectedVertices[currentFace.b] = this.projectVertex(vertexB, transformMatrix, worldMatrix);
            m.projectedVertices[currentFace.c] = this.projectVertex(vertexC, transformMatrix, worldMatrix);            
        }
    }

    public drawScene(scene: Scene) {

        this.projectScene(scene);

        for (var i = 0; i < scene.figures.length; i++) {
            this.drawFigure(scene.figures[i]);
        } 
    }

    public drawFigure(f: Figure) {
        if (f instanceof Circle) {
            this.drawCircle(<Circle>f);
        }
        else if (f instanceof Mesh) {
            this.drawMesh(<Mesh>f);
        }
    }

    private drawCircle(circle: Circle) {
        this.renderer2d.drawFilledCircle(circle.projectedPosition.x, circle.projectedPosition.y, circle.projectedPosition.z, circle.get_projectedRadius(), circle.color);
    }

    private drawMesh(m: Mesh) {
        for (var indexFaces = 0; indexFaces < m.faces.length; indexFaces++) {
            var currentFace = m.faces[indexFaces];

            var va = m.projectedVertices[currentFace.a];
            var vb = m.projectedVertices[currentFace.b];
            var vc = m.projectedVertices[currentFace.c];

            var color = 1.0;
            this.drawTriangle(va, vb, vc, new BABYLON.Color4(color, color, color, 1), m.texture);
        }
    }

    public drawTriangle(v1: Vertex, v2: Vertex, v3: Vertex, color: BABYLON.Color4, texture?: Texture): void {
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

        // Light position
        var lightPos = new BABYLON.Vector3(0, 10, 10); 
        // computing the cos of the angle between the light vector and the normal vector
        // it will return a value between 0 and 1 that will be used as the intensity of the color
        //var ndotl = this.computeNDotL(centerPoint, vnFace, lightPos);
        var nl1 = this.computeNDotL(v1.worldCoordinates, v1.normal, lightPos);
        var nl2 = this.computeNDotL(v2.worldCoordinates, v2.normal, lightPos);
        var nl3 = this.computeNDotL(v3.worldCoordinates, v3.normal, lightPos);

        var data: ScanLineData = {};

        // computing lines' directions
        var dP1P2: number; var dP1P3: number;

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
            for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
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
            for (var y = p1.y >> 0; y <= p3.y >> 0; y++) {
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
    }

    private clamp(value: number, min: number = 0, max: number = 1): number {
        return Math.max(min, Math.min(value, max));
    }

    private interpolate(min: number, max: number, gradient: number): number {
        return min + (max - min) * this.clamp(gradient);
    }

    // drawing line between 2 points from left to right
    // papb -> pcpd
    // pa, pb, pc, pd must then be sorted before
    private processScanLine(data: ScanLineData, va: Vertex, vb: Vertex, vc: Vertex, vd: Vertex, color: BABYLON.Color4, texture?: Texture): void {
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
        var z1: number = this.interpolate(pa.z, pb.z, gradient1);
        var z2: number = this.interpolate(pc.z, pd.z, gradient2);

        // Interpolating normals on Y
        var snl = this.interpolate(data.ndotla, data.ndotlb, gradient1);
        var enl = this.interpolate(data.ndotlc, data.ndotld, gradient2);

        // Interpolating texture coordinates on Y
        var su = this.interpolate(data.ua, data.ub, gradient1);
        var eu = this.interpolate(data.uc, data.ud, gradient2);
        var sv = this.interpolate(data.va, data.vb, gradient1);
        var ev = this.interpolate(data.vc, data.vd, gradient2);

        // drawing a line from left (sx) to right (ex) 
        for (var x = sx; x < ex; x++) {
            var gradient: number = (x - sx) / (ex - sx);

            // Interpolating Z, normal and texture coordinates on X
            var z = this.interpolate(z1, z2, gradient);
            var ndotl = this.interpolate(snl, enl, gradient);
            var u = this.interpolate(su, eu, gradient);
            var v = this.interpolate(sv, ev, gradient);

            var textureColor;

            if (texture)
                textureColor = texture.map(u, v);
            else
                textureColor = new BABYLON.Color4(1, 1, 1, 1);

            // changing the native color value using the cosine of the angle
            // between the light vector and the normal vector
            // and the texture color
            this.renderer2d.drawPoint(x, data.currentY, z,
                new BABYLON.Color4(color.r * ndotl * textureColor.r,
                    color.g * ndotl * textureColor.g,
                    color.b * ndotl * textureColor.b, 1));
        }
    }

    // Compute the cosine of the angle between the light vector and the normal vector
    // Returns a value between 0 and 1
    private computeNDotL(vertex: BABYLON.Vector3, normal: BABYLON.Vector3,
        lightPosition: BABYLON.Vector3): number {
        var lightDirection = lightPosition.subtract(vertex);

        normal.normalize();
        lightDirection.normalize();

        return Math.max(0, BABYLON.Vector3.Dot(normal, lightDirection));
    }
}
class Phisics {

    public applyTime(scene: Scene, ticks:number = 1) {
        
    }

    public detectCollision(scene: Scene, figure: Figure): Figure[] {
        var collidedWith = [];
        for (var i = 0; i < scene.figures.length; i++) {
            var f = scene.figures[i];
            if (f != figure && f.position.z == figure.position.z) {
                if (f instanceof Circle && figure instanceof Circle) {
                    var c1 = <Circle>f;
                    var c2 = <Circle>figure;
                    if (this.areCirclesCollided(c1, c2))
                        collidedWith.push(f);
                }
            }

        }

        return collidedWith;
    }

    private areCirclesCollided(c1: Circle, c2: Circle): boolean {
        var xd = c1.position.x - c2.position.x;
        var yd = c1.position.y - c2.position.y;
        var rs = c1.get_radius() + c2.get_radius();
        return xd * xd + yd * yd <= rs * rs;
    }
} 
class AbstractEventArgs {
}

class AbstractEvent<EventArgsT> {
    protected handlers: {(EventArgsT): void; }[] = [];

    public addHandler(handler: (args: EventArgsT) => void) {
        this.handlers.push(handler);
    }

    public removeHandler(handler: (args: EventArgsT) => void) {
        var index = this.handlers.indexOf(handler);
        if (index > -1) {
            this.handlers.splice(index, 1);
        }
    }

    public raise(args: EventArgsT) {
        for (var i = 0; i < this.handlers.length; i++) {
            this.handlers[i](args);
        }
    }
}
interface ScanLineData {
    currentY?: number;
    ndotla?: number;
    ndotlb?: number;
    ndotlc?: number;
    ndotld?: number;

    ua?: number;
    ub?: number;
    uc?: number;
    ud?: number;

    va?: number;
    vb?: number;
    vc?: number;
    vd?: number;
}
class InputDeviceEventArgs extends AbstractEventArgs {
}

class InputDevice<InputDeviceEventArgsT> {
    public inputEvent: AbstractEvent<InputDeviceEventArgsT> = new AbstractEvent<InputDeviceEventArgsT>();
}
class MouseEventArgs extends InputDeviceEventArgs {
    public leftButtonClicked: boolean;
    public x: number;
    public y: number;
    public deltaX: number;
    public deltaY: number;
    public wheelDelta: number = 0;
}

class Mouse extends InputDevice<MouseEventArgs> {
}
class HtmlMouse extends Mouse {

    private prevArgs: MouseEventArgs;

    constructor(elementId: string) {
        super();
        var elem = document.getElementById(elementId);

        elem.addEventListener('mousemove', e => {
            this.fromBrowserEventArgs(e, 'mousemove');
        });

        elem.addEventListener('click', e => {
             
            this.fromBrowserEventArgs(e, 'click');
        });

        elem.addEventListener('wheel', e => {
            this.fromBrowserEventArgs(e, 'wheel');
        });
    }

    private fromBrowserEventArgs(e: Event, eventName: string) {
        var evt = <any>e;
        
        var args = new MouseEventArgs();

        if (eventName == "click") {
            args.leftButtonClicked = true;
        }
        else if (eventName == "mousemove") {
            args.leftButtonClicked = evt.buttons == 1;
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
    }
}
class KeyboardEventArgs extends InputDeviceEventArgs {
    public pressedKey: number;

    constructor(pressedKey: number) {
        super();
        this.pressedKey = pressedKey;
    }
}

class Keyboard extends InputDevice<KeyboardEventArgs> {
}
class HtmlKeyboard extends Keyboard {

    constructor() {
        super();
        window.addEventListener("keydown",(e) => this.inputEvent.raise(new KeyboardEventArgs(e.keyCode)), true);
    }
}
class InputDevices {
    public keyboard: Keyboard;
    public mouse: Mouse;
}

class App {
    
    private graphicOutput: GraphicOutput;
    private renderer: Renderer;
    private scene: Scene;
    private phisics: Phisics;
    private inputDevices: InputDevices;

    private previousFrameTime: number;

    constructor(graphicOutput: GraphicOutput, inputDevices: InputDevices) {
        this.graphicOutput = graphicOutput;
        this.phisics = new Phisics();
        this.inputDevices = inputDevices;
    }

    start() {
        this.createScene((scene) => {
            this.scene = scene;
            this.renderer = this.createRenderer(this.graphicOutput);

            requestAnimationFrame(() => this.appLoop());

            if (this.inputDevices.keyboard != null)
                this.inputDevices.keyboard.inputEvent.addHandler(args => this.handleKeyboardEvent(args, this.scene));

            if (this.inputDevices.mouse != null)
                this.inputDevices.mouse.inputEvent.addHandler(args => this.handleMouseEvent(args, this.scene));
        });
    }

    private appLoop() {

        var now = new Date().getTime();
        var fps = 1000.0 / (now - this.previousFrameTime) >> 0;
        this.previousFrameTime = now;
        
        this.processScene(this.scene, this.phisics);
        this.drawFrame(this.graphicOutput, this.scene, this.renderer);
        this.drawFps(this.graphicOutput, fps);
        requestAnimationFrame(() => this.appLoop());
    }

    protected createScene(continuation: (scene: Scene)=> void) {
        continuation(new Scene());    
    }

    protected processScene(scene: Scene, phisics: Phisics) {
    }

    protected createRenderer(graphicOutput: GraphicOutput) : Renderer {
        var renderOutput = new RendererOutput(graphicOutput.get_buffer(), graphicOutput.get_width(), graphicOutput.get_height());
        return new Renderer3d(renderOutput);
    }

    protected drawFrame(graphicOutput: GraphicOutput, scene: Scene, renderer: Renderer) {
        renderer.output.clear();
        (<Renderer3d>renderer).drawScene(this.scene);
        graphicOutput.drawBuffer();
    }

    private drawFps(graphicalOutput: GraphicOutput, fps: number) {
        debugger
        graphicalOutput.drawText(fps.toString(), 10, 25);
    }

    protected handleKeyboardEvent(eventArgs: KeyboardEventArgs, scene: Scene) {
    }

    protected handleMouseEvent(eventArgs: MouseEventArgs, scene: Scene) {
    }
}
