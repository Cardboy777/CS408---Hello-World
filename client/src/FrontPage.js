import React, { Component } from 'react';
import './FrontPage.css'
import Header from './Header';

class FrontPage extends Component {
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
      <div id="frontpageDiv">
        <Header/>
        <div>
          <div id="title">
            <h1 className="title">HƐ>LO WORLD</h1>
          </div>
        </div>
        <div id="frontpageContainer">
          <div className="row">
            <div className="col-md-4">
              <h4 className="frontpageHeaders">
                What is Hello World
              </h4>
              <p>
                Hello World is the brainchild of a group of Computer Science Majors from Purdue University. Our goal is to make Hello World a place where like-minded programmers can meet. Life's not easy behind a computer screen.
              </p>
            </div>
            <div className="col-md-4">
              <h4 className="frontpageHeaders">
                Who are we
              </h4>
              <p>
                We are a group of Computer Science majors. Hello World is a project designed for our Software Testing Course.
              </p>
            </div>
            <div className="col-md-4">
              <h4 className="frontpageHeaders">
                Getting Started
              </h4>
              <p>
                First, you have to create an account, or if you already have an account, login. Once you're done creating your profile and you've completed our personality and coding questoinnaires, head over to the <a href="/matching">Matching page</a>. 'Like' any of the profiles you're intersted in. Be careful when you 'Dislike' someone, they'll disappear for good!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
