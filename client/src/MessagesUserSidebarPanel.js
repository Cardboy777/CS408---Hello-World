import React, { Component } from 'react';

class MessagesUserSidebarPanel extends Component {
  render() {
    return (
      <div class="MessagesUserSidebarPanel">
        <div className="user-holder matched-button" onClick={this.props.showChat}>
            <img src="favicon.ico" className="userMessageImage"></img>
            <div className="user-message-name">{this.props.match.data.user}</div>
        </div>
      </div>
    );
  }
}

export default MessagesUserSidebarPanel;
