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
import AuthUserContext from './UserSessionContext';
import ReqUserAuth from './ReqUserAuth';
import firebase from './firebase';
import PersonalityQuestionnaire from './PersonalityQnn';

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
      } else {
        //no user is signed in.
        this.setState({currentUser : null});
        this.forceUpdate();
      }
    }

    render() {
    return (     
      <AuthUserContext.Provider value={this.state.currentUser}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path='/' exact component={ FrontPage } />
              <Route path='/matches' component={ Matches }/>
              <Route path= '/matching' component= { Matching }/>
              <Route path= '/messages' component= { Messages }/>
              <Route path= '/user/profile' component= { UserProfile }/>
              <Route path= '/user/account' component= { UserSettings }/>
              <Route path= '/user/questionnaire' component= { PersonalityQuestionnaire }/>
            <Route component= { Page404 }/>
          </Switch>
        </BrowserRouter> 
      </AuthUserContext.Provider>
    );
  }
}

export default App;
