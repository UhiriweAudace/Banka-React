import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return (
      <div className="main prof" id="prof">
      <div></div>
      <div className="profile secondary">
        <div className="profile-card">
          <div className="profile-left">
            <div className="profile-image center">
              {/* <h5 className="heading-5">Your Profile Picture</h5> */}
            </div>
            <button className="btn btn-upload">Upload Your Profile Picture</button>
          </div>
          <div className="profile-content">
            <h3 className="p-bottom">Personal Details</h3>
            <ul className="no-bullet">

            </ul>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default  Profile;