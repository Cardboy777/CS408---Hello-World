import React, { Component } from 'react';
import Header from './Header';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class Messages extends Component {
	constructor(){
        super();
		this.sendMessage = this.sendMessage.bind(this);
		this.checkForMessages();
	}
	
	checkForMessages()
	{
		socket.on('sendMessageToUserResponse', function(resp)
		{
			window.alert(resp);
		});
		
		socket.on('receiveMessage', function(msg)
		{
			window.alert("Receiving: " + JSON.stringify(msg));
		});
		
		socket.emit('testMessageClientToServer', "FWFGWFWE");
	}
	
	sendMessage(e)
	{
		e.preventDefault();
		var currentUser = JSON.parse(window.localStorage.getItem("user"));
		var userEmail = currentUser.email;
		var userKey = currentUser.uid;
		
		//var messageText = document.getElementById("messageTextBox").value;
		var messageObject = {};
		messageObject.sender = {"email":userEmail, "uid":userKey};
		messageObject.receiver = "paultest@test.com";
		messageObject.id = Math.random();
		messageObject.message = "TEST";
		
		socket.emit("sendMessageToUser", "FAF"); //messageObject);
		
	}
	
  render() {
    return (
      <div>
        <Header {...this.props}/>
        <h1>Messages Page</h1>
		<div id="messageBoxDiv">
			<input id="messageTextBox" placeholder="Type your message here."></input>
			<button id="sendMessageButton" onClick={this.sendMessage}>Send</button>
		</div>
      </div>
    );
  }
}

export default Messages;
