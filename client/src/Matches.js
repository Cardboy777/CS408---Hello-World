import React, { Component } from 'react';
import './css/Matches.css'
import MatchesPanel from './MatchesPanel';
import Header from './Header';
import Loading from './Loading';

class Matches extends Component {
  constructor(){
    super();
    this.state = {
      user_list: null,
      user_list_index: 0
    }
    this.fetchMatches = this.fetchMatches.bind(this);
    this.RemoveUserFromList = this.RemoveUserFromList.bind(this);
    this.getMoreMatches = this.getMoreMatches.bind(this);
    this.UnlikeUser = this.UnlikeUser.bind(this);
    this.ReportUser = this.ReportUser.bind(this);
  }

  componentDidMount(){
    this.fetchMatches();
  }

  //requests more potentail matches from the server
  fetchMatches(){
    fetch("/api/getMatches", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ username: this.props.uData.user }), // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then(arrayList => {
      this.setState({ user_list: arrayList})
    }).catch((message) =>{
      console.log("Could not Retrieve Matches");
      this.setState({ user_list: "EMPTY"})
    });
  }

  getMoreMatches(e){
    e.preventDefault();
    this.fetchMatches();
    this.forceUpdate();
  }

  RemoveUserFromList(matchedUser){
    let index = this.findUserIndex(matchedUser);
    if(index){
      this.setState({
        user_list: this.state.user_list.splice(index, 1),
        user_list_index: this.state.user_list_index > (this.state.user_list.length - 2) ? this.state.user_list.length : this.state.user_list_index
      })
    }
  }

  findUserIndex(username){
    for( let i in this.state.user_list){
      if(i.data.user === username){
        return this.state.userName.indexOf(i);
      }
    }
    console.log("User not in matching list")
    return null
  }

  //Sends request to like the User
  UnlikeUser(unlikedUser){
    if(this.props.uData.user !== undefined){
      fetch("/api/unlikeUser", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({
          userName: this.props.uData.user,
          unlikedUserName: unlikedUser
        }), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(arrayList => {
        this.setState({ user_list: arrayList})
        this.forceUpdate()
      }).catch((message) =>{
        console.log("Could not Unlike user " + unlikedUser);
      });
    }
  }
  ReportUser(ReportedUser, ReportedUserName, message){
    fetch("/api/emailReportedUser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({
        userName: this.props.uData.user,
        reportedUser: ReportedUserName,
        reportedUid: ReportedUser,
        reason: message
      }), // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .catch((message) =>{
      console.log("Could not Report user " + ReportedUserName);
    });

  render() {
    return (
      <div id="matchesPage">
        <Header {...this.props} />
        { !this.state.user_list ?
          <Loading/> :
          <div className="panels-container">
            {this.state.user_list !== "EMPTY" ?
              <div className="row">
                {this.state.user_list.map((i) =>
                    <div key={i.data.user} className="panel col-md-6">
                    <MatchesPanel match_percent={i.match_percent} userData={i.data} unlikeFunct={this.UnlikeUser} reportFunct={this.ReportUser}/>
                  </div>
                  )
                }
              </div> :
              <div>
                <h1>You have No Matches :(</h1>
                <p>You should go find some on the 'Find a Match Page'</p>
              </div>
            }
            </div>
          }
        </div>
    );
  }
}

export default Matches;
