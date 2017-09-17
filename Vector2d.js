function Vector2d(x, y) {
   this.x = x || 0;
   this.y = y || 0;

   this.add = function(b) {
      this.x += b.x;
      this.y += b.y;
   }

   this.subtract = function(b) {
      this.x -= b.x;
      this.y -= b.y;
   }

   this.save = function(b) {
      this.x = b.x;
      this.y = b.y;
   }

   this.multiple = function(b) {
      if(typeof b == "Vector2d") {
          this.x *= b.x;
          this.y *= b.y;
      } else {
          this.x *= b;
          this.y *= b;
      }
   }

   this.equal = function(b) {
      if(this.x === b.x &&
         this.y === b.y)
         return true;
      return false;
   }

   this.length = function() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
   }
}
