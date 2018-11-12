(function(global){
  var StateHistoryRepository = (function() {
    
    /**
    * ポモドーロのステータス履歴のリポジトリ
    *
    * @return {Sheet} sheet 履歴用シート
    */
    function StateHistoryRepository(sheet)
    {
      // this.sheet = new Sheet();
      this.sheet = sheet;
    };
    
    StateHistoryRepository.prototype.lastState = function() {
      var last_row = this.sheet.getLastRow();
      if (last_row <= 1) {
        // まだなにもない　
        return null;
      }
      
      var records = this._getRecordRange(last_row).getValues();
      return this._toModel(last_row, records[0]);
    };
    
    StateHistoryRepository.prototype.store = function(state) {
      if (state.getId() === null) {
        // insert
        this.sheet.appendRow([state.getStartDate(), state.getStateType().getName(), state.isStartNotified(), state.isFinishNotified()]);
        return new State(this.sheet.getLastRow(), state.getStateType(), state.getStartDate(), state.isStartNotified(), state.isFinishNotified());
      }
      // update
      var range = this._getRecordRange(state.getId());
      range.setValues([[state.getStartDate(), state.getStateType().getName(), state.isStartNotified(), state.isFinishNotified()]]);
      return state;
    };
    
    StateHistoryRepository.prototype._toModel = function(id, record) {
      return new State(
        id,
        StateType.valueOf(record[1]),
        new Date(record[0]),
        record[2],
        record[3]
      );
    };
    
    StateHistoryRepository.prototype._getRecordRange = function(row) {
      // 指定の行の1行、A列からの4列を取得
      return this.sheet.getRange(row, 1, 1, 4);
    };

    StateHistoryRepository.toString = function() {
      return 'StateHistoryRepository';
    };
    
    return StateHistoryRepository;
  })();
  
  global.StateHistoryRepository = StateHistoryRepository;
  
})(this);
