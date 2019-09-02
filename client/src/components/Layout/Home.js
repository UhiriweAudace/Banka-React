import React, { Component } from 'react'

class Home extends Component {


  onClickHandler(e){
    console.log('clicked')
    e.preventDefault();
    window.location = '/signup';
  }
  render() {
    return ( 
      <div className="container">
      <main>
        <div className="main-content">
          <div className="side-1"></div>
          <div className="side-2">
            <div className="center top">
              <h1 className="heading-1 white">Banka</h1>
              <p className="p-1 white">Your Bank Account In Your Hands.</p>
              <p className="p-1 white">Please Visit Our Nearest Branch For Deposit and Withdrawal Operations!</p>
              <button className="btn-1 primary" id="started" onClick={this.onClickHandler}>Get Started</button>
            </div>
          </div>
          <div className="side-3"></div>
        </div>
      </main>
    </div> 
    )
  }
}

export default Home
