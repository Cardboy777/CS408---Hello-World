import React, { Component } from 'react';
import './css/MatchesPanel.css';
import MiniProfile from './MiniProfile';
import ReportButton from './ReportButton';
import ReactDOM from 'react-dom';
import SpinningLoader from './SpinningLoader';
class MatchesPanel extends Component {
  constructor(){
    super();
    this.Unlike = this.Unlike.bind(this);
    this.Report = this.Report.bind(this);
  }
  Unlike(e){
    this.props.unlikeFunct(this.props.userData.user);
    this.addLoadingEffect(e.target)
  }
  Report(message){
    this.props.reportFunct(this.props.userData.uid, this.props.userData.user, message);
  }
  addLoadingEffect(elementNode){
    ReactDOM.render(<SpinningLoader/>, elementNode);
  }
  render() {
    return (
      <div className="MatchesPanel">
        <MiniProfile userData={this.props.userData} match_percent ={this.props.match_percent}/>
        <button type="button" onClick={this.Unlike} className="btn btn-outline-danger">Remove Match</button>
        <ReportButton reportHandler={this.Report} userData={this.props.userData}/>
      </div>
    );
  }
}

export default MatchesPanel;
