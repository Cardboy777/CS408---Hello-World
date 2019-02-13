import React, { Component } from 'react';
import './Header.css'
import Navbar from './Navbar';
import LoginHeader from './LoginHeader';
//import './js/PageRedirect.js';

class Header extends Component {  	
	redirectPage(str) 
	{
		let defaultLocation = "http://localhost:3000/";
		if (str == "login")
		{
			if (window.location.href == defaultLocation) { return; }
			console.log("Link: '" + window.location.href + "'");
			//window.location.href = defaultLocation;
		}
	}
	
	componentDidMount() {
		var userData = window.localStorage.getItem("user");
		if (userData == undefined || userData.length < 1) { this.redirectPage("login"); return; }
		var data = JSON.parse(userData);
		if (data && data.UserKey == undefined) { this.redirectPage("login"); return; }
	}
	
  render() {
    let headerContent;
    //user is logged in Use proper navbar
    if(0){
      headerContent = <Navbar/>;
    }
    //else use login bar
    else{
      headerContent= <LoginHeader/>;
    }
	return (
	  <nav id="pageHeader" className="navbar navbar-expand-lg navbar-dark justify-content-between">
		<a className="navbar-brand" href="\">HƐ>lo World</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		  <span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
		  {headerContent}
		</div>
	  </nav>
	);
    
  }
}

export default Header;
