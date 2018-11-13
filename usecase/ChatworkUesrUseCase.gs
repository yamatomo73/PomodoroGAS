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
    ChatworkUserUseCase.prototype.changeStatus = function(state) {
      var me_data = this.pomodoro_user_client.getMe();
      var profile_name_prefix = '✨集中時間✨ ';
      if (state) {
        switch(state.getStateType().getName()) {
          case StateType.READY.getName():
            break;
          case StateType.ONGOING.getName():
            // 名前変更
            this.pomodoro_user_client.sendProfileSetting(
              {
                'name':  profile_name_prefix + me_data.name,
              }
            );
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
            this.pomodoro_user_client.sendProfileSetting(
              {
                'name': me_data.name.replace(profile_name_prefix, ''),
              }
            );
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
    
    ChatworkUserUseCase.toString = function() {
      return 'ChatworkUserUseCase';
    };
    
    return ChatworkUserUseCase;
  })();
  
  global.ChatworkUserUseCase = ChatworkUserUseCase;
  
})(this);
