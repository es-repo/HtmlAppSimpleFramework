 class Scene {
     public figures: Figure[] = [];
     public camera: Camera = new Camera();
     public light = new Light();

     private ticks: number = 0;

     public tick() {
         this.ticks++;
         for (var i = 0; i < this.figures.length; i++)
             this.figures[i].onSceneTick(this.ticks);
     }
 }