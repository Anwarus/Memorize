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
