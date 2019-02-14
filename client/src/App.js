import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import FrontPage from './FrontPage';
import Matches from './Matches';
import Matching from './Matching';
import Messages from './Messages';
import './App.css';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
import Login from './Login';
import Logout from './Logout';
import PersonalityQuestionnaire from './PersonalityQnn';

class App extends Component {
    render() {
    return (     
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={ FrontPage } />
          <Route path='/matches' component={ Matches }/>
          <Route path= '/matching' component= { Matching }/>
          <Route path= '/messages' component= { Messages }/>
          <Route path= '/user/profile' component= { UserProfile }/>
          <Route path= '/user/account' component= { UserSettings }/>
          <Route path= '/login' component= { Login }/>
          <Route path= '/logout' component= { Logout }/>
          <Route component= { FrontPage }/>
        </Switch>
      </BrowserRouter> 
      
    );
  }
}

export default App;
