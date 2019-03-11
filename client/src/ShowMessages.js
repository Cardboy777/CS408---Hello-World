import React, { Component } from 'react';
import firebase from './firebase'
import openSocket from 'socket.io-client';
import SpinningLoader from './SpinningLoader';
import DisplayMessage from './DisplayMessage';
import './css/ShowMessages.css'

/*var socketName = "http://localhost:8080";
if (window.location.href.indexOf("localhost") < 0) { socketName = "http://dry-dusk-22747.herokuapp.com:8080"; }
const socket = openSocket(socketName);*/
const socket = openSocket("http://" + window.location.hostname + ":8080"); 

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
        this.checkForMessages = this.checkForMessages.bind(this);
        this.sendMessageButtonEvent= this.sendMessageButtonEvent.bind(this);
    }
    componentDidMount(){
        this.getMessages();
		this.checkForMessages();
		
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
			newData.socketType = "ShowMessages";
			socket.emit('giveSocketData', newData);
		}, 500);
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
		var that = this;
		
		window.localStorage.setItem("unreadMessageCount", "0");		
		socket.on('testMessage', function(data)
		{
			window.alert("Test- " + data);
		});
		socket.on('incomingMessage', function(data)
		{
			let newMessages = that.state.messages
			
			newMessages.push({
				timestamp: new Date().getTime(),
				message: data.message,
				from: data.uid //this.props.uAuth.uid,
			})

			that.setState({
				messages: newMessages
			})
		});
		
		socket.emit('testMessageClientToServer', "FWFGWFWE");
    }
    
    sendMessageButtonEvent(e){
        e.preventDefault();
        this.sendMessage();
    }
    sendMessage()
	{
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
		messageObject.sender = {"email":userEmail, "uid":this.props.uData.uid};
		messageObject.receiver = this.props.user.uid;
		messageObject.id = Math.random();
		messageObject.message = message;
		
        socket.emit("sendMessageToUser", messageObject); //messageObject);

        //update database with message
        let date = new Date();

        let newMessages = this.state.messages
        newMessages.push({
            "message": message,
            "from": this.props.uAuth.uid,
            "timestamp": new Date().getTime()
        });
		const fixedMessages = newMessages.map((obj)=> {return Object.assign({}, obj)});
		
		console.log(JSON.stringify(newMessages[newMessages.length - 1]));
		
        this.setState({
            messages: newMessages
        })
		console.log("RIGHT BEFORE");
        console.log(newMessages);
        console.log(this.state.chatroom_code);
		console.log("RIGHT AFTER");
        const db = firebase.firestore();
		db.collection("messages").doc(this.state.chatroom_code).set({
			"messages": newMessages
		}).catch(function(err)
		{
			window.alert("ERROR: " + err);
		});
	}

  render() {

    //listener for the Enter key for next
    window.addEventListener('keydown',(e)=>{
        let messageBox = document.getElementById("messageBox")
        if ( document.activeElement === messageBox && e.keyCode === 13) {
            e.preventDefault();
            this.sendMessage();
        }
    }, false);

    return (
    <div id='ShowMessages'>
        {this.state.loadingstate === 0 ?
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
                    <div id='chat-area'>
                        {this.state.messages.map((i)=>
                            this.state.messages.length === i+1 ?
                                <DisplayMessage key={i.timestamp} me={this.props.uData.uid} them={this.props.user.data.uid} msg={i} last={true}/>
                            :
                                <DisplayMessage key={i.timestamp} me={this.props.uData.uid} them={this.props.user.data.uid} msg={i} last={false}/>
                        )}
                    </div>
                
                    <form>
                        <textarea id="messageBox" rows="5" cols="100" name='message' rows='2' placeholder="Type your message here."></textarea>
                        <button id="sendMessage" onClick={this.sendMessageButtonEvent}>Send</button>
                    </form>
                </div>
        }
    </div>
    );
  }
}
export default ShowMessages;