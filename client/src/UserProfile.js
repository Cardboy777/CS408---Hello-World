import React, { Component } from 'react';
import Header from './Header';
import ProfilePicture from './ProfilePicture'

class UserProfile extends Component {
  render() {
    return (
      <div id="UserProfilePage">
        <Header/>
        <h1>Profile Page</h1>
        <ProfilePicture/>
      </div>
    );
  }
}

export default UserProfile;
