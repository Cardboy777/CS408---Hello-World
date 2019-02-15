import React, { Component } from 'react';
import firebase from './firebase.js';
import './PersonalityQnn.css';
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
            pa1:"",
            pa2:"",
            pa3:"",
            pa4:"",
            pa5:"",
            pa6:"",
            pa7:"",
            pa8:"",
            pa9:"",
            pa10:"",
            pa11:"",
            pa12:"",
            pa13:"",
            pa14:"",
            pa15:"",
            pa16:"",
            pa17:"",
            description:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    /*handleSubmit (event){
        event.preventDefault();
        const questionnaireRef = firebase.database().ref('usersPQ');
        const questionnaire ={
            user: this.state.username,
            gender: this.state.gender,
            age: this.state.age,
            location: this.state.location,
            attractGender: this.state.attrgender,
            panswer1: this.state.pa1,
            panswer2: this.state.pa2,
            panswer3: this.state.pa3,
            panswer4: this.state.pa4,
            panswer5: this.state.pa5,
            panswer6: this.state.pa6,
            panswer7: this.state.pa7,
            panswer8: this.state.pa8,
            panswer9: this.state.pa9,
            panswer10: this.state.pa10,
            panswer11: this.state.pa11,
            panswer12: this.state.pa12,
            panswer13: this.state.pa13,
            panswer14: this.state.pa14,
            panswer15: this.state.pa15,
            panswer16: this.state.pa16,
            panswer17: this.state.pa17,
            describe: this.state.description
        }
        questionnaireRef.push(questionnaire);
        this.setState({
            username:"",
            gender:"",
            age:"",
            location:"",
            attrgender:"",
            pa1:"",
            pa2:"",
            pa3:"",
            pa4:"",
            pa5:"",
            pa6:"",
            pa7:"",
            pa8:"",
            pa9:"",
            pa10:"",
            pa11:"",
            pa12:"",
            pa13:"",
            pa14:"",
            pa15:"",
            pa16:"",
            pa17:"",
            description:""
        });
    }
    */
    handleValidation(){
        //window.alert("Inside Validation function");
        if(this.state.username===""){ window.alert("Invalid Username Input"); return false; }
        else if(this.state.gender===""){ window.alert("Invalid Gender Input"); return false; }
        else if(this.state.age===""){ window.alert("Invalid Age Input"); return false; }
        else if(/[^0-9]+/.test(this.state.age)){ window.alert("Invalid Age Input"); return false;}
        else if(this.state.location===""){ window.alert("Invalid Location Input"); return false; }
        else if(this.state.attrgender===""){ window.alert("Invalid Interested In Input"); return false; }
        else if(this.state.pa1===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa2===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa3===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa4===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa5===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa6===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa7===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa8===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa9===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa10===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa11===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa12===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa13===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa14===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa15===""){ window.alert("Invalid Question Input");return false;}
        else if(this.state.pa16===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.pa17===""){ window.alert("Invalid Question Input"); return false;}
        else if(this.state.description===""){ window.alert("Invalid Description Input"); return false;}
        else{ /*window.alert("Returns true");*/ return true;}
    }

    handleSubmit = e =>{
        e.preventDefault();
        const db =firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        
        if (!this.handleValidation()){
            //window.alert("Inside if");
            return;
        } 
        //window.localStorage.setItem("username",this.state.username.jsonStringify);

        const questionnaireRef=db.collection("usersPQ").add({
            user: this.state.username,
            gender: this.state.gender,
            age: this.state.age,
            location: this.state.location,
            attractGender: this.state.attrgender,
            panswer1: this.state.pa1,
            panswer2: this.state.pa2,
            panswer3: this.state.pa3,
            panswer4: this.state.pa4,
            panswer5: this.state.pa5,
            panswer6: this.state.pa6,
            panswer7: this.state.pa7,
            panswer8: this.state.pa8,
            panswer9: this.state.pa9,
            panswer10: this.state.pa10,
            panswer11: this.state.pa11,
            panswer12: this.state.pa12,
            panswer13: this.state.pa13,
            panswer14: this.state.pa14,
            panswer15: this.state.pa15,
            panswer16: this.state.pa16,
            panswer17: this.state.pa17,
            describe: this.state.description,
            canswer1:'',
            canswer2:'',
            canswer3:'',
            canswer4:'',
            canswer5:'',
            canswer6:'',
            canswer7:'',
            canswer8:'',
            canswer9:'',
            canswer10:''
        });
        //reset the state
        this.setState({
            username:"",
            gender:"",
            age:"",
            location:"",
            attrgender:"",
            pa1:"",
            pa2:"",
            pa3:"",
            pa4:"",
            pa5:"",
            pa6:"",
            pa7:"",
            pa8:"",
            pa9:"",
            pa10:"",
            pa11:"",
            pa12:"",
            pa13:"",
            pa14:"",
            pa15:"",
            pa16:"",
            pa17:"",
            description:""
        });
    };
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    
    //not sure if i need this
    /*componentDidMount(){
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
                    panswer1: questionnaire[q].panswer1,
                    panswer2: questionnaire[q].panswer2,
                    panswer3: questionnaire[q].panswer3,
                    panswer4: questionnaire[q].panswer4,
                    panswer5: questionnaire[q].panswer5,
                    panswer6: questionnaire[q].panswer6,
                    panswer7: questionnaire[q].panswer7,
                    panswer8: questionnaire[q].panswer8,
                    panswer9: questionnaire[q].panswer9,
                    panswer10: questionnaire[q].panswer10,
                    panswer11: questionnaire[q].panswer11,
                    panswer12: questionnaire[q].panswer12,
                    panswer13: questionnaire[q].panswer13,
                    panswer14: questionnaire[q].panswer14,
                    panswer15: questionnaire[q].panswer15,
                    panswer16: questionnaire[q].panswer16,
                    panswer17: questionnaire[q].panswer17,
                    describe: questionnaire[q].description 
                    //
                });
            }
            this.setState({
                questionnaire:newState
            });
        });
    }*/

    //should add the value to all the options of select
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit} id="pform">
                <div class="jumbotron jumbotron-fluid" >
                    <div class="container">
                        <h2 class="display-4"id="jumboText">Personality Questionnaire</h2>
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <h4>About You...</h4>    
                    <label> Please enter your username:
                        <input class="form-control" id="username" name="username" onChange={this.handleChange} value={this.state.username}/>
                    </label>
                </div>
                <div class="form-group col-md-12"> 
                <label for="Gender">Gender
                <select class="form-control" id="gender" name="gender" onChange={this.handleChange} value={this.state.gender}>
                    <option></option> <option>Male</option><option>Female</option>
                </select>             
                </label>
                <label for="age">Age
                    <input class="form-control" id="age" name="age" onChange={this.handleChange} value={this.state.age}/> 
                </label>
                <label for="location">Location
                    <input type="text" class="form-control" id="location" name="location" onChange={this.handleChange} value={this.state.location}/>
                </label>
            </div>        
            <div class="form-group col-md-12">
                <label>Are you interested in?
                    <select class="form-control" id="attrgender" name="attrgender" onChange={this.handleChange} value={this.state.attrgender}>
                        <option selected></option><option>Men</option><option>Women</option><option>Both</option> 
                    </select>
                </label>
                <br />
                <label>What motivates you?
                    <select class="form-control" id="pa1" name="pa1" onChange={this.handleChange} value={this.state.pa1}>
                        <option selected></option><option>Inner Peace</option> <option>Success</option> <option>Family</option>
                        <option>Power</option> <option>Competition</option>
                    </select>
                </label>
                <br />
                <label>What do you value the most?
                    <select class="form-control" id="pa2" name="pa2" onChange={this.handleChange} value={this.state.pa2}>
                        <option selected></option><option>Spontaneity</option> <option>Wellness</option> <option>Intelligence</option>
                        <option>Fun</option> <option>Loyalty</option>
                    </select>
                </label>
                <br />
                <label>Would you call yourself an introvert or an extrovert?
                    <select class="form-control" id="pa3" name="pa3" onChange={this.handleChange} value={this.state.pa3}>
                        <option selected></option><option>Extrovert</option><option>Introvert</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy meeting new people?
                    <select class="form-control" id="pa4"name="pa4" onChange={this.handleChange} value={this.state.pa4}>
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>
                </label>
                <br />
                <label>Do you like helping people?
                    <select class="form-control" id="pa5" name="pa5" onChange={this.handleChange} value={this.state.pa5}>
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>            
                </label>
                <br />
                <label>What types of activities do you prefer?
                    <select class="form-control" id="pa6" name="pa6" onChange={this.handleChange} value={this.state.pa6}>
                        <option selected></option><option>Indoor</option><option>Outdoor</option><option>Both</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy listetning to music?
                    <select class="form-control" id="pa7" name="pa7" onChange={this.handleChange} value={this.state.pa7}>
                        <option selected></option><option>Yes, Love it!</option><option>Occasionally</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label> When do you feel like you get the most done?
                    <select class="form-control" id="pa8" name="pa8" onChange={this.handleChange} value={this.state.pa8}>
                        <option selected></option>
                        <option>Early Morning</option><option>Late Night</option><option>Between Tasks</option>
                        <option>Whenever Inspiration hits</option> <option>When I have planed a specific time to work on it</option>
                    </select>
                </label>
                <br />
                <label>Do you find it easy to stay relaxed when there is some pressure?
                    <select class="form-control" id="pa9" name="pa9" onChange={this.handleChange} value={this.state.pa9}>
                        <option selected></option><option>Yes, always</option><option>Most of the time</option><option> Sometimes</option> 
                        <option>Not so much, but I try too</option> <option>No</option>
                    </select>
                </label>
                <br />
                <label>Do you prefer variety to routine?
                    <select class="form-control" id="pa10" name="pa10" onChange={this.handleChange} value={this.state.pa10}>
                        <option selected></option><option>Variety</option><option>Routine</option>
                    </select>
                </label>
                <br />
                <label>Do you love to solve complex problems?
                    <select class="form-control" id="pa11" name="pa11" onChange={this.handleChange} value={this.state.pa11}>
                        <option selected></option><option>Yes, Love it!</option><option>Sometimes</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>Do you like to be in the center of attention?
                    <select class="form-control" id="pa12" name="pa12" onChange={this.handleChange} value={this.state.pa12}>
                        <option selected></option><option>Yes, Love it!</option><option>Sometimes</option><option>It depends on the situation</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>How do you feel about trying new things?
                    <select class="form-control" id="pa13" name="pa13" onChange={this.handleChange} value={this.state.pa13}>
                        <option selected></option><option>I love trying new things!</option><option>I'm okay at it</option><option>It depends on the thing</option> <option>I'd rather not if I could</option> 
                    </select>
                </label>
                <br />
                <label>Would you describe yourself as a go-getter?
                    <select class="form-control" id="pa14" name="pa14" onChange={this.handleChange} value={this.state.pa14}>
                        <option selected></option><option>Yes, of course</option><option>Sometimes, when I need to be</option><option>Not really</option> 
                    </select>
                </label>
                <br />
                <label>How do you feel about large parties?
                    <select class="form-control" id="pa15" name="pa15" onChange={this.handleChange} value={this.state.pa15}>
                        <option selected></option><option>I love them!</option> <option>They are fun every once in a while</option> <option>Not really a fan of them</option> <option>I hate them</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy being part of a group?
                    <select class="form-control" id="pa16" name="pa16" onChange={this.handleChange} value={this.state.pa16}>
                        <option selected></option><option>Yes, Love it!</option><option>Yes, they can be fun</option><option>Sometimes</option><option>No, I like to do my own thing </option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>Do you believe others have good intentions?
                    <select class="form-control" id="pa17" name="pa17" onChange={this.handleChange} value={this.state.pa17}>
                        <option selected></option><option>Yes!</option><option>Most people</option><option>Not sure</option><option>No, a few do</option> <option>No, I don't trust anyone</option> 
                    </select>
                </label>
                <br />
                <label>Add a Description about yourself: 
                    <textarea class="form-control" id="description" name="description" onChange={this.handleChange} value={this.state.description}/>
                </label>
                <br/>
                <button type="submit" class="btn btn-outline-light btn-lg">Submit</button>
                <a href="/PersonalityQuestionnaire" class="btn btn-outline-light btn-lg" >Next Questionnaire</a>
            </div>
        </form>        
        );
    }
}
 
export default PersonalityQuestionnaire;