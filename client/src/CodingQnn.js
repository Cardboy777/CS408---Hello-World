import React, { Component } from 'react';
import firebase from './firebase.js';
import './css/CodingQnn.css';
//import PersonalityQuestionnaire from './PersonalityQnn.js';
//var firebase=require("firebase");
//var database = firebase.database();
//username

class CodingQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            ca1:"",
            ca2:"",
            ca3:"",
            ca4:"",
            ca5:"",
            ca6:"",
            ca7:"",
            ca8:"",
            ca9:"",
            ca10:"",
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkCompleted = this.checkCompleted.bind(this);
    }

    handleSubmit = e =>{
        e.preventDefault();
        const db =firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        }); 

        if(!this.handleValidation()){
            return;
        }
        db.collection("usersPQ").doc(this.props.uAuth.uid).update({
			CQComplete: true,
            canswer1: this.state.ca1,
            canswer2: this.state.ca2,
            canswer3: this.state.ca3,
            canswer4: this.state.ca4,
            canswer5: this.state.ca5,
            canswer6: this.state.ca6,
            canswer7: this.state.ca7,
            canswer8: this.state.ca8,
            canswer9: this.state.ca9,
            canswer10: this.state.ca10
        }).then(()=>{
            //once data has been successfully updated in db, redirect to next questionnaire
            this.checkCompleted();
        })
    }

   
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateErrorText(text){
        window.scrollTo(0,document.body.scrollHeight);
        let error = document.getElementById('cq-submit-error')
        error.innerHTML=text
    }

    handleValidation(){
        if(this.state.ca1===""){ this.updateErrorText("Invalid Motivation Input"); return false;}
        else if(this.state.ca2===""){ this.updateErrorText("Invalid Coding Language Input"); return false;}
        else if(this.state.ca3===""){ this.updateErrorText("Invalid Search Algorithm Input"); return false;}
        else if(this.state.ca4===""){ this.updateErrorText("Invalid Group Work Input"); return false;}
        else if(this.state.ca5===""){ this.updateErrorText("Invalid IOS/Android Input"); return false;}
        else if(this.state.ca6===""){ this.updateErrorText("Invalid IDE Input"); return false;}
        else if(this.state.ca7===""){ this.updateErrorText("Invalid WebDev Input"); return false;}
        else if(this.state.ca8===""){ this.updateErrorText("Invalid When do You Code Input"); return false;}
        else if(this.state.ca9===""){ this.updateErrorText("Invalid Hackathon Input"); return false;}
        else if(this.state.ca10===""){ this.updateErrorText("Invalid Data Structure Input"); return false;}
        else{ return true; }
        
    }
    checkCompleted(){
        if(!this.handleValidation()){
            return;
        }else{
            window.location.href="/";
        }
    }


    // need to add the bootstrap for this page
    //should add the value to all the options of select
    render() { 
        return ( 
            <div id='CQPage'>
            <form onSubmit={this.handleSubmit}>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h2 class="display-4" id="jumboText">Coding Questionnaire</h2>
                    </div>
                </div>
            <div className='col-md-6 offset-3'>
                <div class="form-group col-md-12">
                <label>What motivates you to code?
                    <select class="form-control" id="ca1" name="ca1" onChange={this.handleChange} value={this.state.ca1}>
                        <option selected></option><option>Inner Peace</option> <option>Success</option> <option>Fun</option>
                        <option>Power</option> <option>The Money</option>
                    </select>
                </label>
                <br />
                <label>What is your favorite coding langugage
                    <select class="form-control" id="ca2" name="ca2" onChange={this.handleChange} value={this.state.ca2}>
                        <option selected></option><option>C</option> <option>C++</option> <option>Python</option>
                        <option>Java</option> <option>Matlab</option><option>HTML</option> <option>R</option> <option>Visual Basic</option><option>Fortran</option>
                        <option>Javascript</option> <option>C#</option><option>Ruby</option>
                    </select>
                </label>
                <br />
                <label> What is your favorite search algorithm?
                    <select class="form-control" id="ca3" name="ca3" onChange={this.handleChange} value={this.state.ca3}>
                        <option selected></option><option>Sequential </option><option>Interval</option> <option>Binary</option>
                        <option>Linear</option> <option> Exponential</option> <option>Recursive</option>
                    </select>
                </label>
                <br />
                <label>Do you enjoy working in groups?
                    <select class="form-control" id="ca4"name="ca4" onChange={this.handleChange} value={this.state.ca4}>
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>
                </label>
                <br />
                <label>IOS: Swift or Android Development?
                    <select class="form-control" id="ca5" name="ca5" onChange={this.handleChange} value={this.state.ca5}>
                        <option selected></option><option>Swift</option><option>Android</option> 
                    </select>            
                </label>
                <br />
                <label>What is your favorite IDE?
                    <select class="form-control" id="ca6" name="ca6" onChange={this.handleChange} value={this.state.ca6}>
                        <option selected></option><option>Vim</option><option>Emacs</option><option>IntelliJ</option> 
                        <option>Eclipse</option> <option>Visual Studio Code</option> <option>CodeBlocks</option> <option>Other</option>
                    </select>
                </label>
                <br />
                <label> How do you feel about web development?
                    <select class="form-control" id="ca7" name="ca7" onChange={this.handleChange} value={this.state.ca7}>
                        <option selected></option><option>Yes, Love it!</option> <option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label> When do you like to code the most?
                    <select class="form-control" id="ca8" name="ca8" onChange={this.handleChange} value={this.state.ca8}>
                        <option selected></option>
                        <option>Early Morning</option><option>Late Night</option><option>Between Tasks</option>
                        <option>Whenever Inspiration hits</option> <option>When I have planed a specific time to work on it</option>
                        <option>ALL THE TIME!!</option>
                    </select>
                </label>
                <br />
                <label>Do you enjoy participating in Hackathons?
                    <select class="form-control" id="ca9" name="ca9" onChange={this.handleChange} value={this.state.ca9}>
                        <option selected></option><option>Yes, always</option><option>Most of the time</option><option> Sometimes</option> 
                        <option>Not so much, but I try too</option> <option>No</option>
                    </select>
                </label>
                <br />
                <label>Favorite Data Structure?
                    <select class="form-control" id="ca10" name="ca10" onChange={this.handleChange} value={this.state.ca10}>
                        <option selected></option><option>Arrays</option><option>Linked Lists</option> <option>Trees</option>
                        <option>Stack</option> <option>Queue</option><option>Hashing</option> <option>Heap</option> <option>Graph</option> <option>C++ Vector</option>
                    </select>
                </label>
                <br />
                <button id='cq-submit' type="submit" class="btn btn-outline-light btn-lg">Submit</button>
                <span id='cq-submit-error'></span>
            </div>
            </div>
        </form>
        </div> 
        );
    }
}
 
export default CodingQuestionnaire;