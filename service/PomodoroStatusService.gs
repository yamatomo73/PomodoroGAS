(function(global){
  var PomodoroStatusService = (function() {
    
    /*
    * ステータスサービス
    */
    function PomodoroStatusService(stateHistoryRepository)
    {
      this.stateHistoryRepository = stateHistoryRepository;
    };
    
    PomodoroStatusService.prototype.status = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      return use_case.state();
    };
    
    PomodoroStatusService.toString = function() {
      return 'PomodoroStatusService';
    };
    
    return PomodoroStatusService;
  })();
  
  global.PomodoroStatusService = PomodoroStatusService;
  
})(this);