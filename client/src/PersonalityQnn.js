import React, { Component } from 'react';

class PersonalityQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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
        };
    }

    handleSubmit (event){

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
                    <div class="form-group col-md-6">
                        <label for="Gender">Gender
                        <select class="form-control" id="gender" >
                            <option selected>Choose..</option><option>Male</option><option>Female</option>
                        </select>             
                        </label>
                    </div>
                    <br />
                    <div class="form-group col-md-2">
                        <label for="age">Age
                            <input class="form-control" id="age"/> 
                        </label>
                    </div>
                    <br />
                    <div class="form-group col-md-4">
                        <label for="location">Location
                            <input type="text" class="form-control" id="location"/>
                        </label>
                    </div>
                    <br />
                </div>
            <div class="form-group col-md-12">
                <label> Interested in?
                    <select class="form-control" id="">
                        <option selected></option><option>Men</option><option>Women</option><option>Both</option> 
                    </select>
                </label>
                <br />
                <label>What motivates you?
                    <select class="form-control" id="a1">
                        <option selected></option><option>Inner Peace</option> <option>Success</option> <option>Family</option>
                        <option>Power</option> <option>Competition</option>
                    </select>
                </label>
                <br />
                <label>What do you value the most?
                    <select class="form-control" id="a2">
                        <option selected></option><option>Spontaneity</option> <option>Wellness</option> <option>Intelligence</option>
                        <option>Fun</option> <option>Loyalty</option>
                    </select>
                </label>
                <br />
                <label>Would you call yourself an introvert or an extrovert?
                    <select class="form-control" id="a3">
                        <option selected></option><option>Extrovert</option><option>Introvert</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy meeting new people?
                    <select class="form-control" id="a4">
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>
                </label>
                <br />
                <label>Do you like helping people?
                    <select class="form-control" id="a5">
                        <option selected></option><option>Yes</option><option>No</option> 
                    </select>            
                </label>
                <br />
                <label>What types of activities do you prefer?
                    <select class="form-control" id="a6">
                        <option selected></option><option>Indoor</option><option>Outdoor</option><option>Both</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy listetning to music?
                    <select class="form-control" id="a7">
                        <option selected></option><option>Yes, Love it!</option><option>Occasionally</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label> When do you feel like you get the most done?
                    <select class="form-control" id="a8">
                        <option selected></option>
                        <option>Early Morning</option><option>Late Night</option><option>Between Tasks</option>
                        <option>Whenever Inspiration hits</option> <option>When I have planed a specific time to work on it</option>
                    </select>
                </label>
                <br />
                <label>Do you find it easy to stay relaxed when there is some pressure?
                    <select class="form-control" id="a9">
                        <option selected></option><option>Yes, always</option><option>Most of the time</option><option> Sometimes</option> 
                        <option>Not so much, but I try too</option> <option>No</option>
                    </select>
                </label>
                <br />
                <label>Which word best describes you?
                    <select class="form-control" id="a10">
                        <option selected></option><option>Athletic</option><option>Word1</option><option>Word2</option> 
                    </select>
                </label>
                <br />
            </div>
        </form>
           
        );
    }
}
 
export default PersonalityQuestionnaire;