import React, { Component } from 'react';
import firebase from './firebase';
import './css/Navbar.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

class Navbar extends Component {
  constructor(){
    super();
    this.signOut= this.signOut.bind(this);
	this.sendSocketData();
  }
  signOut(e){
    e.preventDefault();
    firebase.auth().signOut().then(this.forceUpdate()).catch(function(error) {
      // An error happened.
	  
    }).then(function()
	{
		window.location.href = "http://localhost:3000/"
	});;
  }
  
  sendSocketData()
  {
	  setTimeout(function()
	  {
		  socket.emit("testMessageClientToServer", "GSRG");
		  var userData = window.localStorage.getItem("user");
		  if (userData == undefined || userData == null) { return; }
		  userData = JSON.parse(userData);
		  if (userData.email == undefined || userData.uid == undefined) { return; }
		  var newData = {};
		  newData.email = userData.email;
		  newData.token = userData.uid;
		  socket.emit('giveSocketData', newData);
	  }, 500);
	  
  }
  
  render() {
    return (
      <div id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/user/questionnaire">Take the Questionnaire</a>
          </li>
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
                {this.props.user.uid}
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
