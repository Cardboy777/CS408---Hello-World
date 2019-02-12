import React, { Component } from 'react';
import './LoginHeader.css'
//import './jquery.js';
//import './js/PageRedirect.js';
//import './js/Login.js';

class LoginHeader extends Component {
    constructor(){
        super();
        this.state={
            loginToggle : true,
			validUsername: false,
			validEmail: false,
			validPassword: false
        };
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.toggleLoginState = this.toggleLoginState.bind(this);
		this.checkUsername = this.checkUsername.bind(this);
		this.checkEmail = this.checkEmail.bind(this);
		this.checkPassword = this.checkPassword.bind(this);
    };

    login=(e)=>{
        e.preventDefault();
        console.log("login");
    };
    signUp=(e)=>{
        e.preventDefault();
        console.log("signUp");
		window.alert("SIGNING UP!");
    };
    toggleLoginState=(e)=>{
        e.preventDefault();
        this.setState({loginToggle : !(this.state.loginToggle)});
        console.log(this.state.toggleLoginState);
        this.forceUpdate();
    };
    clickMe = (e) =>{
        e.preventDefault();
        console.log("Click");
    };
	checkUsername = (e) =>{
        e.preventDefault();
        var usernameString = document.getElementById("usernameBox").value;
		var error = document.getElementById("signupUsernameError");
		if (usernameString.length < 6 || usernameString.length > 20)
		{
			error.innerHTML = "Your username must consist of between 6 and 20 alphanumeric characters."
			error.style.display = "inline-block";
		}
		else if (!usernameString.match(/^[0-9a-z]+$/))
		{
			error.innerHTML = "Your username may only contain letters and numbers."
			error.style.display = "inline-block";
		}
		else
		{
			error.style.display = "none";
			this.setState({validUsername: true});
		}
		this.setState({validUsername: false});
    };
	checkEmail = (e) =>{
        e.preventDefault();
		var email = document.getElementById("emailBox").value;
		var error = document.getElementById("signupEmailError");
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(String(email).toLowerCase()))
		{
			error.style.display = "none";
			this.setState({validEmail: true});
		}
		else
		{
			error.innerHTML = "Your email must be of the form abcd@domain.com";
			error.style.display = "inline-block";
		}
		this.setState({validEmail: false});
	};
	checkPassword = (e) =>{
        e.preventDefault();
		var pass = document.getElementById("passwordBox").value;
		var error = document.getElementById("signupPasswordError");
		if (pass.length < 8 || pass.length > 256)
		{
			error.innerHTML = "Your password must be between 8 and 256 characters."
			error.style.display = "inline-block";
		}
		else
		{
			error.style.display = "none";
			this.setState({validPassword: true});
		}
		this.setState({validPassword: false});
	}

    render() {
        let modal;
        if(this.state.loginToggle){
            modal=
            <div id="login">
                <form className="form-inline">
                    <label for="uname"><b>Username:</b></label>
                    <input id="loginUsername" className="form-control mr-sm-2" type="text" placeholder="Enter Username" name="uname" required/>

                    <label for="psw"><b>Password:</b></label>
                    <input id="loginPassword" className="form-control mr-sm-2" type="password" placeholder="Enter Password" name="psw" required/>
                    
                    <button className="btn button-light" type="submit" onclick={this.login}>Login</button>
                    <br/>
                </form>
                <p>Don't have an account? <a href="#" onClick={this.toggleLoginState}>Sign Up</a></p>
            </div>
            ;
        }
        else{
            modal=
            <form class="modal-content animate" action="">
				<div class="imgcontainer">
					<span onClick={this.toggleLoginState} class="close" title="Close Signup">&times;</span>
				</div>
				<div class="container">
					<label class="black-text" for="username"><b>Username</b></label>
					<input id="usernameBox" type="text" placeholder="Enter Username" name="username" onKeyUp={this.checkUsername} onFocus={this.checkUsername} required/>
					<label class="inputError" id="signupUsernameError">Error:</label>
					
					<label class="black-text" for="email"><b>Email</b></label>
					<input id="emailBox" type="text" placeholder="Enter Email" name="email" onKeyUp={this.checkEmail} onFocus={this.checkEmail} required/>
					<label class="inputError" id="signupEmailError">Error:</label>
					
					<label class="black-text" for="password"><b>Password</b></label>
					<input id="passwordBox" type="password" placeholder="Enter Password" name="password" onKeyUp={this.checkPassword} onFocus={this.checkPassword} required/>
					<label class="inputError" id="signupPasswordError">Error:</label>
					
					<button class="signup" type="button" onclick="signup();">Sign Up</button>
				</div>
			</form>
            ;
        }
        return (
            <div id="LoginHeader" className="navbar navbar-expand-lg navbar-dark">
                {modal}
            </div>
        );
    }
}

export default LoginHeader;
