import React, { Component } from 'react'
import './css/MatchesPanel.css'
import MiniProfile from './MiniProfile'
import ReportButton from './ReportButton'
import ReactDOM from 'react-dom'
import SpinningLoader from './SpinningLoader'
import firebase from './firebase'

class MatchesPanel extends Component {
	constructor() {
		super()
		this.Unlike = this.Unlike.bind(this)
		this.Report = this.Report.bind(this)
		this.state = {
			online: null,
			lastOnline: null
		}
	}

	componentDidMount() {
		const db = firebase.firestore()
		let that = this

		const statRef = db.collection('userStats').doc(this.props.userData.uid)
		statRef
			.get()
			.then(function(doc) {
				var lastOnlineTime = doc.data().lastOnlineTime || new Date().getTime()
				var lastCheck = Math.floor(
					(new Date().getTime() - lastOnlineTime) / 1000
				)
				var onlineString = 'Online'
				let lonline
				if (lastCheck < 11) {
					lonline = true
					onlineString = 'Online'
				} else if (lastCheck < 3600) {
					lonline = false
					var timeInMinutes = Math.ceil(lastCheck / 60)
					if (timeInMinutes > 1) {
						onlineString = 'Last seen ' + timeInMinutes + ' minutes ago'
					} else {
						onlineString = 'Last seen ' + timeInMinutes + ' minute ago'
					}
				} else if (lastCheck < 86400) {
					lonline = false
					onlineString =
						'Last seen ' + Math.floor(lastCheck / 3600) + ' hours ago'
				} else {
					lonline = false
					onlineString =
						'Last seen ' + Math.floor(lastCheck / 86400) + ' days ago'
				}
				that.setState({
					online: lonline,
					lastOnline: onlineString
				})
			})
			.catch(function(error) {
				console.log('Error getting document:', error)
			})
	}

	isOnline() {
		if (this.state.online !== null) {
			return this.state.online
		}
		return false
	}

	Unlike(e) {
		this.props.unlikeFunct(this.props.userData.user)
		this.addLoadingEffect(e.target)
	}
	Report(message) {
		this.props.reportFunct(
			this.props.userData.uid,
			this.props.userData.user,
			message
		)
	}
	addLoadingEffect(elementNode) {
		ReactDOM.render(<SpinningLoader />, elementNode)
	}
	render() {
		return (
			<div className="MatchesPanel">
				<MiniProfile
					userData={this.props.userData}
					match_percent={this.props.match_percent}
				>
					{this.isOnline() ? (
						<b className="online">{this.state.lastOnline}</b>
					) : (
						<p className="offline">{this.state.lastOnline}</p>
					)}
				</MiniProfile>
				<button
					type="button"
					onClick={this.Unlike}
					className="btn btn-outline-danger"
				>
					Remove Match
				</button>
				<ReportButton
					reportHandler={this.Report}
					userData={this.props.userData}
				/>
			</div>
		)
	}
}

export default MatchesPanel
