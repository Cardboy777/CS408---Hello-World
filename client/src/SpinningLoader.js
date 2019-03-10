import React, { Component } from 'react';
import firebase from './firebase';
import './css/SpinningLoader.css';

//takes in prop userPQ data and renders the users profile image, if no profile image, then render the default profile picture

class SpinningLoader extends Component {

  render() {
    return (
      <div className='SpinningLoader loader'>
      </div>      
    );
  }
}

export default SpinningLoader;
