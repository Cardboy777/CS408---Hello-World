import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import FrontPage from './FrontPage';
import Matches from './Matches';
import Matching from './Matching';
import './App.css';
import PersonalityQuestionnaire from './PersonalityQnn';
class App extends Component {
    render() {
    return (
      <PersonalityQuestionnaire/>
      /*<BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={ FrontPage } />
          <Route path='/matches' component={ Matches }/>
          <Route path= '/matching' component= { Matching }/>
          <Route component= { FrontPage }/>
        </Switch>
      </BrowserRouter> */
    );
  }
}

export default App;
