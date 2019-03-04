import React, { Component } from 'react';
import firebase from './firebase';
import './css/Navbar.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

let unreadMessageCount = 0;

class Navbar extends Component {
  constructor(){
    super();
    this.signOut= this.signOut.bind(this);
	  this.sendSocketData();
  }

  signOut(e){
    e.preventDefault();
    firebase.auth().signOut()
    .then(
      () => {
        //logout successfull
      }
    )
  }
  
  sendSocketData()
  {
	  var uMC = window.localStorage.getItem("unreadMessageCount");
	  if (uMC == undefined) { uMC = "0"; }
	  unreadMessageCount = parseInt(uMC);
	  
	  var tempInterval = setInterval(function()
	  {
		  if (document.getElementById("unreadMessageCount") != undefined)
		  {
			  if (unreadMessageCount > 0)
			  {
				  document.getElementById("unreadMessageCount").innerHTML = unreadMessageCount;
			  }
			  else
			  {
				  document.getElementById("unreadMessageCount").innerHTML = "";
			  }
			  window.clearInterval(tempInterval);
		  }
	  }, 100);
	  
		socket.on('incomingMessage', function(data)
		{
			if (window.location.href != "http://localhost:3000/messages")
			{
				unreadMessageCount++;
				window.localStorage.setItem("unreadMessageCount", (unreadMessageCount + ""));
				document.getElementById("unreadMessageCount").innerHTML = unreadMessageCount;
			}
		});
	  
	  setTimeout(function()
	  {
		  //socket.emit("testMessageClientToServer", "GSRG");
		  var userData = window.localStorage.getItem("user");
		  if (userData === undefined || userData == null) { return; }
		  userData = JSON.parse(userData);
		  if (userData.email === undefined || userData.uid === undefined) { return; }
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
            <a className="nav-link" href="/messages">Messages <span id="unreadMessageCount" className="badge badge-light"></span></a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { this.props.uData ?
                this.props.uData.user :
                "<=== TAKE THE PERSONALITY QUIZ THE BUTTON IS RIGHT OVER THERE"                  
              }
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
