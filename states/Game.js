function Game(grid, randomed) {

   this.grid = grid;
   this.selects = randomed;

   this.point = 0;

   this.input = function(event) {
      if(event.which == 1) {
         var rect = CANVAS.getBoundingClientRect();
         if(this.grid[this.selects[this.point].x][this.selects[this.point].y].isIntersect(new Vector2d(event.clientX - rect.left, event.clientY - rect.top)))
         {
            alert("POINT");

            if(this.point != this.selects.length - 1)
               this.point ++;
            else
               state = new Win(this.selects.length + 1);
         }
         else
            state = new Over();
      }
   }

   this.update = function() {

   }

   this.draw = function() {
      for(var i=0; i<this.grid.length; i++) {
         for(var j=0; j<this.grid[i].length; j++)
            this.grid[i][j].draw();
      }
   }
}
