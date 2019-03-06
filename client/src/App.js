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
import loading from './img/loading.gif';

class App extends Component {
  constructor(){
    super();
    this.state={
      uAuth: null,
      uData: null,
      checkedUser: false
    }
    this.handleLoggedinUser = this.handleLoggedinUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

	componentDidMount(){
    this.getUserFromLocalStorage()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.handleLoggedinUser(user)
        window.alert("User exists"+user.uid);
      }
      else{
        this.setState({
          checkedUser: true
        })
        window.alert("User not logged in! ");
      }
    });
  }
  getUserFromLocalStorage() {
    const uAuth = localStorage.getItem('uAuth');
    const uData = localStorage.getItem('uData');
    if (!uAuth || !uData){
      return;
    }
    this.setState(
      { uAuth: uAuth,
        uData: uData,
        checkedUser: true
      });
  }

  isLoggedIn(){
    if(this.state.checkedUser && this.state.uAuth){
      return true;
    }
    return false;
  }
  
  handleLoggedinUser(user){
    localStorage.setItem('uAuth', user)
    const db = firebase.firestore();
    db.collection("usersPQ").doc(user.uid).get()
      .then( (userdoc) => {
        if (userdoc.exists) {
          localStorage.setItem('uData', userdoc.data());
          this.setState({
            uAuth : user,
            uData : userdoc.data(),
            checkedUser: true
          });
        } else {
          this.setState({
            uAuth : user,
            uData : null,
            checkedUser: true
          });
          console.log('No user data available for '+ this.state.uAuth.uid);
        }
      })
      .catch( (error) => {
        console.log("Here4-3");
        this.setState({
          uAuth : user,
          uData : null,
          checkedUser: true
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
  }

  render() {
    return (
      <div id="App">
        { this.state.checkedUser ?
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
            <Route path="/" exact render={() => (
                <FrontPage {...this.state}/>       
              )} />
              <Route path="/matches" render={() => (
                this.state.uAuth ?
                  <Matches {...this.state} /> :
                  <Redirect to='/'/>
              )} />
              <Route path="/matching" render={() => (
                this.state.uAuth ?
                  <Matching {...this.state} /> :
                  <Redirect to='/'/>
              )} />
              <Route path="/messages" render={() => (
                this.state.uAuth ?
                  <Messages {...this.state} /> :
                  <Redirect to='/'/>
              )} />
              <Route path="/user/profile" render={() => (
                this.state.uAuth ?
                  <UserProfile {...this.state} /> :
                  <Redirect to='/'/>
              )} />
              <Route path="/user/account" render={() => (
                this.state.uAuth ?
                  <UserSettings {...this.state} /> :
                  <Redirect to='/'/>
              )} />
              <Route path="/user/questionnaire" render={() => (
                this.state.uAuth ?
                  <PersonalityQuestionnaire {...this.state} /> :
                  <Redirect to='/'/>
              )} />
              <Route path="/user/cquestionnaire" render={() => (
                this.state.uAuth ?
                  <CodingQuestionnaire {...this.state} /> :
                  <Redirect to='/'/>
              )} />
              <Route component= { Page404 }/> :
                <Redirect to='/'/>
            </Switch>
          </BrowserRouter> :
          <div id="loading">
            <img src={loading} alt="Loading"/>
            <h2>Loading...</h2>
          </div>
          
        }
      </div>
    );
  }
}

export default App;
