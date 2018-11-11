(function(global){
  var OverTime = (function() {
    
    /*
    * 超過時間
    * @param {ElapsedTime}  elapsed_time 
    * @param {Term}  term 
    */
    function OverTime(elapsed_time, term)
    {
      this.elapsed_time = elapsed_time;
      this.term = term;
    };
    
    OverTime.prototype.toMillisecond = function() {
      if (null === this.term) {
        return 0;
      }
      var over_time = this.elapsed_time.toMillisecond() - (this.term.getTermMinute() * 60 * 1000);
      if (over_time < 0) {
        return 0;
      }
      return over_time;
    }

    OverTime.prototype.toSecond = function() {
      return Math.floor(this.toMillisecond() / 1000);
    };
    
    OverTime.prototype.toMinute = function() {
      return Math.floor(this.toSecond() / 60);
    };
    
    OverTime.toString = function() {
      return 'OverTime';
    };
    
    return OverTime;
  })();
  
  global.OverTime = OverTime;
  
})(this);