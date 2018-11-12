(function(global){
  var State = (function() {
    
    /**
    * ポモドーロのステータスエンティティ
    *
    * @return {id|null} id
    * @return {StateType} state_type ステータス名
    * @return {Date} start_date 開始日時秒
    */
    function State(id, state_type, start_date, start_notified, finish_notified)
    {
      this.id = id;
      this.state_type = state_type;
      // this.start_date = new Date();
      this.start_date = start_date;
      this.start_notified = Boolean(start_notified);
      this.finish_notified = Boolean(finish_notified);
    };
    
    State.prototype.nextState = function() {
      if (!this.isExpire()) {
        // 期限中は次の状態にいけない
        throw new Error(Utilities.formatString('期限中に次のステータスには行けません. state: %s, 開始日時: %s', 
                                               this.state_type.getName(), 
                                               Utilities.formatDate(this.start_date, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss')
                                              )
                       );
      }
      
      var nextStateType = (new StateTransitions()).next(this.state_type);
      return new State(null, nextStateType, new Date(), false, false);
    };
    
    State.prototype.isExpire = function() {
      var term = this.state_type.getTerm();
      if (null === term) {
        // 指定がないものは常に期限切れあつかい
        return true;
      }
      
      return this.scheduledEndDate() < (new Date().getTime());
    };


    /*
    * 開始通知すべきかどうか
    * @return {boolean} 開始通知すべきであればtrue
    */
    State.prototype.shouldStartNotify = function() {
      return false;
    }

    /*
    * 開始通知
    */
    State.prototype.startNotify = function() {
      return new State(this.id, this.state_type, this.start_date, true, this.finish_notified);
    };
    
    /*
    * 開始通知すべきかどうか
    * @return {boolean} 開始通知すべきであればtrue
    */
    State.prototype.shouldFinishNotify = function() {
      return false === this.finish_notified && this.overTime().toMillisecond() > 0;
    }

    /*
    * 終了通知
    */
    State.prototype.finishNotify = function() {
      return new State(this.id, this.state_type, this.start_date, this.start_notified, true);
    };
    
    /*
    * 終了予定時間
    * @return {Date|boolean} 終了予定時間。存在しない場合はfalse
    */
    State.prototype.scheduledEndDate = function() {
      var term = this.state_type.getTerm();
      if (null === term) {
        // 期限がない状態
        return false;
      }
      
      return new Date(this.start_date.getTime() + term.getTermMinute() * 60 * 1000);
    }
    
    /*
    * 残り時間
    * @return {RemainingTime|boolean} のこり時間。存在しない場合はfalse
    */
    State.prototype.remainingTime = function() {
      var term = this.state_type.getTerm();
      if (null === term) {
        // 期限がない状態
        return false;
      }
      return new RemainingTime(this.elapsedTime(), term);
    }
    
    /*
    * 経過時間
    */
    State.prototype.elapsedTime = function() {
      return new ElapsedTime(this.start_date);
    }

    /*
    * 超過時間
    */
    State.prototype.overTime = function() {
      return new OverTime(this.elapsedTime(), this.state_type.getTerm());
    }

    State.prototype.getId = function() {
      return this.id;
    };
    
    State.prototype.getStateType = function() {
      return this.state_type;
    };
    
    State.prototype.getStartDate = function() {
      return this.start_date;
    };
    
    State.prototype.isStartNotified = function() {
      return this.start_notified;
    };
    
    State.prototype.isFinishNotified = function() {
      return this.finish_notified;
    };
    
    State.prototype.toRecord = function() {
      return [this.id, this.state_type.getName(), this.start_date, this.start_notified, this.finish_notified];
    };
    
    State.toString = function() {
      return 'State';
    };
    
    return State;
  })();
  
  global.State = State;
  
})(this);
