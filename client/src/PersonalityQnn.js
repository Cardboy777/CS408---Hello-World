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
            a11:"",
            a12:"",
            a13:"",
            a13:"",
            a14:"",
            a15:"",
            a16:"",
            a17:"",
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
                <label>Do you prefer variety to routine?
                    <select class="form-control" id="a10">
                        <option selected></option><option>Variety</option><option>Routine</option>
                    </select>
                </label>
                <br />
                <label>Do you love to solve complex problems?
                    <select class="form-control" id="a11">
                        <option selected></option><option>Yes, Love it!</option><option>Sometimes</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>Do you like to be in the center of attention?
                    <select class="form-control" id="a12">
                        <option selected></option><option>Yes, Love it!</option><option>Sometimes</option><option>It depends on the situation</option><option>Not really</option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>How do you feel about trying new things?
                    <select class="form-control" id="a13">
                        <option selected></option><option>I love trying new things!</option><option>I'm okay at it</option><option>It depends on the thing</option> <option>I'd rather not if I could</option> 
                    </select>
                </label>
                <br />
                <label>Would you describe yourself as a go-getter?
                    <select class="form-control" id="a14">
                        <option selected></option><option>Yes, of course</option><option>Sometimes, when I need to be</option><option>Not really</option> 
                    </select>
                </label>
                <br />
                <label>How do you feel about large parties?
                    <select class="form-control" id="a15">
                        <option selected></option><option>I love them!</option> <option>They are fun every once in a while</option> <option>Not really a fan of them</option> <option>I hate them</option> 
                    </select>
                </label>
                <br />
                <label>Do you enjoy being part of a group?
                    <select class="form-control" id="a16">
                        <option selected></option><option>Yes, Love it!</option><option>Yes, they can be fun</option><option>Sometimes</option><option>No, I like to do my own thing </option> <option>I hate it</option> 
                    </select>
                </label>
                <br />
                <label>Do you believe others have good intentions?
                    <select class="form-control" id="a17">
                        <option selected></option><option>Yes!</option><option>Most people</option><option>Not sure</option><option>No, a few do</option> <option>No, I don't trust anyone</option> 
                    </select>
                </label>
                <br />
            </div>
        </form>
           
        );
    }
}
 
export default PersonalityQuestionnaire;