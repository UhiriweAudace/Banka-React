import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { signup } from '../redux/actions/signup.action';

class Signup extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  componentDidMount(){
    if (this.props.login !== undefined) {
      if (this.props.login.isAuthenticated) {
        this.props.history.push('/profile')
      } 
    }
  }
  componentWillReceiveProps(nextProps){
    if (this.props.login !== undefined) {
      if (nextProps.login.isAuthenticated) {
        this.props.history.push('/profile')
      }
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const { firstname, lastname, email, password } = this.state;
    const data = {
      firstname,
      lastname,
      email,
      password
    };
    this.props.signup(data);
  };
  render() {
    const { signupUser } = this.props;
    if (signupUser.errors !== undefined && signupUser.errors.status === 400) {
      toast.warn(`${signupUser.errors.data.error}`);
    }
    if (signupUser.signup.status !== undefined && signupUser.signup.status === 201) {
      toast.success(`${signupUser.signup.message}`);
    }
    return (
      <div>
        <div className='main-content'>
          <div className='side-1'></div>
          <div className='side-2'>
            <div className='form'>
              <h3 className='d-purple'>Signup</h3>
              <hr />
              <div className='rows'>
                <div className='col-1'>
                  <label htmlFor=''>
                    Firstname <span className='is-required'>*</span>
                  </label>
                  <br />
                  <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Type your firstname'
                    onChange={this.onChangeHandler}
                  />
                  <br />
                  <span id='error-message' className='error'>
                    Firstname field is required
                  </span>
                </div>
                <div className='col-1'>
                  <label htmlFor=''>
                    Lastname <span className='is-required'>*</span>
                  </label>
                  <br />
                  <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Type your lastname'
                    onChange={this.onChangeHandler}
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
                    Email <span className='is-required'>*</span>
                  </label>
                  <br />
                  <input
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Type your e-mail'
                    onChange={this.onChangeHandler}
                  />
                  <br />
                  <span id='error-message' className='error'>
                    Email field is required
                  </span>
                </div>
                <div className='col-1'>
                  <label htmlFor=''>
                    Password <span className='is-required'>*</span>
                  </label>
                  <br />
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Type your Password'
                    onChange={this.onChangeHandler}
                  />
                  <br />
                  <span id='error-message' className='error'>
                    Password field is required
                  </span>
                </div>
              </div>
              <div className='rows'>
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
                  <span id='error-message' className='error'></span>
                </div>
              </div>
              <div className=''>
                <div className='col-1'>
                  <button
                    className='btn-1 primary'
                    id='register'
                    type='submit'
                    onClick={this.onSubmitHandler}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='side-3'></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  signupUser: state.signup
});
export default connect(
  mapStateToProps,
  { signup }
)(Signup);
