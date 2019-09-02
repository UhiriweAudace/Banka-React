/**
 * @ Create a new User
 */

/**
   * @Create A New User with his/her Info
   * @param {string} url 
   * @param {object} data 
   */

document.getElementById('login').addEventListener('click', () => {

  const password = document.getElementById("Password").value;
  const email = document.getElementById("email").value;

  const data = { password, email };
  fetch('https://api-banka-app.herokuapp.com/api/v1/auth/signin', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then( response => { return response.json() })
    .then(async result => {
      
      //console.log(result)
      const { status, message, error, data } = result;
      await localStorage.setItem('UserData', JSON.stringify(data))
      if (status === 200) {
        data.is_admin ? window.location = '../html/admin.html' : data.is_cashier ? window.location = '../html/cashier.html' : window.location = '../html/client.html';
      }
    })
    .catch(err => console.log(err));

})
