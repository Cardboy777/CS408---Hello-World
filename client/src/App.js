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

const linkPQ = "http://localhost:3000/user/questionnaire";
const linkCQ = "http://localhost:3000/user/cquestionnaire";

class App extends Component {
  constructor(){
    super();
    this.state={
      uAuth: null,
      uData: null
    }
    this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
  }
	
  componentWillMount(){
    this.getUserFromLocalStorage()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.handleAuthStateChange(user)
      }
    });
  }
  getUserFromLocalStorage() {
    const uAuth = localStorage.getItem('uAuth');
    const uData = localStorage.getItem('uData');
    if (!uAuth) return;
    this.setState({ uAuth : uAuth, uData : uData });
  }
  signedIn = () => {
    return this.state.uAuth
  }
  
  handleAuthStateChange(user){
    localStorage.setItem('uAuth', user)
    // User is signed in.
    this.setState({uAuth : user});

    const db = firebase.firestore();
    const docRef = db.collection("usersPQ").doc(this.state.uAuth.uid);
    docRef.get()
      .then( (userdoc) => {
        if (userdoc.exists) {
            localStorage.setItem('uData', userdoc.data())
            this.setState({uData : userdoc.data()});
        } else {
            console.log('No user data available for '+ this.state.uAuth.uid);
        }
      })
      .catch( (error) => {
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
          alert("Data DNE");
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
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact render={() => (
              <FrontPage {...this.state}/>
          )} />
          <Route path="/matches" render={() => (
            this.signedIn()
              ? <Matches {...this.state} />
              : <Redirect to="/" />
          )} />
          <Route path="/matching" render={() => (
            this.signedIn()
              ? <Matching {...this.state} />
              : <Redirect to="/" />
          )} />
          <Route path="/messages" render={() => (
            this.signedIn()
              ? <Messages {...this.state} />
              : <Redirect to="/" />
          )} />
          <Route path="/user/profile" render={() => (
            this.signedIn()
              ? <UserProfile {...this.state} />
              : <Redirect to="/" />
          )} />
          <Route path="/user/account" render={() => (
            this.signedIn()
              ? <UserSettings {...this.state} />
              : <Redirect to="/" />
          )} />
          <Route path="/user/questionnaire" render={() => (
            this.signedIn()
              ? <PersonalityQuestionnaire {...this.state} />
              : <Redirect to="/" />
          )} />
          <Route path="/user/cquestionnaire" render={() => (
            this.signedIn()
              ? <CodingQuestionnaire {...this.state} />
              : <Redirect to="/" />
          )} />
          <Route component= { Page404 }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
