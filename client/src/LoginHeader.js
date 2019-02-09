import React, { Component } from 'react';
import './LoginHeader.css'
//import './jquery.js';
import './js/PageRedirect.js';
//import './js/Login.js';

class LoginHeader extends Component {
    constructor(){
        super();
        this.state={
            loginToggle : true
        };
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.toggleLoginState = this.toggleLoginState.bind(this);
    };

    login=(e)=>{
        e.preventDefault();
        console.log("login");
    };
    signUp=(e)=>{
        e.preventDefault();
        console.log("signUp");
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
            <div id="register">
                <form className="form-inline">
                    <label for="uname"><b>Username:</b></label>
                    <input id="signupUsername" className="form-control mr-sm-2" type="text" placeholder="Enter Username" name="uname" required/>
                    
                    <label for="uname"><b>Email:</b></label>
                    <input id="signupEmail" className="form-control mr-sm-2" type="text" placeholder="Enter Email" name="uname" required/>

                    <label for="psw"><b>Password:</b></label>
                    <input id="signupPassword" className="form-control mr-sm-2" type="password" placeholder="Enter Password" name="psw" required/>
                    
                    <button className="btn button-light signup" onclick={this.signUp}>Sign Up</button>
                    <br/>
                </form>
                <p>Have an account? <a href="#" onClick={this.toggleLoginState}>Sign In</a></p>
            </div>
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
