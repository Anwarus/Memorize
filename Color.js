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
