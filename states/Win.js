function Win(level) {
   this.level = level;

   this.winLabel = new Label(new Vector2d(WIDTH/2, HEIGHT/2), new Rectangle(0, 0, 140, 60, new Color(COLORS.first), 3),
                               new Text(0, 0, "You win", new Color(COLORS.second)));

   this.winLabelAnimation = new Transition({
      target: this.winLabel.position,
      property: "y",
      start: 0,
      end: HEIGHT/2,
      velocity: .3,
      acceleration: .05
   });

   this.input = function(event) {

   }

   this.update = function() {
      this.winLabelAnimation.update();

      if(this.winLabelAnimation.done)
         state = new Generation(level);
   }

   this.draw = function() {
      this.winLabel.draw();
   }
}
