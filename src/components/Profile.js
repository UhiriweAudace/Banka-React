import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { capitalize } from '../utils/capitilize';
class Profile extends Component {
  componentDidMount() {
    if (this.props.login.isAuthenticated) {
      this.props.history.push('/profile');
    } else {
      window.location.href = '/';
    }
  }
  render() {
    console.log('::::::::::::::::>>>', this.props.login);
    const { login } = this.props;
    return (
      <div>
        <div className='main prof' id='prof'>
          <div></div>
          <div className='profile secondary'>
            <div className='profile-card'>
              <div className='profile-left'>
                <div className='profile-image center'>
                  {/* <!-- <h5 className="heading-5">Your Profile Picture</h5> --> */}
                </div>
                <button className='btn btn-upload'>
                  Upload Your Profile Picture
                </button>
              </div>
              <div className='profile-content'>
                <h3 className='p-bottom'>Personal Details</h3>
                <ul className='no-bullet '>
                  <li className='secondary'>
                    {capitalize(login.user.firstname)} {''}{' '}
                    {capitalize(login.user.lastname)}
                  </li>
                  <li className='secondary'>{login.user.email}</li>
                  <li className='secondary'>(+250) 785166463</li>
                  <li className='secondary'>Kigali, Rwanda</li>
                  <li className='secondary'>#Current Balance 0 Rwf</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login
});
export default connect(mapStateToProps)(Profile);
