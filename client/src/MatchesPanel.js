import React, { Component } from 'react';
import './css/MatchesPanel.css';
import default_img from './img/default_profile.png';
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
        <img src={default_img} alt={this.props.userData.user}></img>
        <p className="compat-percent">{this.props.userData.match_percent}%</p>
        <p className="name">{this.props.userData.user}</p>
        <p>{this.props.userData.describe}</p>
        <h5>Favorite Programming Language:</h5>
        <p>{this.props.userData.canswer2}</p>
        <button type="button" onClick={this.MessageUser} className="btn btn-outline-primary">Message</button>
        <button type="button" onClick={this.Unlike} className="btn btn-outline-danger">Unlike</button>
      </div>
    );
  }
}

export default MatchesPanel;
