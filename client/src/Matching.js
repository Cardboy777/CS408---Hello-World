import React, { Component } from 'react';
import './Matching.css'
import Navbar from './Navbar';

class Matching extends Component {
  constructor(){
    super();
    this.state = {
      message : null
    }
  }

  //componentent did mount is called when the component is being rendered
  componentDidMount() {
    //fetch a request from the client
    fetch("/api/getTestMessage")
      .then(res=> res.json())
      .then(message => this.setState({ message }, () => console.log('Test Message Fetched..', message)));
  }

  render() {
    return (
      <div>
        <Navbar/>
        <h1>Matching Page{ this.state.message }</h1>
      </div>
    );
  }
}

export default Matching;
