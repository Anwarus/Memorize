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

   const grid = new Vector2d(6, 6);

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
         state = new Generation();
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
      //if(event.key.code == keys.space) {

      //}
   }

   this.update = function() {
      this.generateLabelAnimation.update();
   }

   this.draw = function() {
      this.generateLabel.draw();
   }
}
