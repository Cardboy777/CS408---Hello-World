import React, { Component } from 'react';
import './css/Header.css'
import Navbar from './Navbar';
import LoginHeader from './LoginHeader';
import firebase from './firebase';

class Header extends Component {  
	constructor(){
		super();
		this.state={
			currentUser: null,
		}
		this.redirectPage = this.redirectPage.bind(this);
		this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
	}	
	redirectPage(str) 
	{
		let defaultLocation = "http://localhost:3000/";
		if (str === "login")
		{
			if (window.location.href === defaultLocation) { return; }
			console.log("Link: '" + window.location.href + "'");
			window.location.href = defaultLocation;
		}
	}

		componentDidMount(){
			var user = window.localStorage.getItem("user");
			//console.log(JSON.stringify(user));
      firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
    }
    
    handleAuthStateChange(user){
      if (user) {
        // User is signed in.
        this.setState({currentUser : user});
        this.forceUpdate();
      } else {
        //no user is signed in.
        this.setState({currentUser : null});
        this.forceUpdate();
      }
    }
	
  render() {
	return (
	  <nav id="pageHeader" className="navbar navbar-expand-lg navbar-dark justify-content-between">
			<a className="navbar-brand" href="\">HƐ>lo World</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				{this.state.currentUser ? 
					<Navbar user={this.state.currentUser}/> :
					<LoginHeader/> 
				}
			</div>
		</nav>
	);
    
  }
}
export default Header;

