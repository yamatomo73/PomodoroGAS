(function(global){
  var PomodoroStatusService = (function() {
    
    /*
    * ステータスサービス
    */
    function PomodoroStatusService(stateHistoryRepository, notifier_client, notification_room_id, pomodoro_user_client)
    {
      this.stateHistoryRepository = stateHistoryRepository;
      this.notifier_client = notifier_client;
      this.notification_room_id = notification_room_id;
      this.pomodoro_user_client = pomodoro_user_client;
    };
    
    PomodoroStatusService.prototype.status = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      var state = use_case.state();

      // chatwork 連携
      if (this.notifier_client && this.notification_room_id && this.pomodoro_user_client) {
        var cw_user_use_case = new ChatworkUserUseCase(this.notifier_client, this.notification_room_id, this.pomodoro_user_client);
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