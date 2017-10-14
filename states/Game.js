function Game(grid, randomed) {

   this.grid = grid;
   this.selects = randomed;

   this.input = function(event) {
      if(event.which == 1) {
         if()
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
