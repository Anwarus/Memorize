function Over() {
   this.overLabel = new Label(new Vector2d(WIDTH/2, HEIGHT/2), new Rectangle(0, 0, 140, 60, new Color(COLORS.first), 3),
                               new Text(0, 0, "Game over", new Color(COLORS.second)));

   this.overLabelAnimation = new Transition({
      target: this.overLabel.position,
      property: "y",
      start: 0,
      end: HEIGHT/2,
      velocity: .3,
      acceleration: .05
   });

   this.input = function(event) {

   }

   this.update = function() {
      this.overLabelAnimation.update();

      if(this.overLabelAnimation.done)
         state = new Introduction();
   }

   this.draw = function() {
      this.overLabel.draw();
   }
}
