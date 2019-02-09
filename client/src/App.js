import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import FrontPage from './FrontPage';
import Matches from './Matches';
import Matching from './Matching';
import './App.css';

class App extends Component {
    render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={ FrontPage } />
          <Route path='/matches' component={ Matches }/>
          <Route path= '/matching' component= { Matching }/>
          <Route component= { FrontPage }/>
        </Switch>
      </BrowserRouter> 
    );
  }
}

export default App;
