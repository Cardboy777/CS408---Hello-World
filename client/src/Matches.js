import React, { Component } from 'react';
import './css/Matches.css'
import MatchesPanel from './MatchesPanel';
import Header from './Header';
import Loading from './Loading';
import ListLoadingError from './ListLoadingError';
import firebase from './firebase';

class Matches extends Component {
  constructor(){
    super();
    this.state = {
      loading_state: 0,
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
      console.log(arrayList);
      this.getUserListData(arrayList);
    }).catch((message) =>{
      this.setState({
        loading_state: 2
      })
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
        console.log(arrayList);
        this.getUserListData(arrayList);
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
  }

  getUserListData(arraylist){
    let promises=[];
    const db = firebase.firestore();
    for(let k in arraylist){
      promises.push(()=>{
        return (
          db.collection("usersPQ").doc(k.uid).get()
          .then( (userdoc) => {
            if (userdoc.exists) {
              return {
                data: userdoc.data(),
                match_percent: k.match_percent
              }
            } else {
              return null
            }
          })
          .catch( (error) => {
            console.log("No userdata for match: " + k.uid);
            return null
          })
        )
      })
    }
    //wait for all promises in array to finish
    Promise.all(promises).then((newarray) => {
      this.setState({
        user_list : newarray,
        loading_state : 1
      })
    })
  }

  render() {
    return (
      <div id="matchesPage">
        <Header {...this.props} />
        { this.state.loading_state === 0 ?
          <Loading/> :
            this.state.loading_state === 1 ?
              <div className="panels-container">
                <div className="row">
                {/*
                  {this.state.user_list.map((i) =>
                      <div key={i.data.user} className="panel col-md-6">
                      <MatchesPanel match_percent={i.match_percent} userData={i.data} unlikeFunct={this.UnlikeUser} reportFunct={this.ReportUser}/>
                    </div>
                    )
                  }
                */}
                </div>
              </div>
              :
              <ListLoadingError>
                We couldn't find any matches for you. Try Visiting the '<a href='/matching'>Find Matches</a>' page and Liking some users.
              </ListLoadingError>
        }
      </div>
    );
  }
}

export default Matches;
