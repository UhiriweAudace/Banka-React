
/**
 * @Create A New User with his/her Info
 * 
 */

document.getElementById('register').addEventListener('click', () => {

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const data = { firstname, lastname, password, email };

  fetch('https://api-banka-app.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => { return response.json() })
    .then(async result => {
     // console.log(result)
      const { status, message, error, data } = result;
      await localStorage.setItem('UserData',JSON.stringify(data))
      if (status === 201) {
        data.is_admin ? window.location = '../html/admin.html' : data.is_cashier ? window.location = '../html/cashier.html' : window.location = '../html/client.html';
      }
    })
    .catch(err => console.log(err));

})
