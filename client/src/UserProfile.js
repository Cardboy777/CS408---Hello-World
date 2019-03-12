import React, { Component } from 'react';
import Header from './Header';
import ProfilePicture from './ProfilePicture';
import firebase from './firebase';
import Picture from './Picture';
import './css/UserProfile.css';
import EditPQuestionnaire from './editPersonalityQnn';
import EditCQuestionnaire from './EditCodingQnn';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      age:'',
      gender:'',
      description:'',
      attractGender:'',
	  lastOnline:''
    }
    
  }
  componentDidMount(){
    const db =firebase.firestore();
    let that =this;
   
    firebase.auth().onAuthStateChanged((user)=>{
      // window.alert(user.uid);
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
	  
	  const statRef = db.collection("userStats").doc(user.uid);
      statRef.get().then(function(doc) {
		  var lastOnlineTime = doc.data().lastOnlineTime || new Date().getTime();
		  var lastCheck = Math.floor((new Date().getTime() - lastOnlineTime) / 1000);
		  var onlineString = "Online";
		  if (lastCheck < 30)
		  {
			  onlineString = "Online";
		  }
		  else if (lastCheck < 3600)
		  {
			  onlineString = "Last seen " + Math.floor(lastCheck / 60) + " minutes ago";
		  }
		  else if (lastCheck < 86400)
		  {
			  onlineString = "Last seen " + Math.floor(lastCheck / 3600) + " hours ago";
		  }
		  else 
		  {
			  onlineString = "Last seen " + Math.floor(lastCheck / 86400) + " days ago";
		  }
        that.setState({
          lastOnline: onlineString
          });
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    });
  }
  doNotDisplay(){
    return false;
  }

  render() {
    return (
      <div id="UserProfilePage">
        <Header {...this.props}/><br/>
        <div className='profile-content col-md-8 offset-2'>
          <div className='row'>
            <div id="col-md-4">
              <ProfilePicture/>
            </div>
            <div className='col-md-8'>
              <h1 id="pname">{this.state.name}</h1>
              <div id="infoPage"> 
				<h5>Online Status: <b>{this.state.lastOnline} </b></h5>
                <h5>Gender: <b>{this.state.gender} </b></h5>
                <h5>Age: <b> {this.state.age} </b></h5>
                <h5>Interested in: <b>{this.state.attractgender}</b></h5>
                <h5>Description: <b>{this.state.description}</b></h5>
              </div>
            </div>
          </div>
          <br/>
          <div className='row'>
              <div className='col-md-4'><Picture name="pictureFile1"/></div>
              <div className='col-md-4'><Picture name="pictureFile2"/></div>
              <div className='col-md-4'><Picture name="pictureFile3"/></div>
          </div>
          <div className='extra-info'>
            <div className='row'>
              <div className='col-md-4'>
                  <h3>Language</h3>
                  <p>{this.props.uData.canswer2}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Data Structure</h3>
                  <p>{this.props.uData.canswer10}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Editor</h3>
                  <p>{this.props.uData.canswer6}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4'>
                  <h3>Search Algorithm</h3>
                  <p>{this.props.uData.canswer3}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Works Best</h3>
                  <p>{this.props.uData.panswer8}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Personality</h3>
                  <p>{this.props.uData.panswer3}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4'>
                  <h3>Motivation</h3>
                  <p>{this.props.uData.panswer1}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Indoor/Outdoor</h3>
                  <p>{this.props.uData.panswer6}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Motivation (Coding)</h3>
                  <p>{this.props.uData.canswer1}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4'>
                  <h3>Music</h3>
                  <p>{this.props.uData.panswer7}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Codes During</h3>
                  <p>{this.props.uData.canswer8}</p>
              </div>
              <div className='col-md-4'>
                  <h3>Hackathons</h3>
                  <p>{this.props.uData.canswer9}</p>
              </div>
            </div>
            
          </div>

          <br/>
          <div id="buttonBlock">
            <EditPQuestionnaire {...this.props}/>
            <br/>
            <EditCQuestionnaire {...this.props}/>
          </div>
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