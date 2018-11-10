(function(global){
  var StateTransitions = (function() {
    
    /**
    * ポモドーロステータスの可能な遷移を表す
    */
    function StateTransitions()
    {
      this.allowed = {};
      this.allowed[StateType.READY.getName()] = StateType.ONGOING;
      this.allowed[StateType.ONGOING.getName()] = StateType.SHORT_BREAK;
      this.allowed[StateType.SHORT_BREAK.getName()] = StateType.ONGOING;
    };
    
    StateTransitions.prototype.next = function(state) {
      return this.allowed[state.getName()];
    };
    
    StateTransitions.toString = function() {
      return 'StateTransitions';
    };
    
    return StateTransitions;
  })();
  
  global.StateTransitions = StateTransitions;
  
})(this);
