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
    this.handleLoggedinUser = this.handleLoggedinUser.bind(this);
    this.signedIn = this.signedIn.bind(this);
  }

	componentDidMount(){
    this.getUserFromLocalStorage()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.handleLoggedinUser(user)
      }
    });
  }
  getUserFromLocalStorage() {
    const uAuth = localStorage.getItem('uAuth');
    const uData = localStorage.getItem('uData');
    if (!uAuth){
      return;
    }
    this.setState({ uAuth : uAuth, uData : uData });
  }
  signedIn(){
    if(this.state.uAuth){
      return true;
    }
    return false;
  }
  
  handleLoggedinUser(user){
    localStorage.setItem('uAuth', user)
    this.setState({uAuth : user});
  
    const db = firebase.firestore();
    const docRef = db.collection("usersPQ").doc(this.state.uAuth.uid);
    docRef.get()
      .then( (userdoc) => {
        if (userdoc.exists) {
          localStorage.setItem('uData', userdoc.data());
          this.setState({uData : userdoc.data()});
        } else {
          this.setState({uData : null});
          console.log('No user data available for '+ this.state.uAuth.uid);
        }
      })
      .catch( (error) => {
          this.setState({uData : null});
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
  }

    render() {
      console.log("uAuth state: " + this.state.uAuth);
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
        <Route path="/" exact render={() => (
              <FrontPage {...this.state}/>
          )} />
          <Route path="/matches" render={() => (
            <Matches {...this.state} />
          )} />
          <Route path="/matching" render={() => (
            <Matching {...this.state} />
          )} />
          <Route path="/messages" render={() => (
            <Messages {...this.state} />
          )} />
          <Route path="/user/profile" render={() => (
            <UserProfile {...this.state} />
          )} />
          <Route path="/user/account" render={() => (
            <UserSettings {...this.state} />
          )} />
          <Route path="/user/questionnaire" render={() => (
            <PersonalityQuestionnaire {...this.state} />
          )} />
          <Route path="/user/cquestionnaire" render={() => (
            <CodingQuestionnaire {...this.state} />
          )} />
          <Route component= { Page404 }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
