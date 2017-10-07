function Transition(params) {

   // target - to get reference to object to animate
   // property - exact value to manipulate
   // start
   // end
   // velocity
   // acceleration
   // loop
   // backtrace

   this.target = params.target;
   this.property = params.property;

   params.target[params.property] = params.start;

   this.start = params.start;
   this.end = params.end;

   this.loop = params.loop || false;
   this.backtrace = params.backtrace || false;

   this.initialVelocity = params.velocity;
   this.velocity = params.velocity;
   this.acceleration = params.acceleration;

   this.ascending = params.start > params.end ? false : true;
   this.done = false;

   this.update = function() {
      if(!this.done) {
         this.velocity += this.acceleration;
         this.target[this.property] += this.velocity;
      }

      //If transition should end
      if((this.ascending && (this.target[this.property] >= this.end)) || (!this.ascending && (this.target[this.property] <= this.end))) {
         this.done = true;

         if(this.loop) {
            this.done = false;
            this.target[this.property] = this.start;
            this.velocity = this.initialVelocity;
         }
      }
   }
}
