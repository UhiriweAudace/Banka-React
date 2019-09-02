import React, { Component } from 'react'

class Signup extends Component {

  render() {
    return (
      <div className="container">
        <main>
          <div className="main-content">
            <div className="side-1"></div>
            <div className="side-2">
              <div className="form">
                <h3 className="d-purple">Signup</h3>          
                <hr />
                <div className="rows">
                  <div className="col-1">
                    <label>Firstname <span className="is-required">*</span></label><br/>
                    <input type="text" name="firstname" id="firstname" placeholder="Type your firstname" /><br/>
                    <span id="error-message" className="error">Firstname field is required</span>
                  </div>
                  <div className="col-1">
                    <label>Lastname <span className="is-required">*</span></label><br/>
                    <input type="text" name="lastname" id="lastname" placeholder="Type your lastname" /><br/>
                    <span id="error-message" className="error">Lastname field is required</span>
                  </div>
                </div>
                
                <div className="rows">
                  <div className="col-1">
                    <label>Email <span className="is-required">*</span></label><br/>
                    <input type="text" name="email" id="email" placeholder="Type your e-mail" /><br/>
                    <span id="error-message" className="error">Email field is required</span>
                  </div>
                  <div className="col-1">
                    <label>Password <span className="is-required">*</span></label><br/>
                    <input type="password" name="password" id="password" placeholder="Type your Password" /><br/>
                    <span id="error-message" className="error">Password field is required</span>
                  </div>
                </div>
                <div className="rows">
                  <div className="col-1">
                    <label>Phone Number <span className="is-required"></span></label><br/>
                    <input type="number" name="phone" id="phone" placeholder="Type your Phone Number" /><br/>
                    <span id="error-message" className="error"></span>
                  </div>
                  <div className="col-1">
                    <label>Address <span className="is-required"></span></label><br/>
                    <input type="text" name="address" id="address" placeholder="Type your current address city" /><br/>
                    <span id="error-message" className="error"></span>
                  </div>
                </div>
                <div className="">
                  <div className="col-1">
                    <button className="btn-1 primary" id="register">Register</button>
                  </div>

                </div>
              </div>
            </div>
            <div className="side-3"></div>
          </div>
        </main>
      </div>       
    )
  }
}

export default Signup
