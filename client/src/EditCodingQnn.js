import React, { Component } from 'react';
import firebase from './firebase.js';
import './css/EditPersonalityQnn.css';

class EditCQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ca1:'',
            ca2:'',
            ca3:'',
            ca4:'',
            ca5:'',
            ca6:'',
            ca7:'',
            ca8:'',
            ca9:'',
            ca10:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleUpdate = e =>{
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
        });
        window.alert("Coding Questionnaire Changes saved");
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleValidation(){
        if(this.state.ca1===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca2===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca3===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca4===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca5===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca6===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca7===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca8===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca9===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.ca10===""){ window.alert("Invalid Question Input"); return false;}
        else{ return true; }   
    }

    render() { 
        return ( 
            <div>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#editCQM">
                Edit Coding Questionnaire</button>
                <div class="modal fade" id="editCQM" tabindex="-1" role="dialog" aria-labelledby="editPQMLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit your Coding Questionnaire</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <form onSubmit={this.handleUpdate}>                    
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
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-danger" >Save changes</button>

                </form>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default EditCQuestionnaire;