import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import FrontPage from './FrontPage';
import Matches from './Matches';
import Matching from './Matching';
import Messages from './Messages';
import './css/App.css';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
import Page404 from './Page404';
import firebase from './firebase';
import PersonalityQuestionnaire from './PersonalityQnn';
import CodingQuestionnaire from './CodingQnn';

class App extends Component {
  constructor(){
    super();
    this.state={
      uAuth: null,
      uData: null,
      isAuthenticating: true
    }
    this.handleLoggedinUser = this.handleLoggedinUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  Authentification(){
    this.getUserFromLocalStorage()
    if(this.state.isAuthenticating){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.handleLoggedinUser(user)
          //window.alert("user logged in");
        }
        else{
          //No user should be logged in
          localStorage.removeItem('uAuth');
          localStorage.removeItem('uData');
          this.setState({
            uAuth: null,
            uData: null,
            isAuthenticating: false
          })
        }
      });
    }
   
  }

	componentDidMount(){
    this.Authentification();
  }
  getUserFromLocalStorage() {
    const uAuth = localStorage.getItem('uAuth');
    const uData = localStorage.getItem('uData');
    if (!uAuth || !uData){
      return;
    }
    this.setState(
      { uAuth: uAuth,
        uData: uData
      });
  }

  isLoggedIn(){
    if(!this.state.isAuthenticating && this.state.uAuth){
      return true;
    }
    return false;
  }

  needToTakeQuestionnaires(){
    if(!this.isLoggedIn()){
      return false;
    }
    if(!this.state.uData){
      return true;
    }
    if(!this.state.uData.CQComplete || !this.state.uData.PQComplete){
      return true;
    }
    return false;
  }
  
  handleLoggedinUser(user){
    const db = firebase.firestore();
    db.collection("usersPQ").doc(user.uid).get()
      .then( (userdoc) => {
        if (userdoc.exists) {
          localStorage.setItem('uAuth', user);
          localStorage.setItem('uData', userdoc.data());
          this.setState({
            uAuth : user,
            uData : userdoc.data(),
            isAuthenticating: false
          });
        } else {
          this.setState({
            uAuth : user,
            uData : null,
            isAuthenticating: false
          });
          console.log('No user data available for '+ this.state.uAuth.uid);
        }
      })
      .catch( (error) => {
        this.setState({
          uAuth : user,
          uData : null,
          isAuthenticating: false
        });
          console.log("Error getting User Data:\n" + error);
      });

      /*const db = firebase.firestore();
		
		var age = db.collection("usersPQ").doc(user.uid).get().then(function(userData)
		{
			if (userData.exists)
			{
				var data = userData.data();
				if (data.PQComplete == undefined || data.PQComplete != true)
				{
					if (window.location.href != linkPQ)
					{
						window.location.href = linkPQ;
					}
				}
				else if (data.CQComplete == undefined || data.CQComplete != true)
				{
					if (window.location.href != linkCQ)
					{
						window.location.href = linkCQ;
					}
				}
			}
			else
			{
				if (window.location.href != linkPQ)
				{
					window.location.href = linkPQ;
				}
			}
		}).error(function(err)
		{
			alert("Error getting stuff");
		});
		
		var aa = setInterval(function()
		{
			db.collection("usersPQ").doc(user.uid).update({
				lastOnlineTime: new Date().getTime(),
			});
		}, 10000);*/
		
		db.collection("usersByEmail").doc(user.email).get().then(function(userData)
		{
			if (userData.exists)
			{
				var data = userData.data();
				db.collection("usersByEmail").doc(user.email).update({
					lastOnlineTime: new Date().getTime(),
				});
			}
			else
			{
				db.collection("usersByEmail").doc(user.email).set({
					lastOnlineTime: new Date().getTime(),
				});
			}
		});
		
		var aa = setInterval(function()
		{
			db.collection("usersByEmail").doc(user.email).update({
				lastOnlineTime: new Date().getTime(),
			});
		}, 10000);
  }

  render() {
    //console.log("uAuth: " + this.state.uAuth + "\tuData: " + this.state.uData + "\tAuthenticting: " + this.state.isAuthenticating);
    return (
      <div id="App">
        { !this.state.isAuthenticating ?
           this.needToTakeQuestionnaires() ?
              <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route path="/user/questionnaire" render={() => (
                  <PersonalityQuestionnaire {...this.state} />
                )} />
                <Route path="/user/cquestionnaire" render={() => (
                  <CodingQuestionnaire {...this.state} />
                )} />
                <Route render={() => (
                  this.state.uData && this.state.uData.PQComplete ?
                  <Redirect to='/user/cquestionnaire'/> :
                  <Redirect to='/user/questionnaire'/>
                )} />
              </Switch>
            </BrowserRouter> : 
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Switch>
              <Route path="/" exact render={() => (
                  <FrontPage {...this.state}/>       
                )} />
                <Route path="/matches" render={() => (
                  this.isLoggedIn() ?
                    <Matches {...this.state} /> :
                    <Redirect to='/'/>
                )} />
                <Route path="/matching" render={() => (
                  this.isLoggedIn() ?
                    <Matching {...this.state} /> :
                    <Redirect to='/'/>
                )} />
                <Route path="/messages" render={() => (
                  this.isLoggedIn() ?
                    <Messages {...this.state} /> :
                    <Redirect to='/'/>
                )} />
                <Route path="/user/profile" render={() => (
                  this.isLoggedIn() ?
                    <UserProfile {...this.state} /> :
                    <Redirect to='/'/>
                )} />
                <Route path="/user/account" render={() => (
                  this.isLoggedIn() ?
                    <UserSettings {...this.state} /> :
                    <Redirect to='/'/>
                )} />
                <Route path="/user/questionnaire" render={() => (
                  this.isLoggedIn() ?
                    <PersonalityQuestionnaire {...this.state} /> :
                    <Redirect to='/'/>
                )} />
                <Route path="/user/cquestionnaire" render={() => (
                  this.isLoggedIn() ?
                    <CodingQuestionnaire {...this.state} /> :
                    <Redirect to='/'/>
                )} />
                <Route component= { Page404 }/> :
                  <Redirect to='/'/>
              </Switch>
            </BrowserRouter> :
            <React.Fragment></React.Fragment>
        }
      </div>
    );
  }
}

export default App;
