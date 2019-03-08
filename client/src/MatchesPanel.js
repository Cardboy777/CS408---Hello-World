import React, { Component } from 'react';
import './css/MatchesPanel.css';
import MiniProfile from './MiniProfile';
class MatchesPanel extends Component {
  constructor(){
    super();
    this.Unlike = this.Unlike.bind(this);
    this.MessageUser = this.MessageUser.bind(this);
  }
  Unlike(){
    this.props.unlikeFunct(this.props.userData.user);
  }
  MessageUser(){
    console.log("User wants to send Message to " + this.props.userData.user);
  }
  render() {
    return (
      <div className="MatchesPanel">
        <MiniProfile userData={this.props.userData} match_percent ={this.props.match_percent}/>
        <button type="button" onClick={this.MessageUser} className="btn btn-outline-primary">Message</button>
        <button type="button" onClick={this.Unlike} className="btn btn-outline-danger">Unlike</button>
      </div>
    );
  }
}

export default MatchesPanel;
