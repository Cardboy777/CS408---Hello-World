import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MatchingPanel.css';
import default_img from './img/default_profile.png'

class MatchingPanel extends Component {
  render() {
    return (
      <div className="MatchingPanel">
        <img src={this.props.img} alt={this.props.name}></img>
        <p className="compat-percent">{this.props.match_percent}%</p>
        <p className="name">{this.props.name}</p>
        <p>{this.props.desc}</p>
        <h5>Favorite Programming Language:</h5>
        <p>{this.props.fav_lang}</p>
        <button type="button" class="btn btn-outline-primary">Like</button>
        <button type="button" class="btn btn-outline-danger">Dislike</button>
        
      </div>
    );
  }
}

MatchingPanel.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  fav_lang: PropTypes.string,
  img: PropTypes.object,
  match_percent: PropTypes.number
};

MatchingPanel.defaultProps = {
  img: default_img,
  match_percent: 0
};

export default MatchingPanel;
