import React, { Component } from 'react';
import './css/Matching.css';
import MatchingPanel from './MatchingPanel';
import Header from './Header';
import Loading from './Loading';

class Matching extends Component {
  constructor(){
    super();
    this.state = {
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
        this.setState({ user_list: arrayList})
      }).catch((message) =>{
        console.log("Could not Retrieve Potential Matches");
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
        console.log(arrayList);
        this.setState({ user_list: arrayList})
        this.forceUpdate()
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
        this.setState({ user_list: arrayList})
        this.forceUpdate()
      }).catch((message) =>{
        console.log("Could not Dislike user " + dislikedUser);
      });
    }
  }
  SkipUser(skippedUser){
    console.log(this.props.uData.user + " Skipped " + skippedUser)
  }

  ReportUser(ReportedUser){
    console.log(this.props.uData.user + " Reported " + ReportedUser);
  }

  ViewNextProfile(){
    this.setState({user_list_index : this.user_list_index + 1});
    this.forceUpdate();
  }

  render() {
    return (
      <div id="matchingPage">
        <Header {...this.props} />
        { !this.state.user_list ?
          <Loading/> :
          <div className="panels-container">
            <div className="row">
              {this.state.user_list.map((i) =>
                  <div key={i.data.user} className="panel col-md-6">
                    <MatchingPanel match_percent={i.match_percent} userData={i.data} likeFunct={this.LikeUser} dislikeFunct={this.DislikeUser} skipFunct={this.SkipUser} reportFunct={this.ReportUser}/>
                  </div>
                )
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Matching;
