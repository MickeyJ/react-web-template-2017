import React, { Component } from 'react'
import Routes from './routes';
import connect from '../../utils/route_connect'

import {
  setWindowSize,
} from '../../redux/actions'

class Main extends Component{

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.props.setWindowSize();
  };

  render(){
    return (
      <main id="main-container">
        { Routes }
      </main>
    )
  }
}

export default connect(
  null,
  {
    setWindowSize,
  }
)(Main)