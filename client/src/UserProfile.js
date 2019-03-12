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
	    lastOnline:''
    }
    
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
            <div className='col-md-8 info'>
              <h1 id="pname">{this.props.uData.user}</h1>
              <div id="infoPage"> 
                <h5>Gender: <b>{this.props.uData.gender} </b></h5>
                <h5>Age: <b> {this.props.uData.age} </b></h5>
                <h5>Interested in: <b>{this.props.uData.attractGender}</b></h5>
                <h5>Description: <b>{this.props.uData.describe}</b></h5>
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