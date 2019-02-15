import React, { Component } from 'react';
import AuthUserContext from './UserSessionContext';
import firebase from './firebase';
import './css/Navbar.css';

class Navbar extends Component {
  constructor(){
    super();
    this.signOut= this.signOut.bind(this);
  }
  signOut(e){
    e.preventDefault();
    firebase.auth().signOut().then(this.forceUpdate()).catch(function(error) {
      // An error happened.
    });
  }
  render() {
    return (
      <div id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/matching">Find a Match</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/matches">View Your Matches</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/messages">Messages</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <AuthUserContext.Consumer>{
                AuthUserContext =>
                AuthUserContext.username
            }</AuthUserContext.Consumer>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/user/profile">Profile</a>
              <a className="dropdown-item" href="/user/account">Account Settings</a>
              <div className="dropdown-divider"></div>
              <button id="loginLogoutButton" className="btn btn-link dropdown-item" onClick={this.signOut}>Logout</button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
