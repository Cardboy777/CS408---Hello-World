import React, { Component } from 'react';
import firebase from './firebase.js';
import FileUploader from 'react-firebase-file-uploader';
import uploadLogo from './img/uploadSymbol.png';
import './css/Picture.css';

class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currPic:'',
            currURL:'',
            picture1URL:'',
            pictureFile1:'',
            isuploading:false,
            progress:0,
    
        }
    }
    componentDidMount(){
        let this2=this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               // window.alert(user.uid);
                //get user info
                const db = firebase.firestore();
                db.collection("usersPQ").doc(user.uid).get().then(function(doc){
                    this2.setState({
                        pictureFile1:doc.data().pictureFile1
                    });

                    firebase.storage().ref('user_images').child(doc.data().pictureFile1).getDownloadURL().then((url) => {
                        this2.setState({ 
                            picture1URL:url
                        });
                    });
                }).catch(function(error){
                        console.log(error);
                    });                
                }
                else{
                    console.log("user not authenticated");
                }
            });
    }
    
    handleUploadStart=()=>{
        this.setState({
            isuploading:true, progress:0
        });
    }

    handleProgress=(progress)=>{
        this.setState({progress});
    }

    handleUploadError =(error)=>{
        this.setState({isuploading:false});
        console.log(error);
    }
    
    handleUploadSuccess =(filename1)=>{
        let this2=this;
        this2.setState({pictureFile1: filename1, progress: 100, isUploading: false});
        firebase.storage().ref('images').child(filename1).getDownloadURL().then(url => {
            this2.setState({
                picture1URL: url
            });
            const db =firebase.firestore();
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    db.collection('usersPQ').doc(user.uid).update({
                       pictureFile1:filename1
                    });
                    
                }
            });
        });
    }
 
    render() { 
        return ( 
        <div>
            <div >
            {   this.state.picture1URL &&
                <img width="250" height="250" src={this.state.picture1URL} alt="first slide"/>
            }<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#pmodal"><img src={uploadLogo} alt="Logo" id="uploadLogo"/></button>   
            </div> 
            <div class="modal fade bd-example-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="pmodal" aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle" color="black">Update your Pictures</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                {this.state.isUploading &&
                                    <p>{this.state.progress}</p>
                                }
                                {this.state.picture1URL &&
                                    <img src={this.state.picture1URL} alt="Avatar" width="450" height="250"/>
                                }
                                <FileUploader
                                    accept="image/*"
                                    name="picture1"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref('user_images')}
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
        </div> );
    }
}
 
export default Picture;