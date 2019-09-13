import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin } from '../redux/actions/signin.action';
import '../assets/css/style.css';
import '../assets/css/signup.css';
import { toast } from 'react-toastify';

export class Signin extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      /* istanbul ignore next */
      this.props.history.push('/profile');
    }
    this.redirectOnLoginSuccess();
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    /* istanbul ignore next */
    if (nextProps.login.isAuthenticated) {
      /* istanbul ignore next */
      this.props.history.push('/profile');
    }
  }
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const { email, password } = this.state;
    /* istanbul ignore next */
    if (email === '') return toast.warn('Email is required!');
    /* istanbul ignore next */
    if (password === '') return toast.warn('password is required!');
    const data = {
      email,
      password
    };
    this.props.signin(data);
  };

  redirectOnLoginSuccess = () => {
    const { login } = this.props;
    /* istanbul ignore next */
    return login.isAuthenticated
      ? this.props.history.push('/profile' || '/')
      : null;
  };
  render() {
    const { login } = this.props;
    if (
      (login.errors.data !== undefined &&
        /* istanbul ignore next */
        login.errors.data.message !== undefined &&
        /* istanbul ignore next */
        login.errors.data.status !== undefined &&
        /* istanbul ignore next */
        login.errors.data.status === 400) ||
      404
    ) {
      if (login.errors.data !== undefined) {
        /* istanbul ignore next */
        toast.warn(
          `${
            login.errors.data.status === 400
              ? login.errors.data.message
              : login.errors.data.error
          }`
        );
      }
    }
    return (
      <main>
        <div className='main-content'>
          <div className='side-1'></div>
          <div className='side-2'>
            <div className='form'>
              <h3 className='d-purple'>Login</h3>
              <hr />
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
                    id='Password'
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
                  <button
                    className='btn-1 primary bottom'
                    id='login'
                    type='submit'
                    onClick={this.onSubmitHandler}
                  >
                    Login
                  </button>{' '}
                  &nbsp;
                  <button className='btn-1 primary' id='reset'>
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='side-3'></div>
        </div>
      </main>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  login: state.login
});

export default connect(
  mapStateToProps,
  { signin }
)(Signin);
