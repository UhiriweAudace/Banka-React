import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../assets/css/style.css';
import '../assets/css/signup.css';
import '../assets/css/client.css';

class CreateAccount extends Component {

  render() {
    return (
      <div className='main create-account' id='create-account'>
        <div></div>
        <div>
          <div className='form'>
            <h3 className='d-purple'>Create New Bank Account</h3>
            <hr />
            <div className='rows'>
              <div className='col-1'>
                <label htmlFor=''>
                  National Identity Card Number{' '}
                  <span className='is-required'>*</span>
                </label>
                <br />
                <input
                  type='number'
                  name='id'
                  id='id'
                  placeholder='Type your ID Number'
                />
                <br />
                <span id='error-message' className='error'>
                  id field is required
                </span>
              </div>
              <div className='col-1'>
                <label htmlFor=''>
                  Country Residence <span className='is-required'>*</span>
                </label>
                <br />
                <input
                  type='text'
                  name='country-residence'
                  id='country-residence'
                  placeholder='Type your Country Residence'
                />
                <br />
                <span id='error-message' className='error'>
                  Lastname field is required
                </span>
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                <label htmlFor=''>
                  Country Of Birth <span className='is-required'></span>
                </label>
                <br />
                <input
                  type='text'
                  name='countrybirth'
                  id='countrybirth'
                  placeholder='Type your Country of Birth'
                />
                <br />
                <span id='error-message' className='error'></span>
              </div>
              <div className='col-1'>
                <label htmlFor=''>
                  Date of Birth <span className='is-required'>*</span>
                </label>
                <br />
                <input
                  type='date'
                  name='DateOfBirth'
                  id='DateOfBirth'
                  placeholder='Type your Date Of Birth'
                />
                <br />
                <span id='error-message' className='error'>
                  DateOfBirth field is required
                </span>
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                <label htmlFor=''>
                  Currency Type <i>(eg: For Rwandan Francs => Rwf)</i>{' '}
                  <span className='is-required'>*</span>
                </label>
                <br />
                <input
                  type='text'
                  name='currency'
                  id='currency'
                  placeholder='Type your currency type'
                />
                <br />
                <span id='error-message' className='error'>
                  Currency field is required
                </span>
              </div>
              <div className='col-1'>
                <label htmlFor=''>
                  Phone Number <span className='is-required'></span>
                </label>
                <br />
                <input
                  type='number'
                  name='phone'
                  id='phone'
                  placeholder='Type your Phone Number'
                />
                <br />
                <span id='error-message' className='error'></span>
              </div>
            </div>
            <div className='rows'>
              <div className='col-1'>
                <label htmlFor=''>
                  Address <span className='is-required'></span>
                </label>
                <br />
                <input
                  type='text'
                  name='address'
                  id='address'
                  placeholder='Type your current address city'
                />
                <br />
                <span id='error-message' className='error-message'></span>
              </div>
              <div className='col-1'>
                <label htmlFor=''>
                  Account Type <span className='is-required'>*</span>
                </label>
                <br />
                <select name='account-type' id='account-type'>
                  <option value='1' disabled>
                    Select Account type
                  </option>
                  <option value='2'>Saving Account</option>
                  <option value='3'>Current Account</option>
                </select>
                <br />
                <span id='error-message' className='error-message'></span>
              </div>
            </div>
            <div className=''>
              <div className='col-1'>
                <button className='btn-1 primary' id='create'>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login:state.login
});

export default connect(
  mapStateToProps
)(CreateAccount);
