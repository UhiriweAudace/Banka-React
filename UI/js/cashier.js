/** Get the IDs Of Every Division */
const profileDiv = document.getElementById('prof');
const AccountsList = document.getElementById('bank-account-list');
const bankAccountsList = document.getElementById('transaction-list');
const viewButton = document.getElementById('view');
const modalDetails = document.getElementById('single-account');
const sidenav = document.querySelector('.sidenav');
const withdrawDiv = document.getElementById('withdraw-money');
const depositDiv = document.getElementById('deposit-money');

/** Get Modal's element */
const activeIcon = document.querySelector('.active-icon');
const accountStatus = document.querySelector('.account-status');
const deActivate = document.getElementById('deactivate-account');

/** Once Cashier click on deactive account
 * The status of the account should be changed 
 * To dormant or back to active.
 */
deActivate.addEventListener('click', (event) => {

  if (event.target.id === "Activate") {
    activeIcon.style.color = "#1fde16";
    accountStatus.textContent = "Account is Now Active";
    deActivate.setAttribute('id', 'deacivate-account');
    deActivate.textContent = "Deactivate";
  } else {
    activeIcon.style.color = "red";
    accountStatus.textContent = "Account is Now Dormant";
    deActivate.setAttribute('id', 'Activate');
    deActivate.textContent = "Activate";
  }

});

/** Get the IDs Of Every Link in the Header section 
 * And sideBar section
 */
const bankAccountList = document.getElementById('accounts-list');
const withdrawLink = document.getElementById('withdraw-link');
const depositLink = document.getElementById('deposit-link');
const resetPassword = document.querySelector('#reset-password');

/**
 * Listening the event once you click on
 * Users Bank Account List from Header section 
 * */
document.getElementById('accounts-list').addEventListener('click', () => {
  profileDiv.style.display = "none";
  modalDetails.style.display = "none";
  withdrawDiv.style.display = "none";
  depositDiv.style.display = "none";
  AccountsList.style.display = "grid";
  sidenav.style.height = "100%";
});

/** Listening the event by clicking on the View Button */
bankAccountsList.addEventListener('click', (event) => {

  if (event.target.classList[0] == 'btn-flat') {
    profileDiv.style.display = "none";
    AccountsList.style.display = "none";
    withdrawDiv.style.display = "none";
    depositDiv.style.display = "none";
    modalDetails.style.display = "grid";
    sidenav.style.height = "100%";
  }

});

/** Close the PoP up modal */
document.getElementById('close').addEventListener("click", () => {
  modalDetails.style.display = "none";
  AccountsList.style.display = "grid";
  sidenav.style.height = "100%";
});

/**Close withdraw modal */
document.querySelector('.close-withdraw').addEventListener('click', () => {
  withdrawDiv.style.display = "none";
  AccountsList.style.display = "grid";
});

/**Close Deposit modal */
document.querySelector('.close-deposit').addEventListener('click', () => {
  depositDiv.style.display = "none";
  AccountsList.style.display = "grid";
});

/**Once you clicked on My Profile */
document.getElementById('myprofile').addEventListener('click', () => {
  modalDetails.style.display = "none";
  AccountsList.style.display = "none";
  withdrawDiv.style.display = "none";
  depositDiv.style.display = "none";
  sidenav.style.height = "100vh";
  profileDiv.style.display = "grid";
});

/** Once Admin click on Reset will be able
 * automatically update his/her password.
 */
resetPassword.addEventListener('click', () => {
  //console.log('clicked');
  window.location = "../html/newPassword.html";
})

document.addEventListener('DOMContentLoaded', () => {
  sidenav.style.height = "100vh";
});

//Cashier Withdraw Money
withdrawLink.addEventListener('click', () => {
  console.log('withdraw clicked!')
  modalDetails.style.display = "none";
  AccountsList.style.display = "none";
  profileDiv.style.display = "none";
  sidenav.style.height = "100vh";
  depositDiv.style.display = "none";
  withdrawDiv.style.display = "grid";
});

//Cashier Deposit Money
depositLink.addEventListener('click', () => {
  modalDetails.style.display = "none";
  AccountsList.style.display = "none";
  profileDiv.style.display = "none";
  sidenav.style.height = "100vh";
  withdrawDiv.style.display = "none";
  depositDiv.style.display = "grid";
});