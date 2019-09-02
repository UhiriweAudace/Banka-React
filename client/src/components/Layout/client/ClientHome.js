import React, { Component } from 'react';
import {BrowserRouter as Router , Route, Link} from 'react-router-dom';
import ClientProfile from './ClientProfile';
import ClientHeader from './ClientHeader';
import CreateAccount from './CreateAccount';
import '../../../css/style.css';
class ClientHome extends Component {
  render() {
    return (
    <Router>
      <div>
        <div className="long-height">
          <ClientHeader/>
          <Route exact path="/client/home" component={ClientProfile} />
          <Route path="/createAccount" component={CreateAccount}/>
          <aside className="sidenav">
          <h3 className="white text-center heading-1">Banka</h3>
          <ul className="u-list white">
            <li>
              <Link to="#" id="myprofile">My Profile</Link>
            </li>
            <li>
              <Link to="#" id="mybankaccounts">My Bank Accounts</Link>
            </li>
            <li>
              <Link to="#" id="mytransaction">My Transaction</Link>
            </li>
          </ul>
          <label htmlFor="" className="ft-content white">&copy; 2019
          </label>
        </aside>
        </div>
      </div>
    </Router>
    )
  }
}

export default ClientHome
