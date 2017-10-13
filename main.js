(function main(){

   CANVAS = document.getElementById('screen');
   CONTEXT = CANVAS.getContext('2d');

   WIDTH = CANVAS.width;
   HEIGHT = CANVAS.height;

   FONT_NAME = "Arial";
   FONT_SIZE = 24;

   CONTEXT.font = FONT_SIZE.toString() + "px " + FONT_NAME;
   CONTEXT.textAlign = "center";

   const FPS = 60;

   KEYS = {
      "space": 32
   }

   COLORS = {
      "background": {r: 23,  g: 18,  b: 25},
      "first":      {r: 34,  g: 85,  b: 96},
      "second":     {r: 237, g: 240, b: 96},
      "third":      {r: 240, g: 128, b: 60},
      "forth":      {r: 49,  g: 13,  b: 32}
   }

   GRID = new Vector2d(6, 6);
   CELL_SIZE = new Vector2d(50, 50);
   CELL_SPACE = 5;

   state = new Introduction();

   document.addEventListener("keyup", function(event) {
      state.input(event);
   });

   setInterval(function step() {
      //state.input();
      state.update();
      CONTEXT.fillStyle = new Color(COLORS.background).toString();
      CONTEXT.fillRect(0, 0, WIDTH, HEIGHT);
      state.draw();
   }, 1000/FPS);

})();

function Introduction() {

   //game name label
   this.nameLabel = new Label(new Vector2d(WIDTH/2, HEIGHT/2), new Rectangle(0, 0, 140, 60, new Color(COLORS.first), 3),
                               new Text(0, 0, "Memorize", new Color(COLORS.second)));
   //game start label
   this.startLabel = new Label(new Vector2d(WIDTH/2, HEIGHT/1.5), new Rectangle(0, 0, 200, 60, new Color(COLORS.first), 3),
                               new Text(0, 0, "Press any key", new Color(COLORS.second)));

   this.nameLabelAnimation = new Transition({
      target: this.nameLabel.position,
      property: "y",
      start: 0,
      end: HEIGHT/2,
      velocity: .3,
      acceleration: .05
   });

   //this.gameStartAnimation = new Transition(0.0, 1.0, .0001, .00015);
   this.nameLabelRectangleAnimation = new Transition({
      target: this.startLabel.rectangle.color,
      property: "a",
      start: 0,
      end: 1.0,
      velocity: .0001,
      acceleration: .00015,
      loop: true
   });

   this.nameLabelTextAnimation = new Transition({
      target: this.startLabel.text.color,
      property: "a",
      start: 0,
      end: 1.0,
      velocity: .0001,
      acceleration: .00015
   });

   this.input = function(event) {
      if(event.keyCode == KEYS.space) {
         state = new Path();
      }
   }

   this.update = function() {
      this.nameLabelAnimation.update();
      this.nameLabelRectangleAnimation.update();
      this.nameLabelTextAnimation.update();
   }

   this.draw = function() {
      this.nameLabel.draw();
      this.startLabel.draw();
   }
}

function Generation() {
   //game name label
   this.generateLabel = new Label(new Vector2d(WIDTH/2, HEIGHT/2), new Rectangle(0, 0, 140, 60, new Color(COLORS.first), 3),
                               new Text(0, 0, "Generating", new Color(COLORS.second)));

   this.generateLabelAnimation = new Transition({
      target: this.generateLabel.position,
      property: "y",
      start: 0,
      end: HEIGHT/2,
      velocity: .3,
      acceleration: .05
   });

   this.input = function(event) {

   }

   this.update = function() {
      this.generateLabelAnimation.update();
   }

   this.draw = function() {
      this.generateLabel.draw();
   }
}

function Path() {
   this.level = 3;
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
            console.log(selected);

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
