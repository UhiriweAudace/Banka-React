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

  componentDidMount(){
    if (this.props.login.isAuthenticated) {
      this.props.history.push('/profile')
    } 
    this.redirectOnLoginSuccess();
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.login.isAuthenticated) {
      this.props.history.push('/profile')
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
    if (email ==='') return toast.warn('Email is required!');
    if (password ==='') return toast.warn('password is required!');
    const data = {
      email,
      password
    };
    this.props.signin(data);
  };

  redirectOnLoginSuccess = () =>{
    const { login } = this.props;
    return login.isAuthenticated ? this.props.history.push('/profile' || '/') : null;
  }
  render() {
    const { login } = this.props;
    if (login.errors !== undefined && login.errors.status === 400) {
      toast.warn(`${login.errors.message}`);
    }
    if (login.errors !== undefined && login.errors.status === 404) {
      toast.warn(`${login.errors.message}`);
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
const mapStateToProps = state => ({
  login: state.login
});
export default connect(
  mapStateToProps,
  { signin }
)(Signin);
