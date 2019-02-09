import React, { Component } from 'react';
import firebase from './firebase.js';

//var firebase=require("firebase");
//var database = firebase.database();
//username

class CodingQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a1:"",
            a2:"",
            a3:"",
            a4:"",
            a5:"",
            a6:"",
            a7:"",
            a8:"",
            a9:"",
            a10:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = e =>{
        e.preventDefault();
        const db =firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        }); 
        const questionnaireRef=db.collection("usersPQ").add({
            answer1: this.state.a1,
            answer2: this.state.a2,
            answer3: this.state.a3,
            answer4: this.state.a4,
            answer5: this.state.a5,
            answer6: this.state.a6,
            answer7: this.state.a7,
            answer8: this.state.a8,
            answer9: this.state.a9,
            answer10: this.state.a10
        });
        this.setState({
            a1:"",
            a2:"",
            a3:"",
            a4:"",
            a5:"",
            a6:"",
            a7:"",
            a8:"",
            a9:"",
            a10:""
        });
    }

    /*handleSubmit (event){
        event.preventDefault();
        const questionnaireRef = firebase.database().ref('usersCQ');
        const questionnaire ={
            answer1: this.state.a1,
            answer2: this.state.a2,
            answer3: this.state.a3,
            answer4: this.state.a4,
            answer5: this.state.a5,
            answer6: this.state.a6,
            answer7: this.state.a7,
            answer8: this.state.a8,
            answer9: this.state.a9,
            answer10: this.state.a10,
        }
        questionnaireRef.push(questionnaire);
        this.setState({
            a1:"",
            a2:"",
            a3:"",
            a4:"",
            a5:"",
            a6:"",
            a7:"",
            a8:"",
            a9:"",
            a10:""
        });
    }*/

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //not sure if i need this
    componentDidMount(){
        const questionnaireRef =firebase.database().ref('usersCQ');
        questionnaireRef.on('value',(snapshot)=>{
            let questionnaire=snapshot.val();
            let newState=[];
            for(let q in questionnaire){
                newState.push({
                    id:q,
                    answer1: questionnaire[q].answer1,
                    answer2: questionnaire[q].answer2,
                    answer3: questionnaire[q].answer3,
                    answer4: questionnaire[q].answer4,
                    answer5: questionnaire[q].answer5,
                    answer6: questionnaire[q].answer6,
                    answer7: questionnaire[q].answer7,
                    answer8: questionnaire[q].answer8,
                    answer9: questionnaire[q].answer9,
                    answer10: questionnaire[q].answer10,
                    //
                });
            }
            this.setState({
                questionnaire:newState
            });
        });
    }

    // need to add the bootstrap for this page
    //should add the value to all the options of select
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h2 class="display-4">Coding Questionnaire</h2>
                    </div>
                </div>
                <div class="form-row">
                <label>What motivates you to code?
                    <select class="form-control" id="a1" name="a1" onChange={this.handleChange} value={this.state.a1}>
                        <option selected></option><option>Inner Peace</option> <option>Success</option> <option>Fun</option>
                        <option>Power</option> <option>The Money</option>
                    </select>
                </label>
                <br />
                <label>What is your favorite coding langugage
                    <select class="form-control" id="a2" name="a2" onChange={this.handleChange} value={this.state.a2}>
                        <option selected></option><option>C</option> <option>C++</option> <option>Python</option>
                        <option>Java</option> <option>Matlab</option><option>HTML</option> <option>R</option> <option>Visual Basic</option><option>Fortran</option>
                        <option>Javascript</option> <option>C#</option><option>Ruby</option>
                    </select>
                </label>
                <br />
                <label> What is your favorite search algorithm?
                    <select class="form-control" id="a3" name="a3" onChange={this.handleChange} value={this.state.a3}>
                        <option selected></option><option>Sequential </option><option>Interval</option> <option>Binary</option>
                        <option>Linear</option> <option> Exponential</option> <option>Recursive</option>
                    </select>
                </label>
                <br />
                <label>Do you enjoy working in groups?
                    <select class="form-control" id="a4"name="a4" onChange={this.handleChange} value={this.state.a4}>
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>
                </label>
                <br />
                <label>IOS: Swift or Android Development?
                    <select class="form-control" id="a5" name="a5" onChange={this.handleChange} value={this.state.a5}>
                        <option selected></option><option>Swift</option><option>Android</option> 
                    </select>            
                </label>
                <br />
                <label>What is your favorite IDE?
                    <select class="form-control" id="a6" name="a6" onChange={this.handleChange} value={this.state.a6}>
                        <option selected></option><option>Vim</option><option>Emacs</option><option>IntelliJ</option> 
                        <option>Eclipse</option> <option>Visual Studio Code</option> <option>CodeBlocks</option> <option>Other</option>
                    </select>
                </label>
                <br />
                <label> How do you feel about web development?
                    <select class="form-control" id="a7" name="a7" onChange={this.handleChange} value={this.state.a7}>
                        <option selected></option><option>Yes, Love it!</option> <option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label> When do you like to code the most?
                    <select class="form-control" id="a8" name="a8" onChange={this.handleChange} value={this.state.a8}>
                        <option selected></option>
                        <option>Early Morning</option><option>Late Night</option><option>Between Tasks</option>
                        <option>Whenever Inspiration hits</option> <option>When I have planed a specific time to work on it</option>
                        <option>ALL THE TIME!!</option>
                    </select>
                </label>
                <br />
                <label>Do you enjoy participating in Hackathons?
                    <select class="form-control" id="a9" name="a9" onChange={this.handleChange} value={this.state.a9}>
                        <option selected></option><option>Yes, always</option><option>Most of the time</option><option> Sometimes</option> 
                        <option>Not so much, but I try too</option> <option>No</option>
                    </select>
                </label>
                <br />
                <label>Favorite Data Structure?
                    <select class="form-control" id="a10" name="a10" onChange={this.handleChange} value={this.state.a10}>
                        <option selected></option><option>Arrays</option><option>Linked Lists</option> <option>Trees</option>
                        <option>Stack</option> <option>Queue</option><option>Hashing</option> <option>Heap</option> <option>Graph</option> <option>C++ Vector</option>
                    </select>
                </label>
                <br />
            </div>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </form>
           
        );
    }
}
 
export default CodingQuestionnaire;