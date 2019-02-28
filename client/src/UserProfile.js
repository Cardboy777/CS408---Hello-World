import React, { Component } from 'react';
import Header from './Header';
import ProfilePicture from './ProfilePicture';
import Picture from './Picture';
import './css/UserProfile.css';
class UserProfile extends Component {
  render() {
    return (
      <div id="UserProfilePage">
        <Header/><br/>
        <div>
          <ProfilePicture/>
        </div><br/>
        <div>
          <Picture name="pictureFile1"/>
          <Picture name="pictureFile2"/>
          <Picture name="pictureFile3"/>
        </div>
        <button>Edit Personality Qtestionnaire</button>
    </div>
    );
  }
}

export default UserProfile;
