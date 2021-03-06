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
      this.props.history.push('/profile');
    }
    this.redirectOnLoginSuccess();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.isAuthenticated) {
      this.props.history.push('/profile');
    }
    if (
      nextProps.login.errors !== undefined &&
      nextProps.login.errors.data !== undefined &&
      !nextProps.login.isAuthenticated

    ) {
      return toast.warn(
        `${nextProps.login.errors.data.error ||
          nextProps.login.errors.data.message}`
      );
    }
    console.log('This is Andela debug::::', nextProps.login.user.length);
  }
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const data = {
      email,
      password
    };
    this.props.signin(data);
  };

  redirectOnLoginSuccess = () => {
    const { login } = this.props;
    return login.isAuthenticated
      ? this.props.history.push('/profile' || '/')
      : null;
  };
  render() {
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
