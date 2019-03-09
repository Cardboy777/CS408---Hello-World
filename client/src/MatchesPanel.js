import React, { Component } from 'react';
import './css/MatchesPanel.css';
import MiniProfile from './MiniProfile';
import ReportButton from './ReportButton';

class MatchesPanel extends Component {
  constructor(){
    super();
    this.Unlike = this.Unlike.bind(this);
    this.Report = this.Report.bind(this);
    this.MessageUser = this.MessageUser.bind(this);
  }
  Unlike(){
    this.props.unlikeFunct(this.props.userData.user);
  }
  Report(message){
    this.props.reportFunct(this.props.userData.uid, this.props.userData.user, message);
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
        <ReportButton reportHandler={this.Report} userData={this.props.userData}/>
      </div>
    );
  }
}

export default MatchesPanel;
