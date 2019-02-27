import React, { Component } from 'react';
import Header from './Header';
import ProfilePicture from './ProfilePicture';
import Pictures from './Pictures';

class UserProfile extends Component {
  render() {
    return (
      <div id="UserProfilePage">
        <Header/>
        <br/>
        <div>
          <ProfilePicture/>
        </div>
        <div>
        </div>
        
      </div>
    );
  }
}

export default UserProfile;
