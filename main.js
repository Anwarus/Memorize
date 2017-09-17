(function main(){

   const canvas = document.getElementById('screen');
   const context = canvas.getContext('2d');

   const keys = {
      "space": 20
   }

   const fps = 60;
   const grid = new Vector2d(6, 6);

   var state =

   setInterval(function step() {
      state.input();
      state.update();
      state.draw();
   }, 1000/fps);

})();

function Introduction() {

   //game name label
   var nameLabel;
   //game start label
   var startLabel;

   //nameLabel come in animation
   //gameStart opacity animation

   function input(event) {
      if(event.key.code == keys.space) {

      }
   }

   function update() {

   }

   function draw() {

   }

}
