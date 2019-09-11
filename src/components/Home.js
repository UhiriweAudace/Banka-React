import React, { Component } from 'react'; 
import { Link} from 'react-router-dom';
import '../assets/css/style.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div class="main-content">
          <div class="side-1"></div>
          <div class="side-2">
            <div class="center top">
              <h1 class="heading-1 white">Banka</h1>
              <p class="p-1 white">Your Bank Account In Your Hands.</p>
              <p class="p-1 white">Please Visit Our Nearest Branch For Deposit and Withdrawal Operations!</p>
              <Link to='/auth/signin'>
                <button class="btn-1 primary" id="started">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div class="side-3"></div>
        </div>
      </div>
    )
  }
}

export default Home
