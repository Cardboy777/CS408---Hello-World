import React, { Component } from 'react';
import firebase from './firebase.js';
import FileUploader from 'react-firebase-file-uploader';
import uploadLogo from './img/uploadSymbol.png';
import './css/Picture.css';

class Picture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currPic:'',
            currURL:'',
            pictureURL:'',
            pictureFile:'',
            isuploading:false,
            progress:0,
            pmodal:"#pmodal",
            pmodalId:"pmodal"
        }
    }
    componentDidMount(){
        let this2=this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const currpic=this2.props.name;
                let modalname="#"+currpic+"Modal"
                let modalID=currpic+"Modal"
                this2.setState({
                    currPic:currpic,
                    pmodal:modalname,
                    pmodalId:modalID
                });
                //window.alert(user.uid);
                //get user info
                //window.alert(currpic);
                const db = firebase.firestore();
                if(currpic ==="pictureFile1"){
                  //  window.alert("it's pictureFile1");
                    console.log("picture comp")
                    console.log(this2.currPic);
                    db.collection("usersPQ").doc(user.uid).get().then(function(doc){
                    this2.setState({
                        pictureFile:doc.data().pictureFile1
                    });
                    firebase.storage().ref('user_images').child(doc.data().pictureFile1).getDownloadURL().then((url) => {
                        console.log(url);
                        this2.setState({ 
                            pictureURL:url
                        });
                    });
                    }).catch(function(error){
                            console.log(error);
                    }); 
                }                
                else if(currpic ==="pictureFile2"){
                    //window.alert("it's pictureFile2");
                    console.log("picture comp")
                    console.log(this2.currPic);
                    db.collection("usersPQ").doc(user.uid).get().then(function(doc){
                    this2.setState({
                        pictureFile:doc.data().pictureFile2
                    });
                    firebase.storage().ref('user_images').child(doc.data().pictureFile2).getDownloadURL().then((url) => {
                        console.log(url);
                        this2.setState({ 
                            pictureURL:url
                        });
                    });
                    }).catch(function(error){
                            console.log(error);
                    }); 
                }
                else if(currpic ==="pictureFile3"){
                    //window.alert("it's pictureFile3");
                    console.log("picture comp")
                    console.log(this2.currPic);
                    db.collection("usersPQ").doc(user.uid).get().then(function(doc){
                    this2.setState({
                        pictureFile:doc.data().pictureFile3
                    });
                    firebase.storage().ref('user_images').child(doc.data().pictureFile3).getDownloadURL().then((url) => {
                        console.log(url);
                        this2.setState({ 
                            pictureURL:url
                        });
                    });
                    }).catch(function(error){
                            console.log(error);
                    }); 
                }
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
       if( /([^\s]+\.(jpg|png|gif|bmp)$)/.test(filename1) ){
        this2.setState({pictureFile: filename1, progress: 100, isUploading: false});
        firebase.storage().ref('user_images').child(filename1).getDownloadURL().then(url => {
            this2.setState({
                pictureURL: url
            });
            
            const currpic=this2.state.currPic;
            const db =firebase.firestore();
            firebase.auth().onAuthStateChanged((user) => {
                //alert(this2.state.currPic);
                if (user) {
                    window.alert("Pic: "+this2.state.currPic);
                    if(this2.state.currPic==="pictureFile1"){
                        console.log("1");
                        db.collection('usersPQ').doc(user.uid).update({
                            pictureFile1:filename1
                        }).catch(function(error){
                            window.alert(error);
                        });
                        window.alert("upload success on picture1 ")
                    }else if(this2.state.currPic==="pictureFile2"){
                        //window.alert("uploadsuccess on picture2 ")
                        db.collection('usersPQ').doc(user.uid).update({
                            pictureFile2:filename1
                        });
                    }
                    else if(this2.state.currPic==="pictureFile3"){
                        window.alert("upload success on picture3 ")
                        db.collection('usersPQ').doc(user.uid).update({
                            pictureFile3:filename1
                        });
                    }
                }
            });
        });
      }else{
          window.alert("Incorrect File Type");
      }
    }
 
    render() { 
        return ( 
        <div id="PictureBox">
            <div >
                <div className='space-man-joe-don'>
                    {   this.state.pictureURL ?
                        <div className='pic'><img className='pic' src={this.state.pictureURL} alt="first slide"/></div>
                        :
                        <div className='noImage'>No Image</div>
                    }
                </div>  
                    <button type="button" id='update-pic-btn' class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target={this.state.pmodal} align="center">Update Picture</button>
                
            </div> 
            <div class="modal fade bd-example-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id={this.state.pmodalId} aria-hidden="true">
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
                                {this.state.pictureURL &&
                                    <img src={this.state.pictureURL} alt="Avatar" width="450" height="250"/>
                                }
                                <FileUploader
                                    accept="image/*"
                                    name="picture"
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
                                    <button type="submit" data-dismiss="modal" class="btn btn-danger">Update</button>
                                </div>   
                        </div>
                    </div>
                </div>   
        </div> );
    }
}
 
export default Picture;