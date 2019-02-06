import React, { Component } from 'react';

class PersonalityQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            q1:"",
            q2:"",
            q3:"",

        }
    }

    handleSubmit (event){

    }
    //should add the value to all the options of select
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h2 class="display-4">Personality Questionnaire</h2>
                    </div>
                </div>
                <h4>About You...</h4>
                <label for="Gender">Gender
                   <select class="form-control" id="gender" >
                        <option selected>Choose..</option><option>Male</option><option>Female</option>
                    </select>             
                </label>
                <br />
                <label for="age">Age
                    <input  class="form-control" id="age"/> 
                </label>
                <label for="location">Location
                    <input type="text" class="form-control" id="location"/>
                </label>
                <label>What motivates you?
                    <select class="form-control" id="q1">
                        <option selected></option><option>Inner Peace</option> <option>Success</option> <option>Family</option>
                        <option>Power</option> <option>Competition</option>
                    </select>
                </label>
                <label>What do you value the most?
                    <select class="form-control" id="q2">
                        <option selected></option><option>Spontaneity</option> <option>Wellness</option> <option>Intelligence</option>
                        <option>Fun</option> <option>Loyalty</option>
                    </select>
                </label>
                <label>Would you call yourself an introvert or an extrovert?
                    <select class="form-control" id="q3">
                        <option selected></option><option>Extrovert</option><option>Introvert</option> 
                    </select>
                </label>
                <label>Do you enjoy meeting people?
                    <select class="form-control" id="q4">
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>
                </label>
                <label>Do you like helping people?
                    <select class="form-control" id="q5">
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>            
                </label>
                <label>What types of activities do you prefer?
                    <select class="form-control" id="q7">
                        <option selected></option><option>Indoor</option><option>Outdoor</option><option>Both</option> 
                    </select>
                </label>

            </form>
           
        );
    }
}
 
export default PersonalityQuestionnaire;