import React, { Component } from 'react';
import '../assets/css/style.css';
import '../assets/css/signup.css';

class Signin extends Component {
  render() {
    return (
      <main>
        <div className="main-content">
          <div className="side-1"></div>
          <div className="side-2">
            <div className="form">
              <h3 className="d-purple">Login</h3>
              <hr />
              <div className="rows">
                <div className="col-1">
                  <label for="">Email <span className="is-required">*</span></label><br />
                  <input type="text" name="email" id="email" placeholder="Type your e-mail" /><br/>
                  <span id="error-message" className="error">Email field is required</span>
                </div>
                <div className="col-1">
                  <label for="">Password <span className="is-required">*</span></label><br />
                  <input type="password" name="Password" id="Password" placeholder="Type your Password" /><br />
                  <span id="error-message" className="error">Password field is required</span>
                </div>
              </div>
              <div className="rows">
                <div className="col-1">
                  <button className="btn-1 primary bottom" id="login">Login</button> &nbsp;
                  <button className="btn-1 primary" id="reset">Reset Password</button>
                </div>
              </div>
            </div>
          </div>
          <div className="side-3"></div>
        </div>
      </main>
    );
  }
}

export default Signin;
