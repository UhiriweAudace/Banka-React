import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountCard from './AccountCard';
import {toast} from 'react-toastify';
import {getAllAccounts} from '../redux/actions/account.action';

export class Accounts extends Component {

  componentDidMount() {
    if (!this.props.login.isAuthenticated) {
      window.location.href = '/auth/signin';
    }
    this.props.getAllAccounts();
  }
  render() {
    const { accounts} = this.props;
    return (
      <div className="main my-bank-accounts" id="my-bank-accounts">
        <div></div>
        <div className="transaction-list">
          {
            accounts !== undefined && accounts.accounts.accounts !== undefined ? accounts.accounts.accounts.map( account => {
              toast.success(`    ${accounts.accounts.message}`)
              return (
                <AccountCard account={account}/>
              );
            }) : (
              <div className="t-row">
                <label htmlFor="" className='white lbl-debit'></label>
                <div className="t-details white">
                  <label htmlFor="" className="small"> </label>
                  <label htmlFor="" className="small">  Whoops! Currently, You don't have any Bank Accounts.</label>
                </div>
                <div className="t-buttons"></div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login,
  accounts: state.account,
})
export default connect(mapStateToProps, { getAllAccounts })(Accounts);
