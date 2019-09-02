/** Get the IDs Of Every Division */
const profileDiv = document.getElementById('prof');
const createAccountDiv = document.getElementById('create-account');
const AccountsList = document.getElementById('bank-account-list');
const bankAccountsList = document.getElementById('transaction-list');
const viewButton = document.getElementById('view');
const modalDetails = document.getElementById('single-account');
const closeBtn = document.getElementById('close');
const sidenav = document.querySelector('.sidenav');

/** Get Modal's element */
const deActivate = document.getElementById('deactivate-account');
const activeIcon = document.querySelector('.active-icon');
const accountStatus = document.querySelector('.account-status');

/** Get the IDs Of Every Link in the Header section */
const createStaff = document.getElementById('create-link');
const bankAccountList = document.getElementById('accounts-list');

/*Get the IDs from side bar*/
const myprofile = document.getElementById('myprofile');

/**
 * Listening the event once you click on Create Account
 */
createStaff.addEventListener('click', () => {
  profileDiv.style.display = "none";
  AccountsList.style.display = "none";
  modalDetails.style.display = "none";
  createAccountDiv.style.display = "grid";
  sidenav.style.height = "100%";
});

/**
 * Listening the event once you click on
 * Bank Account List from Header section 
 * */
bankAccountList.addEventListener('click', () => {
  profileDiv.style.display = "none";
  createAccountDiv.style.display = "none";
  modalDetails.style.display = "none";
  AccountsList.style.display = "grid";
  sidenav.style.height = "100%";
});

/** Listening the event by clicking on the View Button */
bankAccountsList.addEventListener('click', (event) => {

  if (event.target.classList[0] == 'btn-flat') {
    profileDiv.style.display = "none";
    AccountsList.style.display = "none";
    createAccountDiv.style.display = "none";
    modalDetails.style.display = "grid";
    sidenav.style.height = "100%";
  }

});

/** Close the PoP up modal */
closeBtn.addEventListener("click", () => {
  modalDetails.style.display = "none";
  AccountsList.style.display = "grid";
  sidenav.style.height = "100%";
});

/**Once you clicked on My Profile */
myprofile.addEventListener('click', () => {
  modalDetails.style.display = "none";
  createAccountDiv.style.display = "none";
  AccountsList.style.display = "none";
  profileDiv.style.display = "grid";
  sidenav.style.height = "100vh";
});

/** Once Admin click on deactive account
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

/** Once Admin click on Reset will be 
 * automatically updating his/her password.
 */
document.querySelector('#reset-password').addEventListener('click', () => {
  console.log('clicked');
  window.location = "../html/newPassword.html";
})

document.addEventListener('DOMContentLoaded', () => {
  sidenav.style.height = "100vh";
});