import React, { Component } from 'react';
import './css/ReportButton.css';
class ReportButton extends Component {
  constructor(){
    super();
    this.SubmitReport = this.SubmitReport.bind(this);
  }

  SubmitReport(e){
    e.preventDefault();
    this.props.reportHandler();
  }

  render() {
    return (
    <span className='reportButtonComponent'>
        <button type="button" className="report btn btn-outline-secondary" data-toggle="modal" data-target={'#' + this.props.userData.user + '-report'}>
            Report
        </button>
        <div className="modal fade" id={this.props.userData.user + '-report'} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Report User: {this.props.userData.user}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3>Why are you reporting this user?</h3>
                    <div>
                        <input type="radio" id={this.props.userData.user + '-report-inappropriate'} name={this.props.userData.user + '-report-select'} value="inappropriate"/>
                        <label htmlFor="inappropriate"> Inappropriate Content</label>
                    </div>
                    <div>
                        <input type="radio" id={this.props.userData.user + '-report-fake'} name={this.props.userData.user + '-report-select'} value="fake"/>
                        <label htmlFor="fake"> Fake or Joke Account</label>
                    </div>
                    <div>
                        <input type="radio" id={this.props.userData.user + '-report-other'} name={this.props.userData.user + '-report-select'} value="other"/>
                        <label htmlFor="other"> Other</label>
                    </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.SubmitReport} className="btn btn-primary">Submit Report</button>
              </div>
            </div>
          </div>
        </div>
    </span>
    );
  }
}

export default ReportButton;
