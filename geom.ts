module Geom {

    export class Rectangle {

        public static isPointInside(x: number, y: number, rx: number, ry: number, rw: number, rh: number): boolean {

            return x >= rx && x <= (rx + rw) && y >= ry && y <= (ry + rh);            
        }        

        public static isIntersected(rx1: number, ry1: number, rw1: number, rh1: number,
            rx2: number, ry2: number, rw2: number, rh2: number): boolean {

            var intersectedByX = (rx2 >= rx1 && rx2 <= rx1 + rw1) || (rx1 >= rx2 && rx1 <= rx2 + rw2);
            var intersectedByY = (ry2 >= ry1 && ry2 <= ry1 + rh1) || (ry1 >= ry2 && ry1 <= ry2 + rh2);
            return intersectedByX && intersectedByY;         
        }
    }
}