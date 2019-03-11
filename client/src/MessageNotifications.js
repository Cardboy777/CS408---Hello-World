import React, { Component } from 'react';
import './css/MessageNotifications.css'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

class MessageNotifications extends Component {
	constructor(){
		super();
		//this.showNotification = this.showNotification.bind(this);
	}
	
	showNotification(data) {
		//window.alert("HERE");
		var sender = data.sender;
		var message = data.message;
		
		var notification = document.getElementsByClassName("notification")[0];
		if (notification != undefined)
		{
			notification.className = notification.className + " show";
			setTimeout(function() { notification.className = notification.className.replace(" show", ""); }, 3000);
		}
	}
	
	componentDidMount()
	{
		socket.on('incomingMessage', function(data)
		{
			//window.alert("Received message");
			var sender = data.sender || data.from;
			var message = data.message;
			
			if (sender.indexOf("cowboy") < -1)
			{
				window.alert(sender + ": " + message);
			}
			
			var notif = document.getElementById("defaultNotification");
			var notificationHolder = document.getElementById("messageNotification");
			if (notif != undefined && notificationHolder != undefined)
			{
				var notification = notif.cloneNode(true);
				notification.className = notification.className.replace("no-display", "");
				notification.children[0].innerHTML = sender;
				notification.children[1].innerHTML = message;
				notification.className = notification.className + " show";
				setTimeout(function() 
				{ 
					notification.className = notification.className.replace("show", ""); 
					setTimeout(function()
					{
						notification.remove();
					}, 1000);
				}, 5000);
				notificationHolder.appendChild(notification);
			}
		});
	}
	
	
  render() {
    return (
      <div>
        <div id="messageNotification" className="message-notification">
			<div id="defaultNotification" className="notification no-display">
				<div className="notification-header">Name here</div>
				<div className="notification-body">
					dThis is the notification body. Text goes here. Hello.
					<br/>FAFSA
					<br/>afee
				</div>
			</div>
		</div>
      </div>
    );
  }
}

export default MessageNotifications;
