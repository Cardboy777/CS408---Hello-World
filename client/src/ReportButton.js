import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SpinningLoader from './SpinningLoader'
import './css/ReportButton.css'
class ReportButton extends Component {
	constructor() {
		super()
		this.state = {
			message: null
		}
		this.SubmitReport = this.SubmitReport.bind(this)
		this.handleRadioChange = this.handleRadioChange.bind(this)
		this.removeLoadingEffect = this.removeLoadingEffect.bind(this)
	}

	SubmitReport(e) {
		e.preventDefault()
		let message = this.state.message

		if (!message) {
			document.getElementById(
				this.props.userData.user + '-report-form-error'
			).innerHTML = 'Please select an option.'
			return
		}
		if (message === 'other') {
			let elem = document.getElementById(
				this.props.userData.user + '-other-entry'
			)
			if (elem.value !== '') {
				message = elem.value
			} else {
				document.getElementById(
					this.props.userData.user + '-report-form-error'
				).innerHTML = 'Please enter a reason for reporting.'
				return
			}
		}
		this.props.reportHandler(message)
	}

	handleRadioChange(e) {
		this.setState({
			message: e.target.value
		})
		if (e.target.value === 'other') {
			document.getElementById(
				this.props.userData.user + '-other-entry'
			).disabled = false
		} else {
			document.getElementById(
				this.props.userData.user + '-other-entry'
			).disabled = true
		}
	}
	addLoadingEffect(e) {
		ReactDOM.render(<SpinningLoader />, e.target)
	}
	removeLoadingEffect(e) {}

	render() {
		return (
			<span className="reportButtonComponent">
				<button
					type="button"
					id={this.props.userData.user + '-report-button'}
					className="report btn btn-outline-secondary"
					data-toggle="modal"
					onClick={this.addLoadingEffect}
					data-target={'#' + this.props.userData.user + '-report'}
				>
					Report
				</button>
				<div
					className="modal fade"
					id={this.props.userData.user + '-report'}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="exampleModalCenterTitle"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">
									Report User: <b>{this.props.userData.user}</b>
								</h5>
								<button
									type="button"
									className="close"
									onClick={this.removeLoadingEffect}
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<h3>Why are you reporting this user?</h3>
								<form>
									<div className="form-group">
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name={this.props.userData.user + '-report-select'}
												id={this.props.userData.user + '-report-inappropriate'}
												value="Inappropriate Content"
												onChange={this.handleRadioChange}
											/>
											<label
												className="form-check-label"
												htmlFor={
													this.props.userData.user + '-report-inappropriate'
												}
											>
												Inappropriate Content
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name={this.props.userData.user + '-report-select'}
												id={this.props.userData.user + '-report-fake'}
												value="Fake or Joke Account"
												onChange={this.handleRadioChange}
											/>
											<label
												className="form-check-label"
												htmlFor={this.props.userData.user + '-report-fake'}
											>
												Fake or Joke Account
											</label>
										</div>
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												name={this.props.userData.user + '-report-select'}
												id={this.props.userData.user + '-report-other'}
												value="other"
												onChange={this.handleRadioChange}
											/>
											<label
												className="form-check-label"
												htmlFor={this.props.userData.user + '-report-other'}
											>
												Other
											</label>
										</div>
									</div>
									<div className="other-entry form-group">
										<textarea
											id={this.props.userData.user + '-other-entry'}
											className="form-control"
											name={this.props.userData.user + '-report-select'}
											placeholder="Enter Reason here..."
											rows="4"
											disabled
										/>
										<span
											id={this.props.userData.user + '-report-form-error'}
											className="report-form-error"
										/>
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={this.removeLoadingEffect}
									data-dismiss="modal"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={this.SubmitReport}
									data-dismiss="modal"
									className="submit btn btn-primary"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</span>
		)
	}
}

export default ReportButton
