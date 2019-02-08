import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      username : "default"
    }
  }
  
  render() {
    return (
      <div id="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/matching">Find a Match</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/matches">View Your Matches</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Messages</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.username}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">Profile</a>
              <a className="dropdown-item" href="/">Account Settings</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
