class Bubble extends Circle {

    public static canBeAbsorbedColor: BABYLON.Color4 = new BABYLON.Color4(0, 0, 1, 1);
    public static canDamageColor: BABYLON.Color4 = new BABYLON.Color4(1, 0, 1, 1);
    public static canAnnihilateColor: BABYLON.Color4 = new BABYLON.Color4(1, 0, 0, 1);

    public moveVector: BABYLON.Vector2 = new BABYLON.Vector2(0, 0);

    public canAbsorb(b: Bubble) {
        var r1 = this.get_radius();
        var r2 = b.get_radius();
        return r1 * r1 > 2 * r2 * r2;
    }

    public canDamage(b: Bubble) {
        var r1 = this.get_radius();
        var r2 = b.get_radius();
        return r1 * r1 > r2 * r2;
    }

    public absorb(b: Bubble, amount: number) {
        var diff = Bubble.subtract(b, amount);
        var r = Math.sqrt((this.get_square() + diff) / Math.PI);
        this.set_radius(r);
    }

    public annihilate(b: Bubble, amount: number) {
        var b1, b2;
        if (this.get_diameter() >= b.get_diameter()) {
            b1 = this;
            b2 = b;
        } else {
            b1 = b;
            b2 = this;
        }
        var diff = Bubble.subtract(b2, amount);
        var r = Math.sqrt((b1.get_square() - diff) / Math.PI);
        b1.set_radius(r);
    }

    private static subtract(b: Bubble, amount: number): number {
        var r = b.get_radius() - amount;
        var s = b.get_square();
        b.set_radius(r);
        return s - b.get_square();
    }

    public isAnnihilated() {
        return this.get_radius() <= 0;
    }
} 