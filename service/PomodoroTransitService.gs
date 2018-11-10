(function(global){
  var PomodoroTransitService = (function() {
    
    /*
    * ステータスサービス
    */
    function PomodoroTransitService(stateHistoryRepository)
    {
      this.stateHistoryRepository = stateHistoryRepository;
    };
    
    PomodoroTransitService.prototype.transit = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      if (!use_case.canTransit()) {
        return false;
      }
      return use_case.transit();
    };
    
    PomodoroTransitService.toString = function() {
      return 'PomodoroTransitService';
    };
    
    return PomodoroTransitService;
  })();
  
  global.PomodoroTransitService = PomodoroTransitService;
  
})(this);