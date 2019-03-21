import React, { Component } from 'react'
import './css/ExtraProfImgs.css'
import firebase from './firebase'

//takes in prop userPQ data and renders the users profile image, if no profile image, then render the default profile picture

class ProfileImage2 extends Component {
	constructor() {
		super()
		this.state = {
			url: null,
			exists: false
		}
	}

	componentDidMount() {
		if (this.props.uData.pictureFile2 !== undefined) {
			firebase
				.storage()
				.ref()
				.child('user_images/' + this.props.uData.pictureFile2)
				.getDownloadURL()
				.then((URL) => {
					this.setState({
						url: URL
					})
				})
				.catch(function(error) {
					console.log(error)
				})
		} else {
		}
	}
	render() {
		return (
			<div className="extra_profile_image_display">
				{this.state.exists ? (
					<img
						src={this.state.url}
						alt={this.props.uData.user + "'s Profile Picture"}
					/>
				) : (
					<React.Fragment />
				)}
			</div>
		)
	}
}

export default ProfileImage2
