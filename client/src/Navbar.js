import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      username : "default"
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="\">Hello World</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/matches">Find a Match</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/matching">View Your Matches</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.username}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/user/profile">Profile</a>
                <a className="dropdown-item" href="#">Account Settings</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
