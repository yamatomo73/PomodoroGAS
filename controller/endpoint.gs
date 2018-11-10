function doGet(e) {
  switch(e.parameter.mode) {
    case 'transit_state':
      return _transit_state();
    case 'get_status':
      return _get_status();
  }
}

function _transit_state() {
  var factory = new ServiceFactory();
  var transit_service = factory.createTransitService();
  var result = transit_service.transit();
  if (false === result) {
    return _outputStatusHtml('現在のステータスは変更できません');
  }
  return _outputStatusHtml('新しいステータスに移行しました');
}

function _get_status() {
  return _outputStatusHtml('現在のステータス');
}

function _outputStatusHtml(title) {
  var factory = new ServiceFactory();
  var status_service = factory.createStatusService();
  var state = status_service.status();
  
  var html = HtmlService.createTemplateFromFile('template/status'); 
  html.title = title;
  html.status_name = state.getStateType().getName();
  html.remain = state.remainingTime().toMinute();
  output = html.evaluate();
  
  Logger.log(output.getContent());

  return output;
}