import React, { Component } from 'react'; 
import { Link} from 'react-router-dom';
import '../assets/css/style.css';

class Home extends Component {
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

export default Home
