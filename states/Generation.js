function Generation() {
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
