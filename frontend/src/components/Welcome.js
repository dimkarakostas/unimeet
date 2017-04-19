import React, { Component } from 'react';
import Topbar from './Topbar';
import Intro from './Intro';
import '../css/index.css';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
          <Topbar />
          <Intro />
      </div>
    );
  }
}

export default Welcome;
