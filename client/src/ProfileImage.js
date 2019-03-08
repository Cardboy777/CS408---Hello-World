import React, { Component } from 'react';
import default_img from './img/default_profile.png';
import firebase from './firebase';

//takes in prop userPQ data and renders the users profile image, if no profile image, then render the default profile picture

class ProfileImage extends Component {
  constructor(){
    super();
    this.state={
        url: default_img,
    }
  }

  componentDidMount(){
    if(this.props.uData.avatarFile !== undefined){
      firebase.storage().ref().child('images/' + this.props.uData.avatarFile).getDownloadURL().then((URL) => {
        this.setState({
            url: URL,
        }); 
      })
      .catch(function(error){
          console.log(error);
      })
    }
    else{

    }
  }
  render() {
    return (
      <div className='profile_image_display'>
        <img src={this.state.url} alt={this.props.uData.user +'\'s Profile Picture'}></img>
      </div>
    );
  }
}

export default ProfileImage;
