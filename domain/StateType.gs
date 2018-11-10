(function(global){
  var StateType = (function() {
    
    /**
    * ポモドーロにおけるステータスのEnum
    *
    * @return {string} ステータス名
    * @return {Term} このステータスの期限
    */
    function StateType(name, term)
    {
      this.name = name;
    };
    
    StateType.prototype.getName = function() {
      return this.name;
    };
    
    StateType.prototype.getTerm = function() {
      switch(this.name) {
        case StateType.ONGOING.getName():
          return Term.WORK_TERM;
        case StateType.SHORT_BREAK.getName():
          return Term.SHORT_BREAK_TERM;
      }
      return null;
    };
    
    StateType.valueOf = function(value) {
      switch(value) {
        case StateType.READY.getName():
          return StateType.READY;
        case StateType.ONGOING.getName():
          return StateType.ONGOING;
        case StateType.SHORT_BREAK.getName():
          return StateType.SHORT_BREAK;
      }
      throw new Error('未定義の値: ' + value);
    };

    StateType.toString = function() {
      return 'StateType';
    };
    
    StateType.READY = new StateType('READY');
    StateType.ONGOING = new StateType('ONGOING');
    StateType.SHORT_BREAK = new StateType('SHORT_BREAK');
    
    return StateType;
  })();
  
  global.StateType = StateType;
  
})(this);
