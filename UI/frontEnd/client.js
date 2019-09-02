
/**
 * @ Display User Details on Profile
 */
const userDetails = JSON.parse(localStorage.getItem('UserData'));
//console.log(userDetails)
const userBankAccountsLink = document.querySelector('#mybankaccounts');
const userTransactionsLink = document.querySelector('#mytransaction');

const userTransactionsDiv = document.querySelector('#transactionList');
let userBankAccountsDIV = document.querySelector('#user-banks-accounts');

let ul = document.querySelector('.no-bullet');
let list = `
             <li class="secondary">${userDetails.firstname} </li>
              <li class="secondary">${userDetails.lastname}</li>
              <li class="secondary">${userDetails.email}</li>
              <li class="secondary">Kigali, Rwanda</li>
              <li class="secondary">#Current Balance 0 Rwf</li>
  `;
ul.innerHTML = list;


/**
   * @Create A New User Bank Account with his/her Info
   */

document.getElementById('create').addEventListener('click', () => {

  const accountType = document.getElementById("account-type").value;
  //console.log(accountType)

  //@Get a token from localStorage
  const token = JSON.parse(localStorage.getItem('UserData'));

  const data = { type: accountType };

  fetch('https://api-banka-app.herokuapp.com/api/v1/accounts', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token.token}`
    },
    body: JSON.stringify(data)
  })
    .then(response => { return response.json(); })
    .then(async result => {

      //console.log(result)
      const { status, message, error, data } = result;
      //await localStorage.setItem('accountsData', JSON.stringify(data)) // saving accounts Data in local to be access late
      if (status === 201) {

      }
    })
    .catch(err => console.log(err));

  const createAccountDv = document.getElementsByClassName('create-account')[0];
  const profileDv = document.getElementsByClassName('prof')[0];
  createAccountDv.style.display = 'none';
  profileDv.style.display = "grid";
});

//@ When you click on My bank accounts
userBankAccountsLink.addEventListener('click', async () => {
  //@Get data from localStorage
  const data = JSON.parse(localStorage.getItem('UserData'));
  //console.log(data);
  const response = await fetch(`https://api-banka-app.herokuapp.com/api/v1/accounts/user/${data.id}`, {
    method: 'GET',
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${data.token}`
    }
  });

  const result = await response.json();
  console.log(result);

  if (result.status === 200) {
    let output = "";
    let accountsData = [];
    result.data.forEach(account => {
      accountsData.push(account)
      
      let accountType;
      let markType;
      account.type === 'saving' ? accountType = 'Saving Account' : accountType = 'Current Account';
      account.type === 'saving' ? markType = 'lbl-credit' : markType = 'lbl-debit';

      output += `
           <div class="t-row">
          <label for="" class="white ${markType}">${accountType}</label>
          <div class="t-details white">
            <label for="" class="small"> N<u>o</u> : ${account.account_number}</label>
            <label for="" class="small">currently on this accounts, You have ${account.balance} Rwf.</label>
          </div>
          <div class="t-buttons">
            <button class="btn-flat primary white" data-accountNumber="${account.account_number}">Details</button>
          </div>
        </div>
                    `;

      userBankAccountsDIV.innerHTML = output;
    });
    await localStorage.setItem('accountsData', JSON.stringify(accountsData)) // saving accounts Data in local to be access later
  }
  if (result.status === 404) {

    let output = `
            <div class="t-row">
              <label for="" class="white lbl-debit"></label>
              <div class="t-details white">
                <label for="" class="small">${result.error}</label>
                <label for="" class="small">Please create at least One Bank Account!.</label>
              </div>
              <div class="t-buttons">
                <button class="btn-flat primary white" id="details">Details</button>
              </div>
            </div>
                    `;

    userBankAccountsDIV.innerHTML = output;
  }
})

// @when user click on My Transactions on SideBar
userTransactionsLink.addEventListener('click', async () => {
  //@Get a token from localStorage
  const dataUser = JSON.parse(localStorage.getItem('accountsData'));
  const token = JSON.parse(localStorage.getItem('UserData'));
  console.log(dataUser);
  
  dataUser.forEach(async data=>{
    const response = await fetch(`https://api-banka-app.herokuapp.com/api/v1/accounts/${data.account_number}/transactions`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token.token}`
      }
    });

    const result = await response.json();
    //console.log(result);

    if (result.status === 200) {

      let output;
      result.data.forEach(transaction => {
        let transactionType;
        transaction.type === 'debit' ? transactionType = 'Debit' : transactionType = 'Credit';

        output += `
            <div class="t-row">
              <label for="" class="white lbl-debit">${transactionType}</label>
              <div class="t-details white">
                <label for="" class="small"> N<u>o</u> : ${transaction.accountNumber}</label>
                <label for="" class="small">You have successfully deposited ${transaction.amount} Rwandan francs.</label>
              </div>
              <div class="t-buttons">
                <button class="btn-flat primary white" id="details">Details</button>
              </div>
            </div>
                    `;

        userTransactionsDiv.innerHTML = output;
      });
    }

    if (result.status === 404) {

      let output = `
            <div class="t-row">
              <label for="" class="white lbl-debit"></label>
              <div class="t-details white">
                <label for="" class="small">${result.error}</label>
                <label for="" class="small">Please Make some Transactions on your accounts!.</label>
              </div>
              <div class="t-buttons">
                <button class="btn-flat primary white" id="details">Details</button>
              </div>
            </div>
                    `;

      userTransactionsDiv.innerHTML = output;
    }
  });

 
})