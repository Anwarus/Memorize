(function main(){

   const canvas = document.getElementById('screen');
   const gl = canvas.getContext('webgl');

   if(!gl) {
      alert("Unable to initialize WebGL");
      return;
   }

   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT);

})();
