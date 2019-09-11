import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';

const Header = () => {
  return (
    <div>
      <header class='header'>
        <div class='row'>
          <div class='logo'>
            <Link to='/' class='white'>
              <h3 class='col-left white'>Banka</h3>
            </Link>

            <span class='col-right' id='open-menu'>
              <Link href='#' class='right'>
                <svg height='30' width='30'>
                  <path d='M0,5 30,5' stroke='#fff' stroke-width='5' />
                  <path d='M0,14 30,14' stroke='#fff' stroke-width='5' />
                  <path d='M0,23 30,23' stroke='#fff' stroke-width='5' />
                </svg>
              </Link>
            </span>
          </div>

          <div class=' navbar'>
            <nav class='navbar-link right'>
              <Link to='/auth/signin' class='white'>
                Login
              </Link>
              <Link to='/auth/signup' class='white active'>
                Signup
              </Link>
            </nav>
          </div>
          <div id='side-menu' class='side-nav'>
            <span class='btn-close' id='close-menu'>
              &times;
            </span>
            <nav class='navbar-link'>
              <Link to='/auth/signup' class='white'>
                Login
              </Link>
              <Link to='/auth/signup' class='white'>
                Signup
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
