import React, { Component } from 'react';
import './UserProfile.css';
import Navbar from './Navbar';

class UserProfile extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <h1>User Profile { this.state.message }</h1>
      </div>
    );
  }
}

export default UserProfile;
