import React, { Component } from 'react';
import Header from './Header';
import './css/Messages.css'
import firebase from './firebase';
import openSocket from 'socket.io-client';

const db = firebase.firestore();
const socket = openSocket('http://localhost:8080');



var people = ["David", "Richardo", "No Message History"];
var conversationHistory = {
	"David":{
		"NumMessages":3,
		"Messages":[
			{"sender":"David", "message":"Hi"},
			{"sender":"Me", "message":"Hello"},
			{"sender":"David", "message":"ok"}
		]
	},
	"Richardo":{
		"NumMessages":5,
		"Messages":[
			{"sender":"Richardo", "message":"Hola, como se llama?"},
			{"sender":"Me", "message":"Hola, mayamo Pablo"},
			{"sender":"Richardo", "message":"Hola, me llamo Richardo"},
			{"sender":"Me", "message":"Por favor?"},
			{"sender":"Richardo", "message":"do you even speak spanish"}
		]
	}
}


class Messages extends Component {
	constructor(){
        super();
		this.state = {
			matches: ["David", "Richardo"],
			loading_state: 0,
			user_list: null,
			user_list_index: 0
		}
		this.fetchMatches = this.fetchMatches.bind(this);
		
		
		this.sendMessage = this.sendMessage.bind(this);
		this.showChatReact = this.showChatReact.bind(this);
		this.showChat = this.showChat.bind(this);
		this.checkForMessages();
		//this.loadMatches();
	}
	
	fetchMatches(){
		fetch("/api/getMatches", {
		  method: "POST", // *GET, POST, PUT, DELETE, etc.
		  mode: "cors", // no-cors, cors, *same-origin
		  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		  credentials: "same-origin", // include, *same-origin, omit
		  headers: {
			  "Content-Type": "application/json",
			  // "Content-Type": "application/x-www-form-urlencoded",
		  },
		  redirect: "follow", // manual, *follow, error
		  referrer: "no-referrer", // no-referrer, *client
		  body: JSON.stringify({ username: this.props.uData.user }), // body data type must match "Content-Type" header
		})
		.then(res => res.json())
		.then(arrayList => {
		  console.log(arrayList);
		  this.getUserListData(arrayList);
		}).catch((message) =>{
		  this.setState({
			loading_state: 2
		  })
		});
	}
	
	componentDidMount()
	{
		//this.loadMatches();
		this.fetchMatches();
	}
	
	getUserListData(arraylist){
    let promises=[];
    const db = firebase.firestore();
    for(let k in arraylist){
      promises.push(()=>{
        return (
          db.collection("usersPQ").doc(k.uid).get()
          .then( (userdoc) => {
            if (userdoc.exists) {
              return {
                data: userdoc.data(),
                match_percent: k.match_percent
              }
            } else {
              return null
            }
          })
          .catch( (error) => {
            console.log("No userdata for match: " + k.uid);
            return null
          })
        )
      })
    }
    //wait for all promises in array to finish
    Promise.all(promises).then((newarray) => {
      this.setState({
        user_list : newarray,
        loading_state : 1
      })
    })
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
	
	showChat(obj)
	{
		var messageFrame = document.getElementById("messageFrame");
		var senderMessage = document.getElementById("sampleSenderMessage");
		var selfMessage = document.getElementById("sampleSelfMessage");
		var sendMessageDiv = document.getElementById("send-message");
		var messageBox = document.getElementById("messageBox");
		var messageButton = document.getElementById("sendMessage");
		
		var userName = document.getElementById(obj).children[1].innerHTML;
		
		sendMessageDiv.style.display = "inline-block";
		var messageHistory = conversationHistory[userName];
		for (var i = messageFrame.children.length - 1; i > 1; i--)
		{
			messageFrame.children[i].remove();
		}
		if (conversationHistory[userName] != undefined)
		{
			var messages = messageHistory.Messages;
			for (var i = 0; i < messages.length; i++)
			{
				var message = messages[i];
				var clon;
				if (message.sender == "Me")
				{
					clon = selfMessage.cloneNode(true);
					///set to my picture
				}
				else
				{
					clon = senderMessage.cloneNode(true);
					///set to their picture
				}
				clon.id = "";
				clon.children[1].children[0].innerHTML = message.message;
				clon.className = clon.className.replace("no-display", "");
				messageFrame.appendChild(clon);
			}
		}
	}
	
	showChatReact(ev)
	{
		ev.preventDefault();
		//window.alert("HERE");
		this.showChat(ev.currentTarget.id);
	}
	
	sendMessage(e)
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
		
		var currentUser = JSON.parse(window.localStorage.getItem("user"));
		var userEmail = currentUser.email;
		var userKey = currentUser.uid;
		
		//var messageText = document.getElementById("messageTextBox").value;
		var messageObject = {};
		messageObject.sender = {"email":userEmail, "uid":userKey};
		messageObject.receiver = "paultest@test.com";///needs to be the person they click on
		messageObject.id = Math.random();
		messageObject.message = messageBox.value.split("\n").join("<br>");
		
		socket.emit("sendMessageToUser", messageObject); //messageObject);
		
		messageBox.value = "";
	}
	
	loadMatches() 
	{
		
		
		var matchNames = ["David", "Richardo"]; //go by usernames for real?
		var leftFrame = document.getElementById("leftFrame");
		var obj = document.getElementById("userHolder0");
		for (var i = 0; i < matchNames.length; i++)
		{
			var clon = obj.cloneNode(true);
			clon.className = clon.className.replace("no-display", "");
			clon.id = "userHolder" + (i + 1);
			clon.children[1].innerHTML = matchNames[i];
			//clon.onclick = this.showChat(clon.id);
			/////set user picture
			leftFrame.appendChild(clon);
			
		}
	}
	
  render() {
	  let temp = [];
	  for (var i = 0; i < people.length; i++)
	  {
		  var tempId = "userHolder" + (i + 1);
		  temp.push(<div id={tempId} className="user-holder matched-button" onClick={this.showChatReact}>
				<img src="favicon.ico" className="userMessageImage"></img>
				<div className="user-message-name">{people[i]}</div>
			</div>);
	  }
	  
    return (
      <div>
        <Header {...this.props}/>
		<div id="leftFrame">
			<p>Messages</p>
			{temp}
			<div id="userHolder0" className="user-holder matched-button no-display">
				<img src="favicon.ico" className="userMessageImage"></img>
				<div className="user-message-name">David</div>
			</div>
		</div>
		<div id="messageFrame">
			<div className="message-holder no-display" id="sampleSenderMessage">
				<img src="favicon.ico" className="message-user-icon message-sender-icon"></img>
				<div className="message message-sender">
					<div>----Other Person Sent This----</div>
				</div>
			</div>
			<div className="message-holder no-display" id="sampleSelfMessage">
				<img src="favicon.ico" className="message-user-icon message-self-icon"></img>
				<div className="message message-self">
					<div>----I sent this----</div>
				</div>
			</div>
		</div>
		<div id="send-message">
			<textarea id="messageBox" rows="5" cols="100" placeholder="Type your message here."></textarea>
			<button id="sendMessage" onClick={this.sendMessage}>Send</button>
		</div>
      </div>
    );
  }
}

export default Messages;
