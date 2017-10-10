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

   GRID = new Vector2d(12, 12);
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
   this.randomed = 0;

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

   this.input = function(event) {

   }

   this.update = function() {
      if(this.randomed < this.level)
      {

      }
   }

   this.draw = function() {
      for(var i=0; i<this.grid.length; i++) {
         for(var j=0; j<this.grid[i].length; j++)
            this.grid[i][j].draw();
      }
   }
}
