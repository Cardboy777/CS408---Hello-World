import React, { Component } from 'react';
import './css/MatchingPanel.css';
import default_img from './img/default_profile.png';
class MatchingPanel extends Component {
  constructor(){
    super();
    this.Like = this.Like.bind(this);
    this.Dislike = this.Dislike.bind(this);
    this.Skip = this.Skip.bind(this);
  }
  Like(){
    this.props.likeFunct(this.props.userData.user);
  }
  Dislike(){
    this.props.dislikeFunct(this.props.userData.user); 
  }
  Skip(){
    this.props.skipFunct(this.props.userData.user);
  }

  render() {
    return (
      <div className="MatchingPanel">
        <img src={default_img} alt={this.props.userData.user}></img>
        <p className="compat-percent">{this.props.userData.match_percent}%</p>
        <p className="name">{this.props.userData.user}</p>
        <p>{this.props.userData.describe}</p>
        <h5>Favorite Programming Language:</h5>
        <p>{this.props.userData.canswer2}</p>
        <button type="button" onClick={this.Like} className="btn btn-outline-primary">Like</button>
        <button type="button" onClick={this.Dislike}className="btn btn-outline-danger">Dislike</button>
        <button type="button" onClick={this.Skip}className="skip btn btn-outline-secondary">Skip</button>
        
      </div>
    );
  }
}

export default MatchingPanel;
