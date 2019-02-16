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
          attrgender:"",
          pa1:"",
          pa2:"",
          pa3:"",
          pa4:"",
          pa5:"",
          pa6:"",
          pa7:"",
          pa8:"",
          pa9:"",
          pa10:"",
          pa11:"",
          pa12:"",
          pa13:"",
          pa14:"",
          pa15:"",
          pa16:"",
          pa17:"",
          description:""
      }
  }

  componentDidMount(){
    const db =firebase.firestore();
    const docRef = db.collection("usersPQ").doc("Jh16YJvEoQwCZyau0BZ5");
    var that = this
    docRef.get().then(function(doc) {
      if (doc.exists) {
        var userInfo = doc.data();
        console.log(userInfo);
        that.setState({
          name: userInfo["user"],
          gender: userInfo["gender"],
          age:  userInfo["age"],
          description: userInfo["describe"],
          attrgender: userInfo["attractGender"],
          pa1:userInfo["panswer1"],
          pa2:userInfo["panswer2"],
          pa3:userInfo["panswer3"],
          pa4:userInfo["panswer4"],
          pa5:userInfo["panswer5"],
          pa6:userInfo["panswer6"],
          pa7:userInfo["panswer7"],
          pa8:userInfo["panswer8"],
          pa9:userInfo["panswer9"],
          pa10:userInfo["panswer10"],
          pa11:userInfo["panswer11"],
          pa12:userInfo["panswer12"],
          pa13:userInfo["panswer13"],
          pa14:userInfo["panswer14"],
          pa15:userInfo["panswer15"],
          pa16:userInfo["panswer16"],
          pa17:userInfo["panswer17"],
          ca1: userInfo["canswer1"],
          ca2: userInfo["canswer2"],
          ca3: userInfo["canswer3"],
          ca4: userInfo["canswer4"],
          ca5: userInfo["canswer5"],
          ca6: userInfo["canswer6"],
          ca7: userInfo["canswer7"],
          ca8: userInfo["canswer8"],
          ca9: userInfo["canswer9"],
          ca10: userInfo["canswer10"],
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
        <h2>Age: {this.state.age}</h2>
        <h2>Description: {this.state.description}</h2>
        <Link to={{ pathname: '/user/PersonalityQnn', state: this.state }}>Profile Questionnaire</Link><br/>
        <Link to={{ pathname: '/user/CodingQnn', state: this.state }}>Coding Questionnaire</Link><br/>
        <a href="">Pictures</a>
      </div>
    );
  }
}

export default UserProfile;
