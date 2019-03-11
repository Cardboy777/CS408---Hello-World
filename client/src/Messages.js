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
import MessageNotifications from './MessageNotifications';

const db = firebase.firestore();

class Messages extends Component {
	constructor(){
		super();
		this.state = {
				loading_state: 0,
				user_list: null,
    }
		this.fetchMatches = this.fetchMatches.bind(this);
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
	
	showChat(user)
	{
		console.log(user)
    let sendMessageDiv = document.getElementById("show-messages");
    ReactDOM.unmountComponentAtNode(sendMessageDiv)
		ReactDOM.render(<ShowMessages {...this.props} user={user} />, sendMessageDiv);
	}
	
  render() {

    return (
      <div id='MessagesPage'>
        <Header {...this.props} />
		<MessageNotifications/>
        { this.state.loading_state === 0 ?
          <Loading/> :
						this.state.loading_state === 1 ?
							<div>
								<div id="leftFrame">
									<h4 id='leftbar-name'>Matches</h4>
									{this.state.user_list.map((i) =>
                    <MessagesUserSidebarPanel key={i.data.uid} match={i} showChat={(e)=>{this.showChat(i)}}/>
                  )}
								</div>
								<div id="show-messages" className='col-md-10 offset-2'></div>
							</div>
							:
							<div>
								<div id="leftFrame">
                  <h4 id='leftbar-name'>Matches</h4>
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