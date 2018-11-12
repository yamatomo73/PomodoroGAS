function doGet(e) {
  switch(e.parameter.mode) {
    case 'transit_state':
      return _transit_state();
    case 'get_status':
      return _get_status();
    case 'observe':
      return _observe();
  }
}

function _transit_state() {
  var factory = new ServiceFactory();
  var transit_service = factory.createTransitService();
  var result = transit_service.transit();

  var status_service = factory.createStatusService();
  var state = status_service.status();

  if (false === result) {
    return _outputStatusHtml(state, '現在のステータスは変更できません');
  }
  return _outputStatusHtml(state, '新しいステータスに移行しました');
}

function _get_status() {
  var factory = new ServiceFactory();
  var status_service = factory.createStatusService();
  var state = status_service.status();
  return _outputStatusHtml(state, '現在のステータス');
}

function _observe() {
  var factory = new ServiceFactory();
  var status_service = factory.createStatusService();
  var state = status_service.observe();
  return _outputStatusHtml(state, '現在のステータス');
}

function _outputStatusHtml(state, title) {
  var html = HtmlService.createTemplateFromFile('template/status'); 
  html.title = title;
  html.status_name = state.getStateType().getName();
  var remaining_time = state.remainingTime();
  if (remaining_time) {
    html.remain = state.remainingTime().toMinute();
  } else {
    html.remain = 'なし';
  }
  html.over = state.overTime().toMinute();
  output = html.evaluate();
  
  Logger.log(output.getContent());

  return output;
}