(function(global){
  var ChatworkUserUseCase = (function() {
    /**
    * ポモドーロのchatwork連携のユースケースクラス
    * @param {ChatWorkClientEx} notifier_client ChatWorkClientExのインスタンス
    */
    function ChatworkUserUseCase(stateHistoryRepository, notifier_client, notification_room_id, pomodoro_user_client)
    {
      this.stateHistoryRepository = stateHistoryRepository;
      // this.client =  ChatWorkClientEx.factory({});
      this.notifier_client = notifier_client;
      this.notification_room_id = notification_room_id;
      this.pomodoro_user_client = pomodoro_user_client;
    };
    
    /*
    * ポモドーロステータス変更時の chatwork ユーザのステータスを更新
    * @param {State} state
    * @return {object} /me レスポンス (http://developer.chatwork.com/ja/endpoint_me.html)
    */
    ChatworkUserUseCase.prototype.transitStatus = function(state) {
      var me_data = this.pomodoro_user_client.getMe();
      if (state) {
        switch(state.getStateType().getName()) {
          case StateType.READY.getName():
            break;
          case StateType.ONGOING.getName():
            // 名前変更
            this.updateProfileName(this.createOngoingProfileName(me_data.name, state));
            /*
            // 通知を切る
            this.pomodoro_user_client.sendSetting(
              { 
                'desktop_alert': '0'
              }
            );
            */
            break;
          case StateType.SHORT_BREAK.getName():
            // 名前を元に戻す
            this.updateProfileName(this.undoOngoingProfileName(me_data.name, state));
            /*
            // 通知をONにする
            this.pomodoro_user_client.sendSetting(
              { 
                'desktop_alert': '1'
              }
            );
            */
            break;
        }
      }
      return this.pomodoro_user_client.getMe();
    };
    
    /*
    * ポモドーロステータス変更時の chatwork ユーザのステータスを更新
    * @param {State} state
    * @return {object} /me レスポンス (http://developer.chatwork.com/ja/endpoint_me.html)
    */
    ChatworkUserUseCase.prototype.updateStatus = function(state) {
      var me_data = this.pomodoro_user_client.getMe();
      if (state) {
        switch(state.getStateType().getName()) {
          case StateType.READY.getName():
            break;
          case StateType.ONGOING.getName():
            // 名前変更
            this.updateProfileName(this.createOngoingProfileName(me_data.name, state));
            break;
          case StateType.SHORT_BREAK.getName():
            break;
        }
      }
      return this.pomodoro_user_client.getMe();
    };
    
    /*
    * ポモドーロステータス完了を通知
    * @param {State} state
    */
    ChatworkUserUseCase.prototype.finishNotiry = function(state) {
      var over_time = state.overTime();
      var pomodoro_user_data = this.pomodoro_user_client.getMe();
      this.notifier_client.sendMessage(
        {
          'self_unread': 1,
          'room_id': this.notification_room_id,
          'body': Utilities.formatString('[To:%s] %s 終了しました', pomodoro_user_data.account_id, state.getStateType().getName()),
        }
      );
      // 通知済みにする
      this.stateHistoryRepository.store(state.finishNotify());
    };
    
    /*
    * ポモドーロユーザのプロフィール名を変更する
    * @param {string} name
    */
    ChatworkUserUseCase.prototype.updateProfileName = function(name) {
      this.pomodoro_user_client.sendProfileSetting({'name':  name});
    }
    
    ChatworkUserUseCase.prototype.createOngoingProfileName = function(current_name, state) {
      // 多重実行される可能性があるので、最初に元に戻しておく
      current_name = this.undoOngoingProfileName(current_name, state);
      
      var profile_name_format = '✨集中タイム:%02d分経過✨%s';
      return Utilities.formatString(profile_name_format, state.elapsedTime().toMinute(), current_name);
    };

    ChatworkUserUseCase.prototype.undoOngoingProfileName = function(current_name, state) {
      return current_name.replace(/^.*✨/gi, '');
    };

    ChatworkUserUseCase.toString = function() {
      return 'ChatworkUserUseCase';
    };
    
    return ChatworkUserUseCase;
  })();
  
  global.ChatworkUserUseCase = ChatworkUserUseCase;
  
})(this);
