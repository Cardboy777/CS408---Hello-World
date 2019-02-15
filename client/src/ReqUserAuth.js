import React, { Component } from 'react';
import AuthUserContext from './UserSessionContext';


class ReqUserAuth extends Component {
    render() {
    return (
      <AuthUserContext.Consumer>{ AuthUserContext =>{
        if( AuthUserContext !== null ){
          return <React.Fragment>{ this.props.children }</React.Fragment>;
        }
        else{
          return <React.Fragment></React.Fragment>;
        }
      }}</AuthUserContext.Consumer>
    );
  }
}

export default ReqUserAuth;
