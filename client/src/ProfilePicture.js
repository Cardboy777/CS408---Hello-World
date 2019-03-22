import React, { Component } from 'react';
import firebase from './firebase.js';
import FileUploader from 'react-firebase-file-uploader';
import './css/ProfilePicture.css';
class ProfilePictureUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            avatar:'',
            avatarUrl:'',
            selectedFile:'',
            isuploading:false,
            progress:0,

         }
    }
    componentDidMount(){
        let this2=this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //get user info
                const db = firebase.firestore();
                //db.collection('userPQ').
                db.collection("usersPQ").doc(user.uid).get().then(function(doc){
                    this2.setState({
                        username: doc.data().user,
                        avatar: doc.data().avatarFile
                    });
                    console.log(doc.data().username);
                    //if(doc.data().avatarFile!==null){
                        firebase.storage().ref('images').child(doc.data().avatarFile).getDownloadURL().then((url) => {
                            this2.setState({
                                avatarURL: url
                            });
                            
                        });
                    //}
                }).catch(function(error){
                    console.log(error);
                });  
                console.log("username"+this2.state.username);
            }
        });
    }
    handleChangeUsername = (event)=>{
        this.setState({
           username:event.target.value
        });
    }
    handleUploadStart=()=>{
        this.setState({
            isuploading:true, progress:0
        });
    }
    handleProgress=(progress)=>{
        this.setState({progress})
    }
    handleUploadError =(error)=>{
        this.setState({
            isuploading:false
        });
        console.log(error);
    }
    handleUploadSuccess =(filename)=>{
        let this2=this;
      //if( /([^\s]+\.(jpg|png|gif|bmp)$)/.test(filename) ){
        this2.setState({avatar: filename, progress: 100, isUploading: false});
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
            /*this2.setState({
                avatarURL: url
            });*/
            const db =firebase.firestore();
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    db.collection('usersPQ').doc(user.uid).update({
                       avatarFile:filename
                    });
                    
                }
            });
        });
      //}
      //else{
      //    window.alert("Incorrect File Type");
      //}
    }
 
    render() { 
        return (
            
            <div id="PPSection"> 
                <h6>
                {
                    this.state.avatarURL &&
                    <img src={this.state.avatarURL} alt="Avatar" width="250" height="250"/>
                }
                </h6>
            <form>
                <button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#Upmodal">Change Profile Picture</button>
                <div class="modal fade bd-example-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"id="Upmodal" aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle" color="black">Update Your Profile Picture</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                {this.state.isUploading &&
                                    <p>{this.state.progress}</p>
                                }
                                {this.state.avatarURL &&
                                    <img src={this.state.avatarURL} alt="Avatar" width="250" height="250"/>
                                }
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref('images')}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                                <button type="submit"class="btn btn-danger" />
                                </form>
                                    
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-danger">Update</button>
                                </div>   
                        </div>
                    </div>
                </div>
            </form>       
        </div>
        );
    }
}
 
export default ProfilePictureUpload;