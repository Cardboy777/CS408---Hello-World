import React, { Component } from 'react'
import './css/Matches.css'
import MatchesPanel from './MatchesPanel'
import Header from './Header'
import Loading from './Loading'
import ListLoadingError from './ListLoadingError'
import firebase from './firebase'

class Matches extends Component {
	constructor() {
		super()
		this.state = {
			loading_state: 0,
			user_list: null,
			user_list_index: 0
		}
		this.fetchMatches = this.fetchMatches.bind(this)
		this.RemoveUserFromList = this.RemoveUserFromList.bind(this)
		this.getMoreMatches = this.getMoreMatches.bind(this)
		this.UnlikeUser = this.UnlikeUser.bind(this)
		this.ReportUser = this.ReportUser.bind(this)
	}

	componentDidMount() {
		this.fetchMatches()
	}

	//requests more potentail matches from the server
	fetchMatches() {
		fetch('/api/getMatches', {
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
				//console.log(arrayList);
				this.getUserListData(arrayList)
			})
			.catch((message) => {
				this.setState({
					loading_state: 2
				})
			})
	}

	getMoreMatches(e) {
		e.preventDefault()
		this.fetchMatches()
		this.forceUpdate()
	}

	RemoveUserFromList(matchedUser) {
		let index = this.findUserIndex(matchedUser)
		if (index) {
			this.setState({
				user_list: this.state.user_list.splice(index, 1),
				user_list_index:
					this.state.user_list_index > this.state.user_list.length - 2
						? this.state.user_list.length
						: this.state.user_list_index
			})
		}
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
	UnlikeUser(unlikedUser) {
		if (this.props.uData.user !== undefined) {
			fetch('/api/unlikeUser', {
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
					unlikedUserName: unlikedUser
				}) // body data type must match "Content-Type" header
			})
				.then((res) => res.json())
				.then((arrayList) => {
					//console.log(arrayList);
					this.getUserListData(arrayList)
				})
				.catch((message) => {
					//console.log("Could not Unlike user " + unlikedUser);
				})
		}
	}
	ReportUser(ReportedUser, ReportedUserName, message) {
		fetch('/api/emailReportedMatchedUser', {
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
			.then((arrayList) => {
				this.getUserListData(arrayList)
				alert('User: ' + ReportedUserName + ' Successfully Reported')
			})
			.catch((message) => {
				//console.log("Could not Report user " + ReportedUserName);
				//console.log(message);
				this.fetchMatches()
			})
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
						// console.log(arraylist[k]);
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
					loading_state: 2
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
			<div id="matchesPage">
				<Header {...this.props} />
				{this.state.loading_state === 0 ? (
					<Loading />
				) : this.state.loading_state === 1 ? (
					<div className="panels-container">
						<h2>
							To Talk to your Matches, go the <a href="/messages">Messages</a>{' '}
							page
						</h2>
						<div className="row">
							{this.state.user_list.map((i) => (
								<div key={i.data.user} className="panel col-md-6">
									<MatchesPanel
										match_percent={i.match_percent}
										userData={i.data}
										unlikeFunct={this.UnlikeUser}
										reportFunct={this.ReportUser}
									/>
								</div>
							))}
						</div>
					</div>
				) : (
					<ListLoadingError>
						We couldn't find any matches for you. Try Visiting the '
						<a href="/matching">Find Matches</a>' page and Liking some users.
					</ListLoadingError>
				)}
			</div>
		)
	}
}

export default Matches
