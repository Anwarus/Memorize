function Show() {
   this.showLabel = new Label(new Vector2d(WIDTH/2, HEIGHT/2), new Rectangle(0, 0, 140, 60, new Color(COLORS.first), 3),
                               new Text(0, 0, "Replay path", new Color(COLORS.second)));

   this.showLabelAnimation = new Transition({
      target: this.showLabel.position,
      property: "y",
      start: 0,
      end: HEIGHT/2,
      velocity: .3,
      acceleration: .05
   });

   this.input = function(event) {

   }

   this.update = function() {
      this.showLabelAnimation.update();
   }

   this.draw = function() {
      this.showLabel.draw();
   }
}
