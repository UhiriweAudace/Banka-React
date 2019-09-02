import React, { Component } from 'react'
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import { signin } from '../../redux/actions/signin.action';
class Login extends Component {
  state={
    email:"",
    password:"",
  }
  onChangeHandler(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmitHandler(e){
    e.preventDefault();
    const loginInfo = {
      email: this.state.email,
      password:this.state.password
    };
    this.props.signin(loginInfo);
  }
  render() {
    console.log('login information :::::::::::>>>>', this.props.login);
    const {login: {errors, login}} = this.props;
    console.log(login.length === undefined);

    // if (login.status === 200) {
    //   toast.success(`::::: ${login.message} :::::`)
    // }
    // eslint-disable-next-line no-mixed-operators
    if (errors.status === 400 && login.length === undefined) {
      toast.warn(`::::: ${errors.error||errors.message} :::::`)
    }

    return (
      <div>
      <div className="main-content">
        <div className="side-1"></div>
        <div className="side-2">
          <div className="form">
            <h3 className="d-purple">Login</h3>
            <hr />
            <div className="rows">
              <div className="col-1">
                <label>Email <span className="is-required">*</span></label><br/>
                <input type="text" name="email" id="email" placeholder="Type your e-mail" onChange={this.onChangeHandler.bind(this)}/><br/>
                <span id="error-message" className="error">Email field is required</span>
              </div>
              <div className="col-1">
                <label>Password <span className="is-required">*</span></label><br/>
                <input type="password" name="password" id="Password" placeholder="Type your Password" onChange={this.onChangeHandler.bind(this)} /><br/>
                <span id="error-message" className="error">Password field is required</span>
              </div>
            </div>
  
            <div className="rows">
              <div className="col-1">
                <button className="btn-1 primary bottom" id="login" type='submit' onClick={this.onSubmitHandler.bind(this)}>Login</button>
                <button className="btn-1 primary" id="reset">Reset Password</button>
              </div>
            </div>
          </div>
        </div>
        <div className="side-3"></div>
      </div>
    </div>
    )
  }
}
const mapStateToProps =(state)=>({
  login: state.login
});
export default connect(mapStateToProps, {signin })(Login)
