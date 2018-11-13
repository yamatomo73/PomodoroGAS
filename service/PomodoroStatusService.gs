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
    
    /*
    * ステータス取得
    */
    PomodoroStatusService.prototype.status = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      return use_case.state();
    };
    
    /*
    * 定期監視とユーザーへの通知、ユーザーステータス更新
    */
    PomodoroStatusService.prototype.observe = function() {
      var use_case = new PomodoroUseCase(this.stateHistoryRepository);
      
      // chatwork 連携
      if (this.notifier_client && this.notification_room_id && this.pomodoro_user_client) {
        var state = use_case.state();
        var cw_user_use_case = new ChatworkUserUseCase(this.stateHistoryRepository, this.notifier_client, this.notification_room_id, this.pomodoro_user_client);
        cw_user_use_case.updateStatus(state);
        if (state.shouldFinishNotify()) {
          cw_user_use_case.finishNotiry(state);
        }
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