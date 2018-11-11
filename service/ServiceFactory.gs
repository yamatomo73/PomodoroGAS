(function(global){
  var ServiceFactory = (function() {
    
    /*
    * サービスファクトリ
    */
    function ServiceFactory()
    {
      // 必須設定：シート
      var sheet = SpreadsheetApp.getActiveSheet();
      this.stateHistoryRepository = new StateHistoryRepository(sheet);
      
      // 任意設定：chatwork 認証情報
      this.notifier_client = null;
      this.pomodoro_user_client = null;
      var notifier_chatwork_api_token = PropertiesService.getScriptProperties().getProperty('NOTIFIER_CW_API_TOKEN');
      var notifier_chatwork_email = PropertiesService.getScriptProperties().getProperty('NOTIFIER_CW_LOGIN_EMAIL');
      var notifier_chatwork_password = PropertiesService.getScriptProperties().getProperty('NOTIFIER_CW_LOGIN_PASS');
      this.notification_room_id = PropertiesService.getScriptProperties().getProperty('NOTIFY__ROOM_ID');
      var pomodoro_user_chatwork_api_token = PropertiesService.getScriptProperties().getProperty('POMODORO_USER_CW_API_TOKEN');
      var pomodoro_user_chatwork_email = PropertiesService.getScriptProperties().getProperty('POMODORO_USER_CW_LOGIN_EMAIL');
      var pomodoro_user_chatwork_password = PropertiesService.getScriptProperties().getProperty('POMODORO_USER_CW_LOGIN_PASS');

      if (notifier_chatwork_api_token && notifier_chatwork_email && notifier_chatwork_password && this.notification_room_id
        && pomodoro_user_chatwork_api_token  && pomodoro_user_chatwork_email && pomodoro_user_chatwork_password) {
        this.notifier_client = new ChatWorkClientEx.factory({
          'token': notifier_chatwork_api_token,
          'email': notifier_chatwork_email,
          'password': notifier_chatwork_password,
        });
        this.pomodoro_user_client = new ChatWorkClientEx.factory({
          'token': pomodoro_user_chatwork_api_token,
          'email': pomodoro_user_chatwork_email,
          'password': pomodoro_user_chatwork_password,
        });
      }
    };
    
    ServiceFactory.prototype.createStatusService = function() {
      return new PomodoroStatusService(this.stateHistoryRepository, this.notifier_client, this.notification_room_id, this.pomodoro_user_client);
    };
    
    ServiceFactory.prototype.createTransitService = function() {
      return new PomodoroTransitService(this.stateHistoryRepository, this.notifier_client, this.notification_room_id, this.pomodoro_user_client);
    };

    ServiceFactory.toString = function() {
      return 'ServiceFactory';
    };
    
    return ServiceFactory;
  })();
  
  global.ServiceFactory = ServiceFactory;
  
})(this);