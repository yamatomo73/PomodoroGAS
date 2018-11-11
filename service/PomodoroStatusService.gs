(function(global){
  var PomodoroStatusService = (function() {
    
    /*
    * ステータスサービス
    */
    function PomodoroStatusService(stateHistoryRepository, client, notification_room_id)
    {
      this.stateHistoryRepository = stateHistoryRepository;
      this.client = client;
      this.notification_room_id = notification_room_id;
    };
    
    PomodoroStatusService.prototype.status = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      var state = use_case.state();

      // chatwork 連携
      if (this.client) {
        var cw_user_use_case = new ChatworkUserUseCase(this.client, this.notification_room_id);
        cw_user_use_case.checkStatus(state);
      }
      
      return use_case.state();
    };
    
    PomodoroStatusService.toString = function() {
      return 'PomodoroStatusService';
    };
    
    return PomodoroStatusService;
  })();
  
  global.PomodoroStatusService = PomodoroStatusService;
  
})(this);