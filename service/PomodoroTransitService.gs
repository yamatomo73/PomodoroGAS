(function(global){
  var PomodoroTransitService = (function() {
    
    /*
    * ステータスサービス
    */
    function PomodoroTransitService(stateHistoryRepository, notifier_client, notification_room_id, pomodoro_user_client)
    {
      this.stateHistoryRepository = stateHistoryRepository;
      this.notifier_client = notifier_client;
      this.notification_room_id = notification_room_id;
      this.pomodoro_user_client = pomodoro_user_client;
    };
    
    PomodoroTransitService.prototype.transit = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      if (!use_case.canTransit()) {
        return false;
      }
      
      var state = use_case.transit();
      // chatwork 連携
      if (this.notifier_client && this.notification_room_id && this.pomodoro_user_client) {
        var cw_user_use_case = new ChatworkUserUseCase(this.stateHistoryRepository, this.notifier_client, this.notification_room_id, this.pomodoro_user_client);
        var me_data = cw_user_use_case.updateStatus(state);
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