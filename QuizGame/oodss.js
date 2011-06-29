function sendRequest(requestMessage, returnCallbackFunctionOrListener)
{
	var message = JSON.stringify(requestMessage);
	$("#log").append("</br>Trying to send:"+message);
	var lRes = lWSC.broadcastText2(
					"",		
					message
				);
	if(lRes == 0)
	{
		$("#log").append("</br>Error occured when sending message");
	}
	
}

function join_game_request_attributes(player_name)
{
   if(!player_name)
      this.player_name = "nonamegiven";
   else
      this.player_name = player_name;
}

function join_game_request(json,player_name)//could register the name of this somewhere... into a translation scope of sorts.  This will really help with update_messages.
{
   if(json == 0)
       this.join_game_request = new join_game_request_attributes(player_name);
   else
       this.join_game_request = new join_game_request_attributes();
}


var connectionIsGood = 0;
			function doOpen() {
				// adjust this URL to your jWebSocket server
				var lURL = "ws://localhost:8787/;prot=json,timeout=360000";//jws.JWS_SERVER_URL + "/;prot=json,timeout=360000";

				$("#log").append("</br>Starting connection to server:");
				// try to establish connection to jWebSocket server
				lWSC.logon( lURL, "", "", {

					// OnOpen callback
					OnOpen: function( aEvent ) {
                    connectionIsGood = 1;
                    $("#log").append("</br>Connected to server...");
					//	checkKeepAlive({ immediate: false });
					},

					// OnMessage callback
					OnMessage: function( aEvent, aToken ) {
					$("#log").append("</br>Message:"+aEvent.data);
					},

					// OnClose callback
					OnClose: function( aEvent ) {
						//lWSC.stopKeepAlive();
						//log( SYS, IN, "Disconnected from " + lJWSID + "." );
						//doFocus( eUsername );
						$("#log").append("</br>Disconnected from...");
						connectionIsGood = -1;
					}
					
				});
			}