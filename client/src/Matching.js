import React, { Component } from 'react';
import './Matching.css';
import MatchingPanel from './MatchingPanel';
import Header from './Header';

class Matching extends Component {
  constructor(){
    super();
    this.state = {
      message : null,
      user_list: []
    }
    this.getMorePotentialMatches = this.getMorePotentialMatches.bind(this);
  }

  //componentent did mount is called when the component is being rendered
  componentDidMount() {
    this.fetchMorePotentialMatches();
  }

  fetchMorePotentialMatches(){
    fetch("/api/getMorePotentialMatches")
      .then(res => res.json())
      .then(arrayList => this.setState({ user_list: this.state.user_list.concat(arrayList) }));
  }

  getMorePotentialMatches(){
    this.fetchMorePotentialMatches();
    this.forceUpdate();
  }

  render() {
    return (
      <div id="matchingPage">
        <Header/>
        <div className="panels-container">
          <div className="row">
            { this.state.user_list.map((i) =>
                <div className="panel col-md-6">
                  <MatchingPanel name={i.name} desc={i.description} fav_lang={i.fav_lang} match_percent={i.match_percent}/>
                </div>
              )
            }
          </div>
          <button className='btn btn-primary' onClick={this.getMorePotentialMatches}>Test Fetch More</button>
        </div>
      </div>
    );
  }
}

export default Matching;
