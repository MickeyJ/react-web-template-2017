import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const Unauthorized = () =>{
  return (
    <div className="retainer-sm">
      <h3>
        You are not authorized to see this.
      </h3>
      <br />
      <Link to="/">
        Go Back
      </Link>
    </div>
  )
};

export default function(ResourceComponent){
  class AuthHOC extends Component {

    // Do some lifecycle stuff
    // and try user verification.

    render(){
      if(!this.props.authorized){
        return <Unauthorized />
      }
      return(
        <ResourceComponent {...this.props}/>
      )
    }
  }

  AuthHOC.propTypes = {
    authorized: PropTypes.bool.isRequired,
  };

  // Would be connected to redux state.
  AuthHOC.defaultProps = {
    authorized: false,
  };

  return withRouter(AuthHOC)
}
