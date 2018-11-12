(function(global){
  var PomodoroUseCase = (function() {
    
    /**
    * ポモドーロのユースケースクラス
    * @param {StateHistoryRepository} stateHistoryRepositoryStateHistoryRepository のインスタンス
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
        return this.stateHistoryRepository.store(new State(null, StateType.READY, new Date(), false, false));
      }
      return state;
    };

    /*
    * 次の状態に遷移可能か
    * @return {boolean} 
    */
    PomodoroUseCase.prototype.canTransit = function() {
      var state = this.state();
      return state.isExpire();
    };

    /*
    * 次の状態を開始する
    * @return {State} 遷移後の状態
    */
    PomodoroUseCase.prototype.transit = function() {
      if (!this.canTransit()) {
        throw new Error('まだ次にはいけません');
      }
      
      var state = this.state();
      return this.stateHistoryRepository.store(state.nextState());
    };
    
    PomodoroUseCase.toString = function() {
      return 'PomodoroUseCase';
    };
    
    return PomodoroUseCase;
  })();
  
  global.PomodoroUseCase = PomodoroUseCase;
  
})(this);
