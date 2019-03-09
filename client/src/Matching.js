import React, { Component } from 'react';
import './css/Matching.css';
import MatchingPanel from './MatchingPanel';
import Header from './Header';
import Loading from './Loading';
import firebase from './firebase';
import ListLoadingError from './ListLoadingError';

class Matching extends Component {
  constructor(){
    super();
    this.state = {
      loading_state: 0,
      user_list: null,
      user_list_index: 0
    }
    this.fetchPotentialMatches = this.fetchPotentialMatches.bind(this);
    this.LikeUser = this.LikeUser.bind(this);
    this.DislikeUser = this.DislikeUser.bind(this);
    this.SkipUser = this.SkipUser.bind(this);
    this.ReportUser = this.ReportUser.bind(this);
    this.ViewNextProfile = this.ViewNextProfile.bind(this);
  }

  componentDidMount(){
    this.fetchPotentialMatches();
  }

  //requests more potentail matches from the server
  fetchPotentialMatches(){
      fetch("/api/getMorePotentialMatches", {
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
        //console.log(arrayList);
        this.setState({
          user_list: arrayList,
          loading_state: 1
        })
      }).catch((message) =>{
        this.setState({
          loading_state: 2
        })
      });
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
  LikeUser(likedUser){
    if(this.props.uData.user !== undefined){
      fetch("/api/likeUser", {
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
          likedUserName: likedUser
        }), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(arrayList => {
        console.log("New List from Likes:");
        console.log(arrayList);
        this.setState({
          user_list: arrayList,
          loading_state: 1
        })
      }).catch((message) =>{
        console.log("Could not Like user " + likedUser);
      });
    }
  }
  DislikeUser(dislikedUser){
    if(this.props.uData.user !== undefined){
      fetch("/api/dislikeUser", {
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
          dislikedUserName: dislikedUser
        }), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(arrayList => {
        console.log("New List from disikes:");
        console.log(arrayList);
        this.setState({
          user_list: arrayList,
          loading_state: 1
        })
      }).catch((message) =>{
        console.log("Could not Dislike user " + dislikedUser);
      });
    }
  }
  SkipUser(skippedUser){
    console.log(this.props.uData.user + " Skipped " + skippedUser)
  }

  ReportUser(ReportedUser, ReportedUserName, message){
    console.log(message);
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
    .then(arrayList => {
      console.log(arrayList);
      this.setState({
        user_list: arrayList,
        loading_state: 1
      })
      alert('User: ' + ReportedUserName + ' Successfully Reported');
    }).catch((message) =>{
      console.log("Could not Report user " + ReportedUserName);
    });
  };

  ViewNextProfile(){
    this.setState({user_list_index : this.user_list_index + 1});
    this.forceUpdate();
  };

  render(){
    return (
      <div id="matchingPage">
        <Header {...this.props} />
        { this.state.loading_state === 0 ?
          <Loading/> :
            this.state.loading_state === 1 ?
              <div className="panels-container">
                <div className="row">

                  {this.state.user_list.map((i) =>
                      <div key={i.data.uid} className="panel col-md-6">
                        <MatchingPanel match_percent={i.match_percent} userData={i.data} likeFunct={this.LikeUser} dislikeFunct={this.DislikeUser} skipFunct={this.SkipUser} reportFunct={this.ReportUser}/>
                      </div>
                    )
                  }
                  <MatchingPanel match_percent='100' userData={this.props.uData} likeFunct={this.LikeUser} dislikeFunct={this.DislikeUser} skipFunct={this.SkipUser} reportFunct={this.ReportUser}/>
                </div>
              </div>
              :
              <ListLoadingError>
                We couldn't load any potential matches. Try reloading the page.
              </ListLoadingError>
        }
      </div>
    );
  }
}

export default Matching;
