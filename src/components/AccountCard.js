import React from 'react'

const AccountCard = ({account}) => {
  return (
    <div className="t-row" key={account.accountNumber}>
      <label htmlFor="" className={`white ${account.type === 'saving' ? 'lbl-debit' : 'lbl-credit'}`}>{account.type === 'saving' ? 'Saving' :'Current'} Account</label>
      <div className="t-details white">
        <label htmlFor="" className="small"> N<u>o</u> : 00040-06565-10236-{account.accountNumber}</label>
        <label htmlFor="" className="small">currently on this accounts, You have {account.balance} Rwf.</label>
      </div>
      <div className="t-buttons">
        <button className="btn-flat primary white" id="details" data-set={account.accountNumber}>Details</button>
      </div>
    </div>
  );
}

export default AccountCard
