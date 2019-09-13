import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../assets/css/style.css';
import { logOutUser} from '../../redux/actions/signin.action';

class Header extends React.Component {

  onLogoutUser = () =>{
    this.props.logOutUser();
  }
  render() {
    const { login } = this.props;
    if (login.isAuthenticated) {
      return (
        <div className='content-section'>
          <div className='h-1'>
            <nav className='navbar-link-client'>
            <Link to='/profile' className='white' id='create-link'>
                Profile
              </Link>
              <Link to='/accounts/new' className='white' id='create-link'>
                Create Account
              </Link>
              <Link to='/accounts' className='white' id='accounts-list'>
                Bank Account List
              </Link>
              {/* <Link href='#' className='white' id='saving-account'></Link> */}
              <Link to='/' className='white active' onClick={this.onLogoutUser} id='signout'>
                SignOut
              </Link>
            </nav>
          </div>
        </div>
      );
    }
    return (
      <div>
        <header className='header'>
          <div className='row'>
            <div className='logo'>
              <Link to='/' className='white'>
                <h3 className='col-left white'>Banka</h3>
              </Link>

              <span className='col-right' id='open-menu'>
                <Link to='#' className='right'>
                  <svg height='30' width='30'>
                    <path d='M0,5 30,5' stroke='#fff' strokeWidth='5' />
                    <path d='M0,14 30,14' stroke='#fff' strokeWidth='5' />
                    <path d='M0,23 30,23' stroke='#fff' strokeWidth='5' />
                  </svg>
                </Link>
              </span>
            </div>

            <div className=' navbar'>
              <nav className='navbar-link right'>
                <Link to='/auth/signin' className='white'>
                  Login
                </Link>
                <Link to='/auth/signup' className='white active'>
                  Signup
                </Link>
              </nav>
            </div>
            <div id='side-menu' className='side-nav'>
              <span className='btn-close' id='close-menu'>
                &times;
              </span>
              <nav className='navbar-link'>
                <Link to='/auth/signup' className='white'>
                  Login
                </Link>
                <Link to='/auth/signup' className='white'>
                  Signup
                </Link>
              </nav>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login
});
export default connect(
  mapStateToProps,
  {logOutUser}
)(Header);
