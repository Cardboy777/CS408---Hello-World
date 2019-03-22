import React, { Component } from 'react';
import firebase from './firebase'
import './css/MessagesUserSidebarPanel.css'
import offline_nub from './img/offline.png'
import online_nub from './img/online.png'

class MessagesUserSidebarPanel extends Component {
  constructor(){
    super()
    this.state={
      url: null,
      online: null
    }
  }

  componentDidMount(){
    if(this.props.match.data.avatarFile !== undefined){
      firebase.storage().ref().child('images/' + this.props.match.data.avatarFile).getDownloadURL().then((URL) => {
        this.setState({
            url: URL,
        }); 
      })
      .catch(function(error){
          console.log(error);
      })
    }
    else{

    }

    const db =firebase.firestore();
        let that =this;

        const statRef = db.collection("userStats").doc(this.props.match.data.uid);
        statRef.get().then(function(doc) {
            var lastOnlineTime = doc.data().lastOnlineTime || new Date().getTime();
            var lastCheck = Math.floor((new Date().getTime() - lastOnlineTime) / 1000);
            let lonline;
            if (lastCheck < 11000)
            {
              lonline=true;
            }
            else
            {
              lonline=false;
            }
            that.setState({
              online: lonline
            });
        }).catch(function(error) {
        console.log("Error getting document:", error);
        });


  }

  isOnline(){
    if(this.state.online !== null){
        return this.state.online
    }
    return false
  }

  render() {
    return (
      <div className="MessagesUserSidebarPanel">
        <div className="user-holder matched-button" onClick={this.props.showChat}>
            {this.state.url ?
              <img src={this.state.url} className="userMessageImage"></img>
            :
              <img src="favicon.ico" className="userMessageImage"></img>
            }
            <h6 className="user-message-name">
              {this.props.match.data.user}
              {this.isOnline() ?
                <img src={online_nub} className="online"></img>
              :
                <img src={offline_nub} className="offline"></img>
              }
            </h6>
          </div>
      </div>
    );
  }
}

export default MessagesUserSidebarPanel;
