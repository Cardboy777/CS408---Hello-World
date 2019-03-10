import React, { Component } from 'react';
import './css/MiniProfile.css';
import ProfileImage from './ProfileImage';
import ProfileImage1 from './ProfileImage1';
import ProfileImage2 from './ProfileImage2';
import ProfileImage3 from './ProfileImage3';

class MiniProfile extends Component {

    render() {
        return (
            <div className='MiniProfileWidget'>
                <div className="row">
                    <div className='profImgDiv col-md-3'>
                        <ProfileImage uData={this.props.userData}/>
                    </div>
                    <div className='col-md-9'>
                        <div className='row'>
                            <div className='usernameDiv col-md-10'>
                                <h1 className="name">{this.props.userData.user}</h1>
                                <p className='desc'>{this.props.userData.describe}</p>
                            </div>
                            <div className='compatibilityDiv col-md-1'>
                                <h2 className="compat-percent">{this.props.match_percent}%</h2>
                            </div>
                            </div>
                            <div className='row'>
                            <div className='col-md-4 profSect'>
                                <h4>Gender</h4>
                                <p>{this.props.userData.gender}</p>
                            </div>
                            <div className='col-md-4 profSect'>
                                <h4>Location</h4>
                                <p>{this.props.userData.location}</p>
                            </div>
                            <div className='col-md-4 profSect'>
                                <h4>Values</h4>
                                <p>{this.props.userData.panswer2}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row extra-row'>
                    <div className='col-md-4 profSect'>
                        <h3>Language</h3>
                        <p>{this.props.userData.canswer2}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Data Structure</h3>
                        <p>{this.props.userData.canswer10}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Editor</h3>
                        <p>{this.props.userData.canswer6}</p>
                    </div>
                </div>

                <div className='row extra-row'>
                    <div className='col-md-4 profSect'>
                        <h3>Search Algorithm</h3>
                        <p>{this.props.userData.canswer3}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Works Best</h3>
                        <p>{this.props.userData.panswer8}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Personality</h3>
                        <p>{this.props.userData.panswer3}</p>
                    </div>
                </div>

                <div className='row extra-row'>
                    <div className='col-md-4 profSect'>
                        <h3>Motivation</h3>
                        <p>{this.props.userData.panswer1}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Indoor/Outdoor</h3>
                        <p>{this.props.userData.panswer6}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Motivation (Coding)</h3>
                        <p>{this.props.userData.canswer1}</p>
                    </div>
                </div>

                <div className='row extra-row'>
                    <div className='col-md-4 profSect'>
                        <h3>Music</h3>
                        <p>{this.props.userData.panswer7}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Codes During</h3>
                        <p>{this.props.userData.canswer8}</p>
                    </div>
                    <div className='col-md-4 profSect'>
                        <h3>Hackathons</h3>
                        <p>{this.props.userData.canswer9}</p>
                    </div>
                </div>
                <div className='row extra-row-imgs'>
                    <div className='col-md-4 profSect'>
                      <ProfileImage1 uData={this.props.userData}></ProfileImage1>
                    </div>
                    <div className='col-md-4 profSect'>
                        <ProfileImage2 uData={this.props.userData}></ProfileImage2>
                    </div>
                    <div className='col-md-4 profSect'>
                        <ProfileImage3 uData={this.props.userData}></ProfileImage3>
                    </div>
                </div>

                {/*
                <div className='row extra-row'>
                <div className='col-md-4 profSect'>
                    <h3></h3>
                    <p>{this.props.userData}</p>
                </div>
                <div className='col-md-4 profSect'>
                    <h3></h3>
                    <p>{this.props.userData}</p>
                </div>
                <div className='col-md-4 profSect'>
                    <h3></h3>
                    <p>{this.props.userData}</p>
                </div>
                </div>
                */}
            </div>
        )
    }
}

export default MiniProfile;