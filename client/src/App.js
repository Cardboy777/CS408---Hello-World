import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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

class App extends Component {
  constructor(){
    super();
    this.state={
      currentUser: null
    }
    this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
  }
	
    componentDidMount(){
      firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
    }
    
    handleAuthStateChange(user){
      if (user) {
        // User is signed in.
        this.setState({currentUser : user});
        this.forceUpdate();
		
		const db = firebase.firestore();
		
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
				else if (data.CQComplete == undefined || data.CQComplet != true)
				{
					////redirect to CQ
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
		}, 10000);
		
		
      } else {
        //no user is signed in.
        this.setState({currentUser : null});
        this.forceUpdate();
      }
    }

    render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/' exact component={ FrontPage } />
            <Route path='/matches' component={ Matches }/>
            <Route path= '/matching' component= { Matching }/>
            <Route path= '/messages' component= { Messages }/>
            <Route path= '/user/profile' component= { UserProfile }/>
            <Route path= '/user/account' component= { UserSettings }/>
            <Route path= '/user/questionnaire' component= { PersonalityQuestionnaire }/>
            <Route path= '/user/cquestionnaire' component= { CodingQuestionnaire }/>
          <Route component= { Page404 }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
