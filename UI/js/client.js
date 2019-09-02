const profileDiv = document.getElementsByClassName('prof')[0];
const createAccountDiv = document.getElementsByClassName('create-account')[0];
const signOutBtn = document.getElementById('signout');
const createAccountBtn = document.getElementById('create-link');
const myProfile = document.getElementById('myprofile');
const myAccountLink = document.getElementById('my-account-link');
const myAccountDetailSection = document.getElementById('my-account');
const header = document.querySelector('header');
const myTransaction = document.getElementById('mytransaction');
const myTransactionDiv = document.getElementById('my-transaction');
const sidenav = document.querySelector('.sidenav');
const transactionDetails = document.getElementById('details');
const singleTransaction = document.getElementById('single-transaction');
const closeBtn = document.querySelector("#close");
const closeButton = document.querySelector("#close-single-account");
const transactionList = document.querySelector('.transaction-list');
const mybankaccounts = document.getElementById('mybankaccounts');
const mybankaccountsDiv = document.getElementById('my-bank-accounts');
const singleBankAccountModal = document.getElementById('single-bank-account')
const bankAccountsList = document.querySelector('#transaction-list');

//@User view his/her Bank Accounts
mybankaccounts.addEventListener('click', () => {
  createAccountDiv.style.display = 'none';
  myTransactionDiv.style.display = "none";
  myAccountDetailSection.removeAttribute('style');
  profileDiv.style.display = "none";
  mybankaccountsDiv.style.display = 'grid';
  header.className = "long-height";
});

/** Listening the event by clicking on the View Button */
mybankaccountsDiv.addEventListener('click', (event) => {

  if (event.target.classList[0] == 'btn-flat') {
    closeButton.style.textAlign = "right";
    closeButton.style.fontSize = "35px";
    closeButton.style.color = "#fff";
    closeButton.style.fontWeight = "900";
    profileDiv.style.display = "none";
    createAccountDiv.style.display = "none";
    mybankaccountsDiv.style.display = "none";
    singleBankAccountModal.style.display = "grid";
    sidenav.style.height = "100vh";
  }

});

/** Close the PoP up modal */
closeButton.addEventListener("click", () => {
  console.log('clicked!')
  singleBankAccountModal.style.display = "none";
  mybankaccountsDiv.style.display = "grid";
  sidenav.style.height = "100vh";
});

document.addEventListener('DOMContentLoaded', () => {
  sidenav.style.height = "100vh";
});

createAccountBtn.addEventListener('click', () => {
  mybankaccountsDiv.style.display = "none";
  createAccountDiv.removeAttribute('style');
  profileDiv.style.display = "none";
  singleBankAccountModal.style.display = "none";
  myTransactionDiv.style.display = "none";
  createAccountDiv.removeAttribute('id');
  createAccountBtn.className = 'active';
  createAccountBtn.removeAttribute('style');
  myAccountLink.style.borderTop = "none";
  signOutBtn.style.borderTop = "none";
  signOutBtn.style.color = "#fff";
  myAccountDetailSection.removeAttribute('style');
  header.className = "long-height";
});

myProfile.addEventListener('click', () => {
  createAccountDiv.style.display = 'none';
  myTransactionDiv.style.display = "none";
  singleBankAccountModal.style.display = "none";
  mybankaccountsDiv.style.display = "none";
  myAccountDetailSection.removeAttribute('style');
  profileDiv.removeAttribute('style');
  header.className = "long-height";
})

myAccountLink.addEventListener('click', () => {
  mybankaccountsDiv.style.display = "none";
  singleBankAccountModal.style.display = "none";
  myAccountLink.className = 'active';
  myAccountLink.removeAttribute('style');
  createAccountBtn.style.borderTop = "none";
  signOutBtn.style.borderTop = "none";
  profileDiv.style.display = "none";
  createAccountDiv.style.display = 'none';
  myTransactionDiv.style.display = "none";
  myAccountDetailSection.style.display = "grid";
  header.removeAttribute('class');
});

myTransaction.addEventListener('click', () => {
  mybankaccountsDiv.style.display = "none";
  singleBankAccountModal.style.display = "none";
  header.removeAttribute('class');
  myTransactionDiv.style.display = "grid";
  createAccountDiv.style.display = 'none';
  profileDiv.style.display = "none";
  myAccountDetailSection.style.display = "none";
});

/** open the pop up modal */
transactionList.addEventListener('click', (event) => {
  console.log("btn clicked")
  if (event.target.classList[0] == 'btn-flat') {
    singleTransaction.style.display = "grid";
    myTransactionDiv.style.display = "none";
    mybankaccountsDiv.style.display = "none";
    singleBankAccountModal.style.display = "none";
  }
});

/**close the pou modal */
closeBtn.addEventListener('click', () => {
  singleTransaction.style.display = "none";
  myTransactionDiv.style.display = "grid";
});
