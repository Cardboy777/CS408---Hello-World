import React, { Component } from 'react';
import Header from './Header';
import ProfilePicture from './ProfilePicture';
import firebase from './firebase';
import Picture from './Picture';
import './css/UserProfile.css';
import PersonalityQuestionnaire from './PersonalityQnn';
import CodingQuestionnaire from './CodingQnn';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      age:'',
      gender:'',
      description:'',
      attractGender:''
    }
  }
  componentDidMount(){
    const db =firebase.firestore();
    let that =this;
    firebase.auth().onAuthStateChanged((user)=>{
      const docRef = db.collection("usersPQ").doc(user.uid);
      docRef.get().then(function(doc) {
        that.setState({
          name: doc.data().user,
          gender: doc.data().gender,
          age:  doc.data().age,
          description: doc.data().describe,
          attractgender: doc.data().attractGender,        
          });
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    });
  }
  render() {
    return (
      <div id="UserProfilePage">
        <Header/><br/>
        <div id="profileNameAndPicture">
          <h1 id="pname">{this.state.name}</h1>
           <div id="infoPage"> 
            <h5>Gender: <b>{this.state.gender} </b></h5>
            <h5>Age: <b> {this.state.age} </b></h5>
            <h5>Interested in: <b>{this.state.attractgender}</b></h5>
            <h5>Description: {this.state.description}</h5>
          </div>
          <ProfilePicture/>
          <div id="userInterestPhotos">
          <Picture name="pictureFile1"/>
          <Picture name="pictureFile2"/>
          <Picture name="pictureFile3"/>
          <br/>
          </div>
        </div> 
        <br/>
        <div id="buttonBlock">
        <a class="btn btn-outline-light" href='/user/questionnaire'>Edit Personality Questionnaire</a>
          <br/>
        <button class="btn btn-outline-light"> Edit Coding Questionnaire</button>
         </div> 
      </div>    
    );
  }
}

export default UserProfile;
/**
 * 
 * 
        
        <Link to={{ pathname: '/user/PersonalityQnn', state: this.state }}>Profile Questionnaire</Link><br/>
        <Link to={{ pathname: '/user/CodingQnn', state: this.state }}>Coding Questionnaire</Link><br/>
        <br/>
        <div>
          <Picture name="pictureFile1"/>
          <Picture name="pictureFile2"/>
          <Picture name="pictureFile3"/>
        </div>
        <button>Edit Personality Qtestionnaire</button>
    </div>
 */