import React, { Component } from 'react';
import './css/Matches.css'
import Header from './Header';

class Matches extends Component {
  render() {
    return (
      <div id="matchesPage">
        <Header user={this.props.user}/>
        <h1>Matches Page</h1>
      </div>
    );
  }
}

export default Matches;
