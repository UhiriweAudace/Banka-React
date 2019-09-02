const closeBtn = document.getElementById('close-menu');
const openBtn = document.getElementById('open-menu');
let sideMenu = document.getElementById('side-menu');

openBtn.addEventListener('click', () => {
  sideMenu.style.display = "grid";
  sideMenu.style.transition = "0.7s";
  openBtn.style.display = "none";
});
closeBtn.addEventListener('click', () => {
  sideMenu.style.display = "none";
  openBtn.style.display = "block";
});

