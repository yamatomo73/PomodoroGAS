(function(global){
  var ElapsedTime = (function() {
    
    /*
    * 経過時間
    * @param {integer}  millisecond 
    */
    function ElapsedTime(millisecond)
    {
      this.millisecond = millisecond;
    };
    
    ElapsedTime.prototype.toSecond = function() {
      return Math.floor(this.millisecond / 1000);
    };
    
    ElapsedTime.prototype.toMinute = function() {
      return Math.floor(this.millisecond / 1000 / 60);
    };
    
    ElapsedTime.toString = function() {
      return 'ElapsedTime';
    };
    
    return ElapsedTime;
  })();
  
  global.ElapsedTime = ElapsedTime;
  
})(this);