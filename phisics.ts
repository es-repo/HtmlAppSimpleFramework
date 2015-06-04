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