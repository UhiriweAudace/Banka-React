import React, { Component } from 'react'; 
import { Link} from 'react-router-dom';
import { connect } from 'react-redux'

import '../assets/css/style.css';

class Home extends Component {
  componentDidMount(){
    if (this.props.login.isAuthenticated) {
      this.props.history.push('/profile')
    } else {
      this.props.history.push('/')
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.login.isAuthenticated) {
      this.props.history.push('/profile')
    }
  }
  render() {
    return (
      <div>
        <div className="main-content">
          <div className="side-1"></div>
          <div className="side-2">
            <div className="center top">
              <h1 className="heading-1 white">Banka</h1>
              <p className="p-1 white">Your Bank Account In Your Hands.</p>
              <p className="p-1 white">Please Visit Our Nearest Branch For Deposit and Withdrawal Operations!</p>
              <Link to='/auth/signin'>
                <button className="btn-1 primary" id="started">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="side-3"></div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  login: state.login
}); 
export default connect(mapStateToProps)(Home)
