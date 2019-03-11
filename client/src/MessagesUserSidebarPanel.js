import React, { Component } from 'react';
import firebase from './firebase'
import './css/MessagesUserSidebarPanel.css'

class MessagesUserSidebarPanel extends Component {
  constructor(){
    super()
    this.state={
      url: null
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
            <h6 className="user-message-name">{this.props.match.data.user}</h6>
          </div>
      </div>
    );
  }
}

export default MessagesUserSidebarPanel;
