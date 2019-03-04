import React, { Component } from 'react';
import './css/Loading.css'
import loading from './img/loading.gif';

class Loading extends Component {
  render() {
    return (
      <div id="LoadingPage">
        <img src={loading} alt="Loading"/>
        <h2>Loading...</h2>
      </div>
    );
  }
}

export default Loading;
