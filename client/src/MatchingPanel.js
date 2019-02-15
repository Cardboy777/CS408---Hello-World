import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    console.log("Like "+ this.props.user.name);
    this.props.likeFunct(this.props.user.name);
  }
  Dislike(){
    console.log("Dislike " + this.props.user.name);
    this.props.dislikeFunct(this.props.user.name); 
  }
  Skip(){
    console.log("Skip " + this.props.user.name);    
  }

  render() {
    return (
      <div className="MatchingPanel">
        <img src={default_img} alt={this.props.user.name}></img>
        <p className="compat-percent">{this.props.user.match_percent}%</p>
        <p className="name">{this.props.user.name}</p>
        <p>{this.props.user.desc}</p>
        <h5>Favorite Programming Language:</h5>
        <p>{this.props.user.fav_lang}</p>
        <button type="button" onClick={this.Like} className="btn btn-outline-primary">Like</button>
        <button type="button" onClick={this.Dislike}className="btn btn-outline-danger">Dislike</button>
        <button type="button" onClick={this.Dislike}className="skip btn btn-outline-secondary">Skip</button>
        
      </div>
    );
  }
}

MatchingPanel.propTypes = {
  user: PropTypes.object.isRequired
};

export default MatchingPanel;
