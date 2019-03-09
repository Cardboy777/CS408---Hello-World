import React, { Component } from 'react';
import './css/ListLoadingError.css'
import loadingerr from './img/listloadingerr.png';

class ListLoadingError extends Component {
  render() {
    return (
      <div id="ListLoadingErrorPage">
        <img src={loadingerr} alt="Something Went Wrong"/>
        <h2>Something Went Wrong</h2>
        <p>
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default ListLoadingError;
