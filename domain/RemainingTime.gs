(function(global){
  var RemainingTime = (function() {
    
    /*
    * 残り時間
    * @param {ElapsedTime}  elapsed_time 
    * @param {Term}  term 
    */
    function RemainingTime(elapsed_time, term)
    {
      this.elapsed_time = elapsed_time;
      this.term = term;
    };
    
    RemainingTime.prototype.toMillisecond = function() {
      var remain = (this.term.getTermMinute() * 60 * 1000) - this.elapsed_time.toMillisecond();
      if (remain < 0) {
        return 0;
      }
      return remain;
    }

    RemainingTime.prototype.toSecond = function() {
      return Math.ceil(this.toMillisecond() / 1000);
    };
    
    RemainingTime.prototype.toMinute = function() {
      return Math.ceil(this.toSecond() / 60);
    };
    
    RemainingTime.toString = function() {
      return 'RemainingTime';
    };
    
    return RemainingTime;
  })();
  
  global.RemainingTime = RemainingTime;
  
})(this);