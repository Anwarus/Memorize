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

   const KEYS = {
      "space": 20
   }

   COLORS = {
      "background": {r: 23,  g: 18,  b: 25},
      "first":      {r: 34,  g: 85,  b: 96},
      "second":     {r: 237, g: 240, b: 96},
      "third":      {r: 240, g: 128, b: 60},
      "forth":      {r: 49,  g: 13,  b: 32}
   }

   const grid = new Vector2d(6, 6);

   var state = new Introduction();

   setInterval(function step() {
      state.input();
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
      //if(event.key.code == keys.space) {

      //}
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

function Rectangle(x, y, width, height, color, lineWidth) {
   this.position = new Vector2d(x - width/2, y - height/2);
   this.size = new Vector2d(width, height);
   this.color = color || new Color(255, 255, 255);
   this.lineWidth = lineWidth || 3;

   this.parent = null;

   this.draw = function() {
      var absolutePosition = new Vector2d(this.position.x, this.position.y);

      if(this.parent != null)
         absolutePosition.add(this.parent.position);

      CONTEXT.beginPath();
      CONTEXT.strokeStyle = this.color.toString();
      CONTEXT.lineWidth = this.lineWidth;
      CONTEXT.rect(absolutePosition.x, absolutePosition.y, this.size.x, this.size.y);
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
   this.color = color || new Color(255, 255, 255);

   this.parent = null;

   this.draw = function() {
      var absolutePosition = new Vector2d(this.position.x, this.position.y);

      if(this.parent != null)
         absolutePosition.add(this.parent.position);

      CONTEXT.fillStyle = this.color.toString();
      CONTEXT.fillText(this.text, absolutePosition.x, absolutePosition.y);
   }

   this.setPosition = function(x, y) {
      this.position = new Vector2d(x, y + FONT_SIZE/2);
   }

   this.getPosition = function() {
      return new Vector2d(x, y - FONT_SIZE/2);
   }
}

function Label(position, rectangle, text) {
   this.position = position
   this.rectangle = rectangle;
   this.text = text;

   this.rectangle.parent = this;
   this.text.parent = this;

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
}

function Transition(params) {

   // target - to get reference to object to animate
   // property - exact value to manipulate
   // start
   // end
   // velocity
   // acceleration
   // loop
   // backtrace

   this.target = params.target;
   this.property = params.property;

   params.target[params.property] = params.start;

   this.start = params.start;
   this.end = params.end;

   this.loop = params.loop || false;
   this.backtrace = params.backtrace || false;

   this.initialVelocity = params.velocity;
   this.velocity = params.velocity;
   this.acceleration = params.acceleration;

   this.ascending = params.start > params.end ? false : true;
   this.done = false;

   this.update = function() {
      if(!this.done) {
         this.velocity += this.acceleration;
         this.target[this.property] += this.velocity;
      }

      //If transition should end
      if((this.ascending && (this.target[this.property] >= this.end)) || (!this.ascending && (this.target[this.property] <= this.end))) {
         this.done = true;

         if(this.loop) {
            this.done = false;
            this.target[this.property] = this.start;
            this.velocity = this.initialVelocity;
         }
      }
   }
}

function Color(params) {
   this.r = params.r || 255;
   this.g = params.g || 255;
   this.b = params.b || 255;
   this.a = params.a || 1.0;

   this.toString = function() {
   		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
   }

   //TODO delete probably i hope
   this.update = function(color) {
      if(color.r != null)
         this.r = color.r;
      if(color.g != null)
         this.g = color.g;
      if(color.b != null)
         this.b = color.b;
      if(color.a != null)
         this.a = color.a;
  }
}
