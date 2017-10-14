function Path(level) {
   this.level = level;
   this.randomed = [];

   //Set position for grid to fit center
   this.position = new Vector2d(WIDTH/2 - ((GRID.x/2 - 0.5) * CELL_SIZE.x) - ((GRID.x/2 - 0.5) * CELL_SPACE),
                                HEIGHT/2 - ((GRID.x/2 - 0.5) * CELL_SIZE.y) - ((GRID.y/2 - 0.5) * CELL_SPACE));

   this.grid = new Array(GRID.x);

   //Create empty grid
   for(var i=0; i<this.grid.length; i++) {
      this.grid[i] = new Array(GRID.y);

      for(var j=0; j<this.grid[i].length; j++)
         this.grid[i][j] = new Rectangle(0 + i*(CELL_SIZE.x + CELL_SPACE), 0 + j*(CELL_SIZE.y + CELL_SPACE), CELL_SIZE.x, CELL_SIZE.y, new Color(COLORS.first), 3);
   }

   //Set grid relative position
   for(var i=0; i<this.grid.length; i++) {
      for(var j=0; j<this.grid[i].length; j++)
         this.grid[i][j].parent = this;
   }

   this.randomizingAnimation = null;
   this.randomizingRectangle = null;

   this.input = function(event) {

   }

   this.update = function() {
      if(this.randomed.length < this.level && this.randomizingAnimation == null) {

         var selected = [];

         while(true) {
            var repeated = false;
            selected = new Vector2d(Math.floor(Math.random() * GRID.x), Math.floor(Math.random() * GRID.y));

            for(var i=0; i<this.randomed.length; i++) {
               if(this.randomed[i].equal(selected))
                  repeated = true;
            }

            if(!repeated)
               break;
         }

         this.randomizingRectangle = new Rectangle(this.grid[selected.x][selected.y].getPosition().x,
                                                   this.grid[selected.x][selected.y].getPosition().y, CELL_SIZE.x, CELL_SIZE.y, new Color(COLORS.third), 5);

         this.randomizingRectangle.parent = this;

         this.randomizingAnimation = new Transition({
            target: this.randomizingRectangle.color,
            property: "a",
            start: 1.0,
            end: 0,
            velocity: -0.001,
            acceleration: -0.00015
         });

         this.randomed.push(selected);
      }
      else if(this.randomizingAnimation != null) {
         this.randomizingAnimation.update();

         if(this.randomizingAnimation.done)
            this.randomizingAnimation = null;
      }
      else
         state = new Show(this.grid, this.randomed);
   }

   this.draw = function() {
      for(var i=0; i<this.grid.length; i++) {
         for(var j=0; j<this.grid[i].length; j++)
            this.grid[i][j].draw();
      }

      if(this.randomizingRectangle != null)
         this.randomizingRectangle.draw();
   }
}
