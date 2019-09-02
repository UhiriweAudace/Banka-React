import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ClientHeader extends Component {
  render() {
    return (
      <div className="h-1">
        <nav className="navbar-link-client ">
          <Link to="/createAccount" className="white" id="create-link">Create Account</Link>
          <Link to="/accountProfile" className="white" id="my-account-link">Account Profile</Link>
          <Link to="/" className="white active" id="signout">SignOut</Link>
        </nav>
      </div>
    )
  }
}

export default ClientHeader
