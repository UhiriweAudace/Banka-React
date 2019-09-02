/*
document.getElementById('password').addEventListener('input', (event) => {
  let error = event.target.nextSibling.nextElementSibling;
  let inputField = event.target;
  console.log(input)
  if (event.target.value.length < 8) {
    error.textContent = "Password must have at least 8 characters!"
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }

  if (event.target.value.length === 0) {
    error.textContent = "Password field is required!";
    inputField.style.border = "1px solid #9d1132";
  }
})

 document.getElementById('register').addEventListener('click', () => {
   window.location = '../html/client.html';
 });*/
