(function(global){
  var ChatworkUserUseCase = (function() {
    /**
    * ポモドーロのchatwork連携のユースケースクラス
    * @param {ChatWorkClientEx} client ChatWorkClientExのインスタンス
    */
    function ChatworkUserUseCase(client)
    {
      // this.client =  ChatWorkClientEx.factory({});
      this.client = client;
    };
    
    /*
    * ポモドーロステータス変更時の chatwork ユーザのステータスを更新
    * @param {State} state
    * @return {object} /me レスポンス (http://developer.chatwork.com/ja/endpoint_me.html)
    */
    ChatworkUserUseCase.prototype.updateStatus = function(state) {
      var me_data = this.client.getMe();
      var profile_name_prefix = '✨集中時間✨ ';
      if (state) {
        switch(state.getStateType().getName()) {
          case StateType.READY.getName():
            break;
          case StateType.ONGOING.getName():
            // 名前変更
            this.client.sendProfileSetting(
              {
                'name':  profile_name_prefix + me_data.name,
              }
            );
            // 通知を切る
            this.client.sendSetting(
              { 
                'desktop_alert': '0'
              }
            );
            break;
          case StateType.SHORT_BREAK.getName():
            // 名前を元に戻す
            this.client.sendProfileSetting(
              {
                'name': me_data.name.replace(profile_name_prefix, ''),
              }
            );
            // 通知をONにする
            this.client.sendSetting(
              { 
                'desktop_alert': '1'
              }
            );
            break;
        }
      }
      return this.client.getMe();
    };
    
    ChatworkUserUseCase.toString = function() {
      return 'ChatworkUserUseCase';
    };
    
    return ChatworkUserUseCase;
  })();
  
  global.ChatworkUserUseCase = ChatworkUserUseCase;
  
})(this);