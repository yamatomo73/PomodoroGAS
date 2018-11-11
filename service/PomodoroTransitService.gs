(function(global){
  var PomodoroTransitService = (function() {
    
    /*
    * ステータスサービス
    */
    function PomodoroTransitService(stateHistoryRepository, client)
    {
      this.stateHistoryRepository = stateHistoryRepository;
      this.client = client;
    };
    
    PomodoroTransitService.prototype.transit = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      if (!use_case.canTransit()) {
        return false;
      }
      
      var state = use_case.transit();
      
      // chatwork 連携
      if (this.client) {
        var cw_user_use_case = new ChatworkUserUseCase(this.client);
        var me_data = cw_user_use_case.updateStatus(state);
        Logger.log(me_data);
      }
      
      return state;
    };
    
    PomodoroTransitService.toString = function() {
      return 'PomodoroTransitService';
    };
    
    return PomodoroTransitService;
  })();
  
  global.PomodoroTransitService = PomodoroTransitService;
  
})(this);