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

   this.isIntersect = function(point) {
      var absolutePosition = new Vector2d(this.position.x, this.position.y);

      if(this.parent != null)
         absolutePosition.add(this.parent.position);

      if(point.x > absolutePosition.x && point.x < (absolutePosition.x + this.size.x) &&
         point.y > absolutePosition.y && point.y < (absolutePosition.y + this.size.y))
         return true;
      return false;
   }
}
