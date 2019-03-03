import React, { Component } from 'react';
import Header from './Header';

class UserSettings extends Component {
  render() {
    return (
      <div id="UserSettingsPage">
        <Header {...this.props}/>
        <h1>User Settings Page</h1>
      </div>
    );
  }
}

export default UserSettings;
