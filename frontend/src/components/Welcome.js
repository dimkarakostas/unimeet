import React, { Component } from 'react';
import Topbar from './Topbar';
import '../css/index.css';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
          <Topbar />
      </div>
    );
  }
}

export default Welcome;
