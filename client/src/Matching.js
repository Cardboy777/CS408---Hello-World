import React, { Component } from 'react'
import './css/Matching.css'
import MatchingPanel from './MatchingPanel'
import Header from './Header'
import Loading from './Loading'
import firebase from './firebase'
import ListLoadingError from './ListLoadingError'

class Matching extends Component {
	constructor() {
		super()
		this.state = {
			loading_state: 0,
			user_list: null,
			user_list_index: 0
		}
		this.fetchPotentialMatches = this.fetchPotentialMatches.bind(this)
		this.LikeUser = this.LikeUser.bind(this)
		this.DislikeUser = this.DislikeUser.bind(this)
		this.SkipUser = this.SkipUser.bind(this)
		this.ReportUser = this.ReportUser.bind(this)
		this.ViewNextProfile = this.ViewNextProfile.bind(this)
	}

	componentDidMount() {
		this.fetchPotentialMatches()
	}

	//requests more potentail matches from the server
	fetchPotentialMatches() {
		fetch('/api/getMorePotentialMatches', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// "Content-Type": "application/x-www-form-urlencoded",
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify({ username: this.props.uData.user }) // body data type must match "Content-Type" header
		})
			.then((res) => res.json())
			.then((arrayList) => {
				this.getUserListData(arrayList)
			})
			.catch((message) => {
				this.setState({
					loading_state: 2
				})
			})
	}

	findUserIndex(username) {
		for (let i in this.state.user_list) {
			if (i.data.user === username) {
				return this.state.userName.indexOf(i)
			}
		}
		//console.log("User not in matching list")
		return null
	}

	//Sends request to like the User
	LikeUser(likedUser) {
		if (this.props.uData.user !== undefined) {
			fetch('/api/likeUser', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, cors, *same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// "Content-Type": "application/x-www-form-urlencoded",
				},
				redirect: 'follow', // manual, *follow, error
				referrer: 'no-referrer', // no-referrer, *client
				body: JSON.stringify({
					userName: this.props.uData.user,
					likedUserName: likedUser
				}) // body data type must match "Content-Type" header
			})
				.then((res) => res.json())
				.then((arrayList) => {})
				.catch((message) => {
					//console.log("Could not Like user " + likedUser);
				})
		}
	}
	DislikeUser(dislikedUser) {
		if (this.props.uData.user !== undefined) {
			fetch('/api/dislikeUser', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, cors, *same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// "Content-Type": "application/x-www-form-urlencoded",
				},
				redirect: 'follow', // manual, *follow, error
				referrer: 'no-referrer', // no-referrer, *client
				body: JSON.stringify({
					userName: this.props.uData.user,
					dislikedUserName: dislikedUser
				}) // body data type must match "Content-Type" header
			})
				.then((res) => res.json())
				.then((arrayList) => {
					this.getUserListData(arrayList)
				})
				.catch((message) => {
					//console.log("Could not Dislike user " + dislikedUser);
				})
		}
	}
	SkipUser(skippedUser) {
		//console.log(this.props.uData.user + " Skipped " + skippedUser)
	}

	ReportUser(ReportedUser, ReportedUserName, message) {
		fetch('/api/emailReportedUser', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// "Content-Type": "application/x-www-form-urlencoded",
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify({
				userName: this.props.uData.user,
				reportedUser: ReportedUserName,
				reportedUid: this.props.uData.uid,
				reason: message
			}) // body data type must match "Content-Type" header
		})
			.then((res) => res.json())
			.then((arrayList) => {
				this.getUserListData(arrayList)
				alert('User: ' + ReportedUserName + ' Successfully Reported')
			})
			.catch((message) => {
				//console.log("Could not Report user " + ReportedUserName);
			})
	}

	ViewNextProfile() {
		this.setState({ user_list_index: this.user_list_index + 1 })
		this.forceUpdate()
	}

	getUserListData(arraylist) {
		//console.log(arraylist)
		let promises = []
		const db = firebase.firestore()
		for (let k in arraylist) {
			let result = db
				.collection('usersPQ')
				.doc(arraylist[k].uid)
				.get()
				.then((userdoc) => {
					if (userdoc.exists) {
						return userdoc.data()
					} else {
						//console.log('No user data available for ')
						//console.log(arraylist[k]);
					}
				})
				.catch((error) => {
					//console.log('Error gettign doc from DB for ')
					//console.log(arraylist[k]);
				})
			promises.push(result)
		}
		//wait for all promises in array to finish
		Promise.all(promises).then((newarray) => {
			let arry = []
			for (let i in arraylist) {
				if (newarray[i] !== undefined) {
					arry.push({
						uid: arraylist[i].uid,
						match_percent: arraylist[i].match_percent,
						user: arraylist[i].user,
						data: newarray[i]
					})
				}
			}
			//console.log("Final List:")
			//console.log(arry)
			if (arry.length === 0) {
				this.setState({
					loading_state: 3
				})
			} else {
				this.setState({
					user_list: arry,
					loading_state: 1
				})
			}
		})
	}

	render() {
		return (
			<div id="matchingPage">
				<Header {...this.props} />
				{this.state.loading_state === 0 ? (
					<Loading />
				) : this.state.loading_state === 1 ? (
					<div className="panels-container">
						<div className="row">
							{this.state.user_list.map((i) => (
								<div key={i.data.uid} className="panel col-md-6">
									<MatchingPanel
										match_percent={i.match_percent}
										userData={i.data}
										likeFunct={this.LikeUser}
										dislikeFunct={this.DislikeUser}
										skipFunct={this.SkipUser}
										reportFunct={this.ReportUser}
									/>
								</div>
							))}
						</div>
					</div>
				) : this.state.loading_state === 2 ? (
					<ListLoadingError>
						<p>
							We couldn't load any potential matches. Try reloading the page.
						</p>
					</ListLoadingError>
				) : (
					<ListLoadingError>
						<p>You've gone through our whole database of users!</p>{' '}
						<p>Good job(?)</p>{' '}
						<p>
							Hello World is still growing its userbase so hold tight for new
							people to discover us. Check again later for new users.
						</p>
					</ListLoadingError>
				)}
			</div>
		)
	}
}

export default Matching
