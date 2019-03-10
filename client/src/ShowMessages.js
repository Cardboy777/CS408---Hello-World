import React, { Component } from 'react';
import firebase from './firebase'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class ShowMessages extends Component {
    constructor(){
        super();
        this.state ={
            loadingstate: 0,
            messages: [],
        }
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
		this.checkForMessages();
    }
    componentDidMount(){
        this.getMessages();
    }

    getMessages(){
        let code
        if (this.props.uData.uid < this.props.user.data.uid) {
            code = this.props.uData.uid + this.props.user.data.uid;
        } else {
            code = this.props.user.data.uid + this.props.uData.uid;
        }
        const db = firebase.firestore();
        db.collection("usersPQ").doc(code).get()
        .then( (msgdoc) => {
            if (msgdoc.exists) {

            } else {
                console.log("Messaging data does not exists\n");
            }
        })
      .catch( (error) => {
          console.log("Error getting Messaging Data:\n" + error);
      });
    }

    checkForMessages()
	{
		window.localStorage.setItem("unreadMessageCount", "0");
		socket.on('sendMessageToUserResponse', function(resp)
		{
			window.alert(resp);
		});
		
		socket.on('receiveMessage', function(msg)
		{
			window.alert("Receiving: " + JSON.stringify(msg));
		});
		
		socket.on('incomingMessage', function(data)
		{
			console.log(JSON.stringify(data));
			//add to message history json
			//display if it's open
			//otherwise do an animation for that person
		});
		
		socket.emit('testMessageClientToServer', "FWFGWFWE");
	}
    sendMessage(e, user)
	{
		e.preventDefault();
		var messageFrame = document.getElementById("messageFrame");
		var senderMessage = document.getElementById("sampleSenderMessage");
		var selfMessage = document.getElementById("sampleSelfMessage");
		var sendMessageDiv = document.getElementById("send-message");
		var messageBox = document.getElementById("messageBox");
		var messageButton = document.getElementById("sendMessage");
		
		if (messageBox.value.length < 1) { window.alert("You must type a message in the box."); return; }
		if (messageBox.value.split("\n").length > 12) { window.alert("You cannot have more than 12 lines of text per message."); return; }
		var clon = selfMessage.cloneNode(true);
		///set to my picture
		clon.id = "";
		clon.children[1].children[0].innerHTML = messageBox.value.split("\n").join("<br>");
		clon.className = clon.className.replace("no-display", "");
		messageFrame.appendChild(clon);
		messageBox.value = "";
		
		var currentUser = JSON.parse(window.localStorage.getItem("user"));
		var userEmail = currentUser.email;
		var userKey = currentUser.uid;
		
		//var messageText = document.getElementById("messageTextBox").value;
		var messageObject = {};
		messageObject.sender = {"email":userEmail, "uid":userKey};
		messageObject.receiver = "paultest@test.com";
		messageObject.id = Math.random();
		messageObject.message = "TEST";
		
		socket.emit("sendMessageToUser", messageObject); //messageObject);

	}

  render() {
    return (
    <div>
        <h1>This is the Chat area for {this.props.user.data.user} and {this.props.uData.user} </h1>
        <textarea id="messageBox" rows="5" cols="100" placeholder="Type your message here."></textarea>
        <button id="sendMessage" onClick={this.sendMessage}>Send</button>
    </div>
    );
  }
}

export default ShowMessages;
