class Bubble extends Circle {

    public static canBeAbsorbedColor: BABYLON.Color4 = new BABYLON.Color4(0, 0, 1, 1);
    public static canDamageColor: BABYLON.Color4 = new BABYLON.Color4(1, 0, 1, 1);
    public static canAnnihilateColor: BABYLON.Color4 = new BABYLON.Color4(1, 0, 0, 1);

    public nextVelocity: BABYLON.Vector3 = BABYLON.Vector3.zero();
    
    public canAbsorb(b: Bubble) {
        var r1 = this.radius;
        var r2 = b.radius;
        return r1 * r1 > 2 * r2 * r2;
    }

    public canDamage(b: Bubble) {
        var r1 = this.radius;
        var r2 = b.radius;
        return r1 * r1 > r2 * r2;
    }

    public absorb(b: Bubble, amount: number) {
        var diff = Bubble.subtract(b, amount);
        var r = Math.sqrt((this.get_square() + diff) / Math.PI);
        this.radius = r;
    }

    public annihilate(b: Bubble, amount: number) {
        var b1: Bubble;
        var b2: Bubble;
        if (this.radius >= b.radius) {
            b1 = this;
            b2 = b;
        } else {
            b1 = b;
            b2 = this;
        }
        var diff = Bubble.subtract(b2, amount);
        var r = Math.sqrt((b1.get_square() - diff) / Math.PI);
        b1.radius = r;
    }

    private static subtract(b: Bubble, amount: number): number {
        var r = b.radius - amount;
        var s = b.get_square();
        b.radius = r;
        return s - b.get_square();
    }

    public isAnnihilated() {
        return this.radius <= 0;
    }
} 