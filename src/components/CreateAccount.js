import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { createAccount } from '../redux/actions/createAccount.action';

import '../assets/css/style.css';
import '../assets/css/signup.css';
import '../assets/css/client.css';

class CreateAccount extends Component {
  state = {
    nationalId: '',
    countryResidence: '',
    DateOfBirth: '',
    countryBirth: '',
    currency: '',
    phone: '',
    address: '',
    accountType: 'current'
  };

  onchangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { accountType, currency, DateOfBirth, nationalId } = this.state;

    if (accountType === '') return toast.warn('Account Type is required!');
    if (currency === '') return toast.warn('Currency is required!');
    if (DateOfBirth === '') return toast.warn('Date Of Birth is required!');
    if (nationalId === '') return toast.warn('National Id is required!');
    const accountData = {
      type: accountType
    };
    this.props.createAccount(accountData);
  };
  componentDidMount() {
    if (!this.props.login.isAuthenticated) {
      window.location.href = '/auth/signin';
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.login.isAuthenticated) {
      this.props.history.push('/accounts/new');
    } else {
      window.location.href = '/auth/signin';
    }

  }

  render() {
    const { account } = this.props;
    if (account !== undefined && account.status === 201) {
      toast.success('   Account created Successfully!');
    }
    console.log('User account type in render::::', this.props);

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
                  name='nationalId'
                  id='id'
                  placeholder='Type your ID Number'
                  onChange={this.onchangeHandler}
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
                  name='countryResidence'
                  id='country-residence'
                  placeholder='Type your Country Residence'
                  onChange={this.onchangeHandler}
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
                  name='countryBirth'
                  id='countrybirth'
                  placeholder='Type your Country of Birth'
                  onChange={this.onchangeHandler}
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
                  onChange={this.onchangeHandler}
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
                  onChange={this.onchangeHandler}
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
                  onChange={this.onchangeHandler}
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
                  onChange={this.onchangeHandler}
                />
                <br />
                <span id='error-message' className='error-message'></span>
              </div>
              <div className='col-1'>
                <label htmlFor=''>
                  Account Type <span className='is-required'>*</span>
                </label>
                <br />
                <select
                  name='accountType'
                  id='account-type'
                  onChange={this.onchangeHandler}
                >
                  <option value='0' disabled>
                    Select Account type
                  </option>
                  <option value='current'>Current Account</option>
                  <option value='saving'>Saving Account</option>
                </select>
                <br />
                <span id='error-message' className='error-message'></span>
              </div>
            </div>
            <div className=''>
              <div className='col-1'>
                <button
                  className='btn-1 primary'
                  id='create'
                  type='submit'
                  onClick={this.onSubmitHandler}
                >
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
CreateAccount.propTypes = {
  login: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  login: state.login,
  account: state.accountData
});

export default connect(
  mapStateToProps,
  { createAccount }
)(CreateAccount);
