import React, { Component } from 'react';
import Header from './Header';
import './css/Messages.css'
import firebase from './firebase';
import Loading from './Loading';
import ListLoadingError from './ListLoadingError';
import MessagesUserSidebarPanel from './MessagesUserSidebarPanel';
import ReactDOM from 'react-dom';
import SpinningLoader from './SpinningLoader';
import ShowMessages from './ShowMessages';

const db = firebase.firestore();

class Messages extends Component {
	constructor(){
		super();
		this.state = {
				loading_state: 0,
				user_list: null,
				user_list_index: 0
			}
		this.fetchMatches = this.fetchMatches.bind(this);
		this.showChatReact = this.showChatReact.bind(this);
		this.showChat = this.showChat.bind(this);
		//this.loadMatches();
	}

	componentDidMount(){
    this.fetchMatches();
  }
	
	//requests more potentail matches from the server
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
      //console.log(arrayList);
      this.getUserListData(arrayList);
    }).catch((message) =>{
      this.setState({
        loading_state: 2
      })
    });
	}

  getUserListData(arraylist){
    //console.log(arraylist)
    let promises=[];
    const db = firebase.firestore();
    for(let k in arraylist){
      let result = db.collection("usersPQ").doc(arraylist[k].uid).get()
        .then( (userdoc) => {
          if (userdoc.exists) {
            return userdoc.data();
          } else {
            //console.log('No user data available for ')
           // console.log(arraylist[k]);
          }
        })
        .catch( (error) => {
          //console.log('Error gettign doc from DB for ')
           //console.log(arraylist[k]);
        })
      promises.push(result)
    }
    //wait for all promises in array to finish
    Promise.all(promises).then((newarray) => {
      let arry = []
      for (let i in arraylist){
        if(newarray[i] !== undefined){
          arry.push({
            uid: arraylist[i].uid,
            match_percent: arraylist[i].match_percent,
            user: arraylist[i].user,
            data: newarray[i]
          })
        }
      }
      console.log("Final List:")
      console.log(arry)
      if(arry.length === 0){
        this.setState({
          loading_state: 2
        })
      }
      else{
        this.setState({
          user_list : arry,
          loading_state : 1
        })
      }
    })
  }
	
	showChat(obj, user)
	{
		console.log(user)
		let sendMessageDiv = document.getElementById("show-messages");
		ReactDOM.render(<ShowMessages {...this.props} user={user} />, sendMessageDiv);
		/*
		var messageFrame = document.getElementById("messageFrame");
		var senderMessage = document.getElementById("sampleSenderMessage");
		var selfMessage = document.getElementById("sampleSelfMessage");
		
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
		}*/
	}
	
	showChatReact(ev, user)
	{
		ev.preventDefault();
		//window.alert("HERE");
		this.showChat(ev.currentTarget.id, user);
	}
	
  render() {

    return (
      <div id='MessagesPage'>
        <Header {...this.props} />
        { this.state.loading_state === 0 ?
          <Loading/> :
						this.state.loading_state === 1 ?
							<div>
								<div id="leftFrame">
									<p>Matches</p>
									{this.state.user_list.map((i) =>
                    <MessagesUserSidebarPanel match={i} showChat={(e)=>{this.showChatReact(e, i)}}/>
                  )}
								</div>
								<div id="show-messages"></div>
							</div>
							:
							<div>
								<div id="leftFrame">
									<p>Matches</p>
								</div>
									<ListLoadingError>
										<p>You can't send any messages because you don't have any matches.</p> <p>Find some matches by going to the '<a href='/matching'>Find Matches</a>' page and Liking some users.</p>
									</ListLoadingError>
							</div>
				}
      </div>
    );
  }
}

export default Messages;
