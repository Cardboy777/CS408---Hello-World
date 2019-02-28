import React, { Component } from 'react';
import Header from './Header';
import ProfilePicture from './ProfilePicture';
import Picture from './Picture';

class UserProfile extends Component {
  render() {
    return (
      <div id="UserProfilePage">
        <Header/>
        <br/>
        <div>
          <ProfilePicture/>
        </div>
        <div >
        <Picture/>
        </div>
        
      </div>
    );
  }
}

export default UserProfile;
