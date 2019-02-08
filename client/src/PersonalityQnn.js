import React, { Component } from 'react';
import firebase from './firebase.js';
//var database = firebase.database();
//username

class PersonalityQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"", 
            gender:"",
            age:"",
            location:"",
            attrgender:"",
            a1:"",
            a2:"",
            a3:"",
            a3:"",
            a4:"",
            a5:"",
            a6:"",
            a7:"",
            a8:"",
            a9:"",
            a10:"",
            a11:"",
            a12:"",
            a13:"",
            a13:"",
            a14:"",
            a15:"",
            a16:"",
            a17:"",
            description:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   /*writePQData(gender,age,location, attrgender,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,
        a12,a13,a14,a15,a16,a17,description){
         firebase.database().ref('Users/').set({
            gender,age,location, attrgender,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,
            a12,a13,a14,a15,a16,a17,description
         }).then((data)=>{
             console.log('data',data)
         }).catch((error)=>{
             console.log('error',error)
         })
        }*/

    handleSubmit (event){
        event.preventDefault();
        const questionnaireRef = firebase.database().ref('user');
        const questionnaire ={
            user: this.state.username,
            gender: this.state.gender,
            age: this.state.age,
            location: this.state.location,
            attractGender: this.state.attrgender,
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
            answer11: this.state.a11,
            answer12: this.state.a12,
            answer13: this.state.a13,
            answer14: this.state.a14,
            answer15: this.state.a15,
            answer16: this.state.a16,
            answer17: this.state.a17,
            describe: this.state.description
        }
        questionnaireRef.push(questionnaire);
        this.setState({
            username:"",
            gender:"",
            age:"",
            location:"",
            attrgender:"",
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
            a11:"",
            a12:"",
            a13:"",
            a13:"",
            a14:"",
            a15:"",
            a16:"",
            a17:"",
            description:""
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //not sure if i need this
    componentDidMount(){
        const questionnaireRef =firebase.database().ref('usersPQ');
        questionnaireRef.on('value',(snapshot)=>{
            let questionnaire=snapshot.val();
            let newState=[];
            for(let q in questionnaire){
                newState.push({
                    id:q,
                    user: questionnaire[q].user,
                    gender: questionnaire[q].gender,
                    age: questionnaire[q].age,
                    location: questionnaire[q].location,
                    attractGender: questionnaire[q].attractGender,
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
                    answer11: questionnaire[q].answer11,
                    answer12: questionnaire[q].answer12,
                    answer13: questionnaire[q].answer13,
                    answer14: questionnaire[q].answer14,
                    answer15: questionnaire[q].answer15,
                    answer16: questionnaire[q].answer16,
                    answer17: questionnaire[q].answer17,
                    describe: questionnaire[q].description 
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
                        <h2 class="display-4">Personality Questionnaire</h2>
                    </div>
                </div>
                <div class="form-row">
                    <h4>About You...</h4>
                    <label> Please enter your username:
                        <input class="form-control" id="username" name="username" onChange={this.handleChange} value={this.state.username}/>
                    </label>
                    <br />
                    <div class="form-group col-md-6">
                        <label for="Gender">Gender
                        <select class="form-control" id="gender" onChange={this.handleChange} value={this.state.gender}>
                            <option selected>Choose..</option><option>Male</option><option>Female</option>
                        </select>             
                        </label>
                    </div>
                    <br />
                    <div class="form-group col-md-2">
                        <label for="age">Age
                            <input class="form-control" id="age" name="age" onChange={this.handleChange} value={this.state.age}/> 
                        </label>
                    </div>
                    <br />
                    <div class="form-group col-md-4">
                        <label for="location">Location
                            <input type="text" class="form-control" id="location" name="location" onChange={this.handleChange} value={this.state.location}/>
                        </label>
                    </div>
                    <br />
                </div>
            <div class="form-group col-md-12">
                <label> Interested in?
                    <select class="form-control" id="attrgender" name="attrgender" onChange={this.handleChange} value={this.state.attrgender}>
                        <option selected></option><option>Men</option><option>Women</option><option>Both</option> 
                    </select>
                </label>
                <br />
                <label>What motivates you?
                    <select class="form-control" id="a1" name="a1" onChange={this.handleChange} value={this.state.a1}>
                        <option selected></option><option>Inner Peace</option> <option>Success</option> <option>Family</option>
                        <option>Power</option> <option>Competition</option>
                    </select>
                </label>
                <br />
                <label>What do you value the most?
                    <select class="form-control" id="a2" name="a2" onChange={this.handleChange} value={this.state.a2}>
                        <option selected></option><option>Spontaneity</option> <option>Wellness</option> <option>Intelligence</option>
                        <option>Fun</option> <option>Loyalty</option>
                    </select>
                </label>
                <br />
                <label>Would you call yourself an introvert or an extrovert?
                    <select class="form-control" id="a3" name="a3" onChange={this.handleChange} value={this.state.a3}>
                        <option selected></option><option>Extrovert</option><option>Introvert</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy meeting new people?
                    <select class="form-control" id="a4"name="a4" onChange={this.handleChange} value={this.state.a4}>
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>
                </label>
                <br />
                <label>Do you like helping people?
                    <select class="form-control" id="a5" name="a5" onChange={this.handleChange} value={this.state.a5}>
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>            
                </label>
                <br />
                <label>What types of activities do you prefer?
                    <select class="form-control" id="a6" name="a6" onChange={this.handleChange} value={this.state.a6}>
                        <option selected></option><option>Indoor</option><option>Outdoor</option><option>Both</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy listetning to music?
                    <select class="form-control" id="a7" name="a7" onChange={this.handleChange} value={this.state.a7}>
                        <option selected></option><option>Yes, Love it!</option><option>Occasionally</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label> When do you feel like you get the most done?
                    <select class="form-control" id="a8" name="a8" onChange={this.handleChange} value={this.state.a8}>
                        <option selected></option>
                        <option>Early Morning</option><option>Late Night</option><option>Between Tasks</option>
                        <option>Whenever Inspiration hits</option> <option>When I have planed a specific time to work on it</option>
                    </select>
                </label>
                <br />
                <label>Do you find it easy to stay relaxed when there is some pressure?
                    <select class="form-control" id="a9" name="a9" onChange={this.handleChange} value={this.state.a9}>
                        <option selected></option><option>Yes, always</option><option>Most of the time</option><option> Sometimes</option> 
                        <option>Not so much, but I try too</option> <option>No</option>
                    </select>
                </label>
                <br />
                <label>Do you prefer variety to routine?
                    <select class="form-control" id="a10" name="a10" onChange={this.handleChange} value={this.state.a10}>
                        <option selected></option><option>Variety</option><option>Routine</option>
                    </select>
                </label>
                <br />
                <label>Do you love to solve complex problems?
                    <select class="form-control" id="a11" name="a11" onChange={this.handleChange} value={this.state.a11}>
                        <option selected></option><option>Yes, Love it!</option><option>Sometimes</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>Do you like to be in the center of attention?
                    <select class="form-control" id="a12" name="a12" onChange={this.handleChange} value={this.state.a12}>
                        <option selected></option><option>Yes, Love it!</option><option>Sometimes</option><option>It depends on the situation</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>How do you feel about trying new things?
                    <select class="form-control" id="a13" name="a13" onChange={this.handleChange} value={this.state.a13}>
                        <option selected></option><option>I love trying new things!</option><option>I'm okay at it</option><option>It depends on the thing</option> <option>I'd rather not if I could</option> 
                    </select>
                </label>
                <br />
                <label>Would you describe yourself as a go-getter?
                    <select class="form-control" id="a14" name="a14" onChange={this.handleChange} value={this.state.a14}>
                        <option selected></option><option>Yes, of course</option><option>Sometimes, when I need to be</option><option>Not really</option> 
                    </select>
                </label>
                <br />
                <label>How do you feel about large parties?
                    <select class="form-control" id="a15" name="a15" onChange={this.handleChange} value={this.state.a15}>
                        <option selected></option><option>I love them!</option> <option>They are fun every once in a while</option> <option>Not really a fan of them</option> <option>I hate them</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy being part of a group?
                    <select class="form-control" id="a16" name="a16" onChange={this.handleChange} value={this.state.a16}>
                        <option selected></option><option>Yes, Love it!</option><option>Yes, they can be fun</option><option>Sometimes</option><option>No, I like to do my own thing </option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>Do you believe others have good intentions?
                    <select class="form-control" id="a17" name="a17" onChange={this.handleChange} value={this.state.a17}>
                        <option selected></option><option>Yes!</option><option>Most people</option><option>Not sure</option><option>No, a few do</option> <option>No, I don't trust anyone</option> 
                    </select>
                </label>
                <br />
                <label>Add a Description about yourself
                    <input class="form-control" id="description" name="description" onChange={this.handleChange} value={this.state.description}/>
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
           
        );
    }
}
 
export default PersonalityQuestionnaire;