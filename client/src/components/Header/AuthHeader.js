import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class AuthHeader extends Component {
  
  state={

  }
  render() {
    return (
      <header className="header">
          <div className="row">
            <div className="logo">
              <h3 className="col-left white">Banka</h3>
              <span className="col-right" id="open-menu">
                <Link to="#" className="right">
                  <svg height='30' width='30'>
                    <path d='M0,5 30,5' stroke='#fff' strokeWidth='5' />
                    <path d='M0,14 30,14' stroke='#fff' strokeWidth='5' />
                    <path d='M0,23 30,23' stroke='#fff' strokeWidth='5' />
                  </svg>
                </Link>
              </span>
            </div>

            <div className=" navbar">
              <nav className="navbar-link right">
                <Link to="/auth/signin" className="white">Login</Link>
                <Link to="/auth/signup" className="white active">Signup</Link>
              </nav>
            </div>
            <div id="side-menu" className="side-nav">
              <span className="btn-close" id="close-menu">&times;</span>
              <nav className="navbar-link">
                <Link to="/auth/signin" className="white">Login</Link>
                <Link to="/auth/signup" className="white">Signup</Link>
              </nav>
            </div>

          </div>
        </header>
    )
  }
}

export default AuthHeader
