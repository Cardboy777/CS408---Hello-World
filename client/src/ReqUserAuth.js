import React, { Component } from 'react';
import firebase from './firebase';

class ReqUserAuth extends Component {
  constructor(){
    super();
    this.state={
      currentUser: null
    }
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
      {this.state.currentUser ? {this.props.children} : <React.Fragment/>}
    );
  }
}

export default ReqUserAuth;
