import React, { Component } from 'react';
import './Matches.css'
import Navbar from './Navbar';

class Matches extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <h1>Matches Page{ this.state.message }</h1>
      </div>
    );
  }
}

export default Matches;
