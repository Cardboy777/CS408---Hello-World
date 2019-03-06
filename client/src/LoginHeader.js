import React, { Component } from 'react';
import './css/LoginHeader.css';
import firebase from './firebase';

class LoginHeader extends Component {
    constructor(){
        super();
        this.state={
            loginToggle : true,
			validUsername: false,
			validEmail: false,
			validPassword: false,
			username: '',
			password: '',
			email: ''
        };
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.toggleLoginState = this.toggleLoginState.bind(this);
		this.checkUsername = this.checkUsername.bind(this);
		this.checkEmail = this.checkEmail.bind(this);
		this.checkPassword = this.checkPassword.bind(this);
		this.updateLoginEmail = this.updateLoginEmail.bind(this);
		this.updateLoginPassword = this.updateLoginPassword.bind(this);
    }
	
	updateLoginEmail(e){
		e.preventDefault();
		var email = document.getElementById("loginEmail").value;
		this.setState({email : email});
	}
	updateLoginPassword(e){
		e.preventDefault();
		var password = document.getElementById("loginPassword").value;
		this.setState({password : password});
	}

    login(e){
		e.preventDefault();
		//console.log("Email: " + this.state.email + "   Password: "+ this.state.password);
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(dat)
		{
			var newUser = {};
			newUser.uid = dat.user.uid;
			newUser.email = dat.user.email;
			window.localStorage.setItem("user", JSON.stringify(newUser));
			window.location.reload();
			
			//alert("New data: " + JSON.stringify(newUser));
		}).catch(function(error) {
			// Handle Errors here.
			console.log(JSON.stringify(error));
			let errorElement = document.getElementById("loginError");
			errorElement.innerHTML='Login Error';
			errorElement.style.display = "inline-block";
			// ...
		  });
    }
    signUp(e){
		e.preventDefault();
		if (this.state.validUsername === true && this.state.validEmail === true && this.state.validPassword === true)
		{
			/*firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(data){
				window.alert(JSON.stringify(data.user.uid));
				const db=firebase.firestore;
			if(data.user.uid){
				window.alert("help");
				db.collection("usersPQ").doc(data.user.uid).set({
					uid:data.user.uid,
					user: this.state.username,
					gender: '',
					age: '',
					location: '',
					PQComplete: false,
					CQComplete:false,
					attractGender: '',
					panswer1: '',
					panswer2: '',
					panswer3: '',
					panswer4: '',
					panswer5: '',
					panswer6: '',
					panswer7: '',
					panswer8: '',
					panswer9: '',
					panswer10: '',
					panswer11: '',
					panswer12: '',
					panswer13: '',
					panswer14:'',
					panswer15: '',
					panswer16: '',
					panswer17: '',
					describe: '',
					canswer1:'',
					canswer2:'',
					canswer3:'',
					canswer4:'',
					canswer5:'',
					canswer6:'',
					canswer7:'',
					canswer8:'',
					canswer9:'',
					canswer10:'',
					avatarFile:'b76c5a34-13eb-4c4d-bd3f-a81c73bcea4e.png',
					pictureFile1:'1efd88dc-6df2-4735-81ea-93a555901556.jpg',
					pictureFile2:'1efd88dc-6df2-4735-81ea-93a555901556.jpg',
					pictureFile3:'1efd88dc-6df2-4735-81ea-93a555901556.jpg'
				}).then(function() {
					console.log("Document successfully written!");
				})
				.catch(function(error) {
					console.error("Error writing document: ", error);
				});
			}*/
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(dat)
			{
				var newUser = {};
				newUser.uid = dat.user.uid;
				newUser.email = dat.user.email;
				window.localStorage.setItem("user", JSON.stringify(newUser));
		

			}).catch(function(error) {
				// Handle Errors here.
				let errorCode = error.code;
				let errorMessage = error.message;
				console.log("Error: " + errorCode + "\n" + errorMessage);
			});
		
		}
		//let transitionTo = Router.transitionTo('/PersonalityQuestionnaire')

    }
    toggleLoginState(e){
        e.preventDefault();
        this.setState({loginToggle : !(this.state.loginToggle)});
		if (this.state.loginToggle === false)
		{
			setTimeout(function()
			{
				var holder = document.getElementById("frontpageDiv");
				var signupForm = document.getElementById("signupForm");
				if (holder !== undefined && signupForm !== undefined)
				{
					holder.insertBefore(signupForm, holder.children[1]);
				}
			}, 100);
		}
        this.forceUpdate();
    }
	checkUsername(e){
		e.preventDefault();
		var usernameString = document.getElementById("usernameBox").value;
		this.setState({username : usernameString});
		var error = document.getElementById("signupUsernameError");

		if (usernameString.length === 0) { error.style.display = "none"; return; }
		if (usernameString.length < 6 || usernameString.length > 20)
		{
			error.innerHTML = "Your username must consist of between 6 and 20 alphanumeric characters."
			error.style.display = "inline-block";
		}
		else if (!usernameString.match(/^[0-9a-zA-Z]+$/))
		{
			error.innerHTML = "Your username may only contain letters and numbers."
			error.style.display = "inline-block";
		}
		else
		{
			error.style.display = "none";
			this.setState({validUsername: true});
			return;
		}
		this.setState({validUsername: false});
    }
	checkEmail(e){
        e.preventDefault();
		//regex copied from stack overflow
		var email = document.getElementById("emailBox").value;
		this.setState({email : email});
		var error = document.getElementById("signupEmailError");
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (email.length === 0) { error.style.display = "none"; return; }
		if (re.test(String(email).toLowerCase()))
		{
			error.style.display = "none";
			this.setState({validEmail: true});
			return;
		}
		else
		{
			error.innerHTML = "Your email must be of the form abcd@domain.com";
			error.style.display = "inline-block";
		}
		this.setState({validEmail: false});
	}
	checkPassword(e){
        e.preventDefault();
		var pass = document.getElementById("passwordBox").value;
		this.setState({password : pass});
		var error = document.getElementById("signupPasswordError");
		if (pass.length === 0) { error.style.display = "none"; return; }
		if (pass.length < 8 || pass.length > 256)
		{
			error.innerHTML = "Your password must be between 8 and 256 characters."
			error.style.display = "inline-block";
		}
		else
		{
			error.style.display = "none";
			this.setState({validPassword: true});
			return;
		}
		this.setState({validPassword: false});
	}

    render() {
        let modal;
        if(this.state.loginToggle){
            modal=
            <div id="login">
                <form className="form-inline">
                    <label htmlFor="uname"><b>Email:</b></label>
                    <input id="loginEmail" className="form-control mr-sm-2" type="text" onKeyUp={this.updateLoginEmail}  onBlur={this.updateLoginEmail} placeholder="Enter Login Email" name="uname" required/>

                    <label htmlFor="psw"><b>Password:</b></label>
                    <input id="loginPassword" className="form-control mr-sm-2" type="password" onKeyUp={this.updateLoginPassword} onBlur={this.updateLoginPassword} placeholder="Enter Password" name="psw" required/>

                    <button className="btn btn-primary" type="submit" onClick={this.login}>Login</button>
					<label className="loginError" id="loginError"></label>
                </form>
                <p>Don't have an account? <button className="btn btn-link" onClick={this.toggleLoginState}>Sign Up</button></p>
            </div>
            ;
        }
        else{
            modal=
			<div className="centerThis">
				<form id="signupForm" className="modal-content animate" action="">
					<div className="imgcontainer">
						<span onClick={this.toggleLoginState} className="close" title="Close Signup">&times;</span>
					</div>
					<div className="container">
						<label className="black-text" htmlFor="username"><b>Username</b></label>
						<input id="usernameBox" type="text" placeholder="Enter Username" name="username" onKeyUp={this.checkUsername} onFocus={this.checkUsername} onBlur={this.checkUsername} required/>
						<label className="inputError" id="signupUsernameError">Error:</label>
						
						<label className="black-text" htmlFor="email"><b>Email</b></label>
						<input id="emailBox" type="text" placeholder="Enter Email" name="email" onKeyUp={this.checkEmail} onFocus={this.checkEmail} onBlur={this.checkEmail} required/>
						<label className="inputError" id="signupEmailError">Error:</label>
						
						<label className="black-text" htmlFor="password"><b>Password</b></label>
						<input id="passwordBox" type="password" placeholder="Enter Password" name="password" onKeyUp={this.checkPassword} onFocus={this.checkPassword} onBlur={this.checkPassword} required/>
						<label className="inputError" id="signupPasswordError">Error:</label>
						
						<button className="signup" type="button" onClick={this.signUp}>Sign Up</button>
					</div>
				</form>
			</div>
            ;
        }
        return (
			<div id="LoginHeader" className="">
				{modal}
			</div>
        );
    }
}

export default LoginHeader;
