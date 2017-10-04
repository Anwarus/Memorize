(function main(){

   CANVAS = document.getElementById('screen');
   CONTEXT = CANVAS.getContext('2d');

   WIDTH = CANVAS.width;
   HEIGHT = CANVAS.height;

   FONT_NAME = "Arial";
   FONT_SIZE = 24;

   CONTEXT.font = FONT_SIZE.toString() + "px " + FONT_NAME;
   CONTEXT.textAlign = "center";

   BACKGROUND_COLOR = "#";

   const FPS = 60;

   const KEYS = {
      "space": 20
   }

   COLORS = {
      "background": "#171219",
      "first":      "#225560",
      "second":     "#EDF060",
      "third":      "#F0803C",
      "forth":      "#310D20"
   }

   const grid = new Vector2d(6, 6);

   var state = new Introduction();

   setInterval(function step() {
      state.input();
      state.update();
      CONTEXT.fillStyle = COLORS.background;
      CONTEXT.fillRect(0, 0, WIDTH, HEIGHT);
      state.draw();
   }, 1000/FPS);

})();

function Introduction() {

   //game name label
   this.nameLabel = new Label(new Rectangle(WIDTH/2, HEIGHT/2, 140, 60, COLORS.first, 3),
                               new Text(WIDTH/2, HEIGHT/2, "Memorize", COLORS.second));
   //game start label
   this.startLabel = new Label(new Rectangle(WIDTH/2, HEIGHT/1.5, 200, 60, COLORS.first, 3),
                               new Text(WIDTH/2, HEIGHT/1.5, "Press any key", COLORS.second));

   this.nameLabelAnimation = new Transition(0, HEIGHT/2, .3, .05);
   //gameStart opacity animation
   this.gameStartAnimation = new Transition(0.0, 1.0, .01, .01);

   this.input = function(event) {
      //if(event.key.code == keys.space) {

      //}
   }

   this.update = function() {
      this.nameLabelAnimation.update();
      this.nameLabel.setPosition(this.nameLabel.getPosition().x, this.nameLabelAnimation.current);

      this.gameStartAnimation.update();
   }

   this.draw = function() {
      this.nameLabel.draw();
      this.startLabel.draw();
   }

}

function Rectangle(x, y, width, height, color, lineWidth) {
   this.position = new Vector2d(x - width/2, y - height/2);
   this.size = new Vector2d(width, height);
   this.color = color || "#ffffff";
   this.lineWidth = lineWidth || 3;

   this.draw = function() {
      CONTEXT.beginPath();
      CONTEXT.strokeStyle = this.color;
      CONTEXT.lineWidth = this.lineWidth;
      CONTEXT.rect(this.position.x, this.position.y, this.size.x, this.size.y);
      CONTEXT.stroke();
   }

   this.setPosition = function(x, y) {
      this.position = new Vector2d(x - this.size.x/2, y - this.size.y/2);
   }

   this.getPosition = function() {
      return new Vector2d(this.position.x + this.size.x/2, this.position.y + this.size.y/2)
   }
}

function Text(x, y, text, color) {
   this.position = new Vector2d(x, y + FONT_SIZE/2);
   this.text = text;
   this.color = color;

   this.draw = function() {
      CONTEXT.fillStyle = this.color;
      CONTEXT.fillText(this.text, this.position.x, this.position.y);
   }

   this.setPosition = function(x, y) {
      this.position = new Vector2d(x, y + FONT_SIZE/2);
   }

   this.getPosition = function() {
      return new Vector2d(x, y - FONT_SIZE/2);
   }
}

function Label(rectangle, text) {
   this.rectangle = rectangle;
   this.text = text;

   this.draw = function() {
      this.rectangle.draw();
      this.text.draw();
   }

   this.setPosition = function(x, y) {
      this.rectangle.setPosition(x, y);
      this.text.setPosition(x, y);
   }

   this.getPosition = function() {
      return this.text.getPosition();
   }

   this.setColor = function() {

   }
}

function Transition(start, end, velocity, acceleration, loop) {
   this.start = start;
   this.end = end;
   this.current = start;

   this.ascending = start > end ? false : true;
   this.done = false;
   this.loop = loop || false;

   this.initialVelocity = velocity;
   this.velocity = velocity;
   this.acceleration = acceleration;

   this.update = function() {
      if(!this.done) {
         this.velocity += this.acceleration;
         this.current += this.velocity;
      }

      //If transition should end
      if((this.ascending && (this.current >= this.end)) || (!this.ascending && (this.current <= this.end))) {
         this.done = true;

         if(this.loop) {
            this.done = false;
            this.current = this.start;
            this.velocity = this.initialVelocity;
         }
      }
   }
}
