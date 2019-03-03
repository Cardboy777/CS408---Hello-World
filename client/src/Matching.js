import React, { Component } from 'react';
import './css/Matching.css';
import MatchingPanel from './MatchingPanel';
import Header from './Header';
import firebase from './firebase'

class Matching extends Component {
  constructor(){
    super();
    this.state = {
      message : null,
      user_list: [],
      user_list_index: 0
    }
    this.fetchPotentialMatches = this.fetchPotentialMatches.bind(this);
    this.RemoveUsersFromPotentialMatches = this.RemoveUsersFromPotentialMatches.bind(this);
    this.LikeUser = this.LikeUser.bind(this);
    this.DislikeUser = this.DislikeUser.bind(this);
    this.ViewNextProfile = this.ViewNextProfile.bind(this);
  }

  componentDidMount(){
    this.fetchPotentialMatches();
  }

  //requests more potentail matches from the server
  fetchPotentialMatches(){
    fetch("/api/getMorePotentialMatches").then()
      .then(res => res.json())
      .then(arrayList => this.setState({ user_list: this.state.user_list.concat(arrayList) }));
  }

  getMorePotentialMatches(){
    this.fetchPotentialMatches();
    this.forceUpdate();
  }

  RemoveUsersFromPotentialMatches(matchedUser){

  }

  LikeUser(likedUser){
    /*fetch("/api/likeUser",{
      method: 'POST',
      body: JSON.stringify({
        user1: this.props.uData.user,
        user2: likedUser.user
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());*/
    this.RemoveUsersFromPotentialMatches(likedUser);
  }
  DislikeUser(dislikedUser){
    this.RemoveUsersFromPotentialMatches(dislikedUser);
  }

  ViewNextProfile(){
    this.setState({user_list_index : this.user_list_index + 1});
    this.forceUpdate();
  }

  render() {
    let refreshButton;
    if (this.state.user_list.length < 1){
      refreshButton=<button className='btn btn-primary' onClick={this.getMorePotentialMatches}>Test Fetch More</button>;
    }
    else{
      refreshButton=<br/>
    }
    return (
      <div id="matchingPage">
        <Header {...this.props} />
        <div className="panels-container">
          <div className="row">
            { this.state.user_list.map((i) =>
                <div key={i.name} className="panel col-md-6">
                  <MatchingPanel user={i}/>
                </div>
              )
            }
          </div>
          {refreshButton}
        </div>
      </div>
    );
  }
}

export default Matching;
