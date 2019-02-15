import React, { Component } from 'react';
import Header from './Header';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class UserProfile extends Component {

  constructor(props) {
      super(props);
      this.state = {
          name:"",
          gender:"",
          age:"",
          attrgender:""
      }
  }

  componentDidMount(){
    const db =firebase.firestore();
    const docRef = db.collection("usersPQ").doc("Jh16YJvEoQwCZyau0BZ5");
    var that = this
    docRef.get().then(function(doc) {
      if (doc.exists) {
        var userInfo = doc.data();
        that.setState({
          name: userInfo["user"],
          gender: userInfo["gender"],
          age:  userInfo["age"],
          attrgender: userInfo["attractGender"]
        });

      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  render() {
    return (
      <div id="UserProfilePage">
        <Header/>
        <h1>{this.state.name}</h1>
        <a href="/user/PersonalityQnn">Personlaity</a>
        <Link to={{ pathname: '/user/PersonalityQnn', state: this.state }}>My route</Link>
      </div>
    );
  }
}

export default UserProfile;
