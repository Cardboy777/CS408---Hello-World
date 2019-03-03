import React, { Component } from 'react';
import './css/Matches.css'
import Header from './Header';
import MatchesPanel from './MatchesPanel';

class Matches extends Component {
  constructor(){
    super();
    this.state = {
      message : null,
      user_list: [],
      user_list_index: 0
    }
    this.fetchMatches = this.fetchMatches.bind(this);
    this.RemoveUserFromList = this.RemoveUserFromList.bind(this);
    this.getMoreMatches = this.getMoreMatches.bind(this);
    this.UnlikeUser = this.UnlikeUser.bind(this);
  }

  componentDidMount(){
    this.fetchMatches();
  }

  //requests more potentail matches from the server
  fetchMatches(){
    if(this.props.uData.user !== undefined){
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
        console.log(arrayList);
        this.setState({ user_list: this.state.user_list.concat(arrayList) })
      }).catch((message) =>{
        console.log("Could not Retrieve Matches");
      });
    }
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
      if(i.user === username){
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
      .then(response => {
        if(response === "Success"){
          this.RemoveUserFromList(unlikedUser);
        }
      }).catch((message) =>{
        console.log("Could not Unlike user " + unlikedUser);
      });
    }
  }

  render() {
    return (
      <div id="matchesPage">
        <Header {...this.props} />
        <div className="panels-container">
          <div className="row">
            {/*this.state.user_list.map((i) =>
                <div key={i.user} className="panel col-md-6">
                  <MatchesPanel userData={i} unlikeFunct={this.UnlikeUser}/>
                </div>
              )
            */}
            <MatchesPanel userData={this.props.uData} unlikeFunct={this.UnlikeUser}/>
          </div>
          { this.state.user_list_index < 1 ?
            <button id='fetchMoreMatches' className='btn btn-primary' onClick={this.getMoreMatches}>Load More Matches</button> :
            <br/>
          }
        </div>
      </div>
    );
  }
}

export default Matches;
