(function(global){
  var ServiceFactory = (function() {
    
    /*
    * サービスファクトリ
    */
    function ServiceFactory()
    {
      var sheet = SpreadsheetApp.getActiveSheet();
      this.stateHistoryRepository = new StateHistoryRepository(sheet);
    };
    
    ServiceFactory.prototype.createStatusService = function() {
      return new PomodoroStatusService(this.stateHistoryRepository);
    };
    
    ServiceFactory.prototype.createTransitService = function() {
      return new PomodoroTransitService(this.stateHistoryRepository);
    };

    ServiceFactory.toString = function() {
      return 'ServiceFactory';
    };
    
    return ServiceFactory;
  })();
  
  global.ServiceFactory = ServiceFactory;
  
})(this);