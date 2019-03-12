import React, { Component } from 'react';
import './css/MessageNotifications.css'
import openSocket from 'socket.io-client';

/*var socketName = "http://localhost:8080";
if (window.location.href.indexOf("localhost") < 0) { socketName = "http://dry-dusk-22747.herokuapp.com:8080"; }
const socket = openSocket(socketName);*/
var portNum = 8080;
var preLink = "http://";
if (window.location.href.indexOf("localhost") < 0) { portNum = 44073; preLink = "https://"; }
const socket = openSocket(preLink + window.location.hostname + ":" + portNum); 

class MessageNotifications extends Component {
	constructor(){
		super();
		//this.showNotification = this.showNotification.bind(this);
	}
	
	showNotification(data) {
		window.alert("HERE");
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
		setTimeout(function()
		{
			//socket.emit("testMessageClientToServer", "GSRG");
			var userData = window.localStorage.getItem("user");
			if (userData === undefined || userData == null) { return; }
			userData = JSON.parse(userData);
			if (userData.email === undefined || userData.uid === undefined) { return; }
			var newData = {};
			newData.email = userData.email;
			newData.token = userData.uid;
			newData.socketType = "Notification";
			socket.emit('giveSocketData', newData);
		}, 500);
		socket.on('incomingMessage', function(data)
		{
			var sender = data.sender || data.from;
			var message = data.message;
			
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
