(function(global){
  var Term = (function() {
    
    /**
    * ポモドーロの各イベントの期間 Enum 
    */
    function Term(name, term_minute)
    {
      this.name = name;
      this.term_minute = term_minute;
    };
    
    Term.prototype.getName = function() {
      return this.name;
    };
    
    Term.prototype.getTermMinute = function() {
      return this.term_minute;
    };
    
    Term.toString = function() {
      return 'Term';
    };
    
    // 作業時間
    Term.WORK_TERM = new Term('WORK_TERM', 25);
    // 休憩時間
    Term.SHORT_BREAK_TERM = new Term('SHORT_BREAK_TERM', 5);
    
    return Term;
  })();
  
  global.Term = Term;
  
})(this);
