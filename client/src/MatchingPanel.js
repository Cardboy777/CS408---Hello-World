import React, { Component } from 'react';
import './css/MatchingPanel.css';
import MiniProfile from './MiniProfile';
import ReportButton from './ReportButton';
class MatchingPanel extends Component {
  constructor(){
    super();
    this.Like = this.Like.bind(this);
    this.Dislike = this.Dislike.bind(this);
    this.Skip = this.Skip.bind(this);
    this.Report = this.Report.bind(this);
  }
  Like(e){
    e.preventDefault();
    this.props.likeFunct(this.props.userData.user);
  }
  Dislike(e){
    e.preventDefault();
    this.props.dislikeFunct(this.props.userData.user); 
  }
  Skip(e){
    e.preventDefault();
    this.props.skipFunct(this.props.userData.user);
  }
  Report(message){
    this.props.reportFunct(this.props.userData.uid, this.props.userData.user, message);
  }

  render() {
    return (
      <div className="MatchingPanel">
        <MiniProfile userData={this.props.userData} match_percent={this.props.match_percent}/>
        <button type="button" onClick={this.Like} className="btn btn-outline-primary">Like</button>
        <button type="button" onClick={this.Dislike}className="btn btn-outline-danger">Dislike</button>
        {/*
        <button type="button" onClick={this.Skip}className="skip btn btn-outline-secondary">Skip</button>
        */}
        <ReportButton reportHandler={this.Report} userData={this.props.userData}/>
      </div>
    );
  }
}

export default MatchingPanel;
