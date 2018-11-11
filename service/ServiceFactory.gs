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
      this.client = null;
      var chatwork_api_token = PropertiesService.getScriptProperties().getProperty('CW_API_TOKEN');
      var chatwork_email = PropertiesService.getScriptProperties().getProperty('CW_LOGIN_EMAIL');
      var chatwork_password = PropertiesService.getScriptProperties().getProperty('CW_LOGIN_PASS');
      if (chatwork_api_token && chatwork_email && chatwork_password) {
        this.client = new ChatWorkClientEx.factory({
          'token': chatwork_api_token,
          'email': chatwork_email,
          'password': chatwork_password,
        })
      }
    };
    
    ServiceFactory.prototype.createStatusService = function() {
      return new PomodoroStatusService(this.stateHistoryRepository);
    };
    
    ServiceFactory.prototype.createTransitService = function() {
      return new PomodoroTransitService(this.stateHistoryRepository, this.client);
    };

    ServiceFactory.toString = function() {
      return 'ServiceFactory';
    };
    
    return ServiceFactory;
  })();
  
  global.ServiceFactory = ServiceFactory;
  
})(this);