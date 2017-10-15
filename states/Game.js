function Game(grid, randomed) {

   this.grid = grid;
   this.selects = randomed;

   this.point = 0;

   this.selectedAnimation = null;
   this.selectedRectangle = null;

   this.input = function(event) {
      if(event.which == 1) {
         var rect = CANVAS.getBoundingClientRect();
         if(this.grid[this.selects[this.point].x][this.selects[this.point].y].isIntersect(new Vector2d(event.clientX - rect.left, event.clientY - rect.top)))
         {
            this.selectedRectangle = new Rectangle(this.grid[this.selects[this.point].x][this.selects[this.point].y].getPosition().x,
                                                   this.grid[this.selects[this.point].x][this.selects[this.point].y].getPosition().y, CELL_SIZE.x, CELL_SIZE.y, new Color(COLORS.second), 5);

            this.selectedRectangle.parent = this.grid[this.selects[this.point].x][this.selects[this.point].y].parent;

            this.selectedAnimation = new Transition({
               target: this.selectedRectangle.color,
               property: "a",
               start: 1.0,
               end: 0,
               velocity: -0.001,
               acceleration: -0.00015
            });

            if(this.point != this.selects.length - 1)
               this.point ++;
            else
            {
               this.selectedRectangle.draw();
               state = new Win(this.selects.length + 1);
            }
         }
         else
            state = new Over();
      }
   }

   this.update = function() {
      if(this.selectedAnimation != null) {

         this.selectedAnimation.update();

         if(this.selectedAnimation.done) {
            this.selectedAnimation = null;
            this.selectedRectangle = null;
         }
      }
   }

   this.draw = function() {
      for(var i=0; i<this.grid.length; i++) {
         for(var j=0; j<this.grid[i].length; j++)
            this.grid[i][j].draw();
      }

      if(this.selectedRectangle != null)
         this.selectedRectangle.draw();
   }
}
