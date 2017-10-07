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
