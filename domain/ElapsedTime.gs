(function(global){
  var ElapsedTime = (function() {
    
    /*
    * 経過時間
    * @param {Date} start_date
    */
    function ElapsedTime(start_date)
    {
      this.start_date = start_date;
    };
    
    ElapsedTime.prototype.toMillisecond = function() {
      var elapsed_time = (new Date().getTime()) - this.start_date.getTime();
      if (elapsed_time < 0) {
        elapsed_time = 0;
      }
      return elapsed_time;
    }
    
    ElapsedTime.prototype.toSecond = function() {
      return Math.floor(this.toMillisecond() / 1000);
    };
    
    ElapsedTime.prototype.toMinute = function() {
      return Math.floor(this.toSecond() / 60);
    };
    
    ElapsedTime.toString = function() {
      return 'ElapsedTime';
    };
    
    return ElapsedTime;
  })();
  
  global.ElapsedTime = ElapsedTime;
  
})(this);