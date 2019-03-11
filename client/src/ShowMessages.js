import React, { Component } from 'react';
import firebase from './firebase'
import openSocket from 'socket.io-client';
import SpinningLoader from './SpinningLoader';
const socket = openSocket('http://localhost:8080');

class ShowMessages extends Component {
    constructor(){
        super();
        this.state ={
            loadingstate: 0,
            messages: [],
            chatroom_code: null
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
        db.collection("messages").doc(code).get()
        .then( (msgdoc) => {
            if (msgdoc.exists) {
                this.setState({
                    loadingstate: 1,
                    messages: msgdoc.data().messages,
                    chatroom_code: code
                })
            } else {
                this.setState({
                    loadingstate: 1,
                    messages: [],
                    chatroom_code: code
                })
                db.collection("messages").doc(code).set({
                    messages: []
                });
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
    sendMessage(e)
	{
		e.preventDefault();
		let messageFrame = document.getElementById("messageFrame");
		let messageBox = document.getElementById("messageBox");
		
		if (messageBox.value.length < 1) { window.alert("You must type a message in the box."); return; }
		if (messageBox.value.split("\n").length > 12) { window.alert("You cannot have more than 12 lines of text per message."); return; }
		
        let message = messageBox.value;
		
		///set to my picture
		messageBox.value = "";
		
		let userEmail = this.props.uAuth.email;
		let userKey = this.props.uAuth.uid;
		
		//var messageText = document.getElementById("messageTextBox").value;
		let messageObject = {};
		messageObject.sender = {"email":userEmail, "uid":this.props.user.uid};
		messageObject.receiver = this.props.uData.uid;
		messageObject.id = Math.random();
		messageObject.message = message;
		
        socket.emit("sendMessageToUser", messageObject); //messageObject);
        


        //update database with message
        let date = new Date();

        let newMessages = this.state.messages
        newMessages.push({
            message: message,
            from: this.props.uAuth.uid,
            timestamp: date.getTime()
        })

        this.setState({
            messages: newMessages
        })
        console.log(newMessages)
        const db = firebase.firestore();
        db.collection("messages").doc(this.state.chatroom_code).update({
			messages: newMessages
        });
	}

  render() {
    return (
    <div id='ShowMessages'>
        {this.loadingstate === 0 ?
            <SpinningLoader/>
        :
            this.state.messages.length === 0 ?
                <div>
                    <h1>You haven't Sent Any Messages! Try saying 'Hi'</h1>
                    <textarea id="messageBox" rows="5" cols="100" placeholder="Type your message here."></textarea>
                    <button id="sendMessage" onClick={this.sendMessage}>Send</button>
                </div>
            :
                <div>
                    <h1>This is the Chat area for {this.props.user.data.user} and {this.props.uData.user} </h1>
                
                    <form>
                        <textarea id="messageBox" rows="5" cols="100" name='message' rows='1' placeholder="Type your message here."></textarea>
                        <button id="sendMessage" onClick={this.sendMessage}>Send</button>
                    </form>
                </div>
        }
    </div>
    );
  }
}

export default ShowMessages;
