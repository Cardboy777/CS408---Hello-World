import React, { Component } from 'react';
import './css/Pictures.css';
import FileUploader from 'react-firebase-file-uploader';
import firebase from './firebase.js';
class Pictures extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currPic:'',
            currURL:'',
            pictureFile1:'',
            pictureFile2:'',
            pictureFile3:'',
            picture1URL:'',
            picture2URL:'',
            picture3URL:'',
            isuploading:false,
            progress:0,
            chosenPic:1
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
                        pictureFile1:doc.data().pictureFile1,
                        pictureFile2:doc.data().pictureFile2,
                        pictureFile3:doc.data().pictureFile3,
                    });
                    firebase.storage().ref('user_images').child(
                        doc.data().pictureFile1
                    ).getDownloadURL().then((url) => {
                     //   let str="picture"+(i+1)+"URL";
                        this2.setState({ 
                            picture1URL:url
                        });
                    });
               // }
                }).catch(function(error){
                        console.log(error);
                    });
                
                
                }
                else{
                    console.log("user not authenticated");
                }
            });
            
                    //}
                    /*
                    if(doc.data().pictureFile2!==null){
                        firebase.storage().ref('user_images').child(doc.data().pictureFile2).getDownloadURL().then((url) => {
                            this2.setState({ picture2URL: url,});
                        });
                    }
                    if(doc.data().pictureFile3!==null){
                        firebase.storage().ref('user_images').child(doc.data().pictureFile3).getDownloadURL().then((url) => {
                            this2.setState({ picture3URL: url,});
                        });
                    }*/
                  
           
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
        let curr_url;
        this2.setState({currPic: filename, progress: 100, isUploading: false});
        firebase.storage().ref('user_images').child(filename).getDownloadURL().then(url => {
            curr_url=url;
            this2.setState({
                picture1URL:url,
                currURL: url
            });
            const db =firebase.firestore();
            window.alert(curr_url)
            
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    window.alert(this2.state.chosenPic)
                    if(this2.state.chosenPic===1){
                        db.collection('usersPQ').doc(user.uid).update({
                           pictureFile1:filename
                        }).catch(function(error){
                            console.log(error);
                        });
                        this2.setState({
                            pictureFile1:filename,
                            picture1URL:curr_url
                        });
                    }
                }
            });
        }).catch(function(error){
            window.alert(error);
        });
    }
 
    render() { 
        return ( 
            <div >
                    <div >
                    {   this.state.picture1URL &&
                        <img width="250" height="250" src={this.state.picture1URL} alt="first slide"/>
                    }<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#ppmodal">Update</button>   
                    </div> 
                    <div>
                    {   this.state.picture2URL &&
                        <img width="250" height="250" src={this.state.picture2URL} alt="Second slide"/>
                    }
                    <button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#ppmodal">Update</button>  
                    </div>
                    <div>
                    {   this.state.picture3URL &&
                        <img width="250" height="250" src={this.state.picture3URL} alt="third slide"/>
                    }<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#ppmodal">Update</button>
                    </div>

            <button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#ppmodal">Update</button>
                <div class="modal fade bd-example-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="ppmodal" aria-hidden="true">
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
                                    <p>Choose picture to change:</p>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-secondary">
                                            <input type="radio" name="options" id="option1" autocomplete="off"/> Picture 1
                                        </label>
                                        <label class="btn btn-secondary">
                                            <input type="radio" name="options" id="option2" autocomplete="off" /> Picture 2
                                        </label>
                                        <label class="btn btn-secondary">
                                            <input type="radio" name="options" id="option3" autocomplete="off" /> Picture 3
                                        </label>
                                    </div>
                                
                                {this.state.isUploading &&
                                    <p>{this.state.progress}</p>
                                }
                                {this.state.currURL &&
                                    <img src={this.state.currURL} alt="Avatar" width="450" height="250"/>
                                }
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
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
           </div>
         );
    }
}
 
export default Pictures;

/*
<div  id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    {   this.state.picture1URL &&
                        <img class="d-block w-100" src={this.state.picture1URL} alt="first slide"/>
                    }<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#ppmodal">Update</button>   
                    </div> 
                    <div class="carousel-item">
                    {   this.state.picture2URL &&
                        <img class="d-block w-100" src={this.state.picture2URL} alt="Second slide"/>
                    }
                    <button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#ppmodal">Update</button>  
                    </div>
                    <div class="carousel-item">
                    {   this.state.picture3URL &&
                        <img class="d-block w-100" src={this.state.picture3URL} alt="third slide"/>
                    }<button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#ppmodal">Update</button>
                    </div>
                </div>    
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
        
           

*/