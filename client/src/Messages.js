import React, { Component } from 'react';
import Header from './Header';

class Messages extends Component {
  render() {
    return (
      <div>
        <Header {...this.props}/>
        <h1>Messages Page</h1>
      </div>
    );
  }
}

export default Messages;
