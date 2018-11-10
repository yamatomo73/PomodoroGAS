(function(global){
  var PomodoroUseCase = (function() {
    
    /**
    * ポモドーロのユースケースクラス
    * @param {StateHistoryRepository} StateHistoryRepository のインスタンス
    */
    function PomodoroUseCase(stateHistoryRepository)
    {
      this.stateHistoryRepository = stateHistoryRepository;
    };
    
    /*
    * 現在のポモドーロステータス
    * @return {State} ステータス
    */
    PomodoroUseCase.prototype.state = function() {
      var state = this.stateHistoryRepository.lastState();
      if (null === state) {
        // まだ一度もしていない
        // 準備OKを記録
        return this.stateHistoryRepository.store(new State(null, StateType.READY, new Date()));
      }
      return state;
    };

    /*
    * 次の状態を開始する
    * @return {State} ステータス
    */
    PomodoroUseCase.prototype.start = function() {
      var state = this.state();
      if (!state.isExpire()) {
        throw new Error('まだ次にはいけません');
      }
      
      return this.stateHistoryRepository.store(state.nextState());
    };
    
    PomodoroUseCase.toString = function() {
      return 'PomodoroUseCase';
    };
    
    return PomodoroUseCase;
  })();
  
  global.PomodoroUseCase = PomodoroUseCase;
  
})(this);
