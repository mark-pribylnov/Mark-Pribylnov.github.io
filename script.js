const openClass = 'nav-mobile--open';
const menu = document.querySelector('.nav-mobile');
const openBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.nav-mobile__close-btn');
const navMobileLinks = document.getElementsByClassName('nav-mobile__link');


function onClick(event) {
  event.stopPropagation();
  menu.classList.toggle(openClass);
  if(menu.classList.contains(openClass)) {
    document.addEventListener('click', offClick)
  }
}

function offClick() {
  menu.classList.toggle(openClass)
  document.removeEventListener('click', offClick)
}

openBtn.addEventListener('click', onClick);

closeBtn.addEventListener('click', offClick);

for (let link of navMobileLinks) {
  link.addEventListener('click', offClick)
}

menu.addEventListener('click', event => event.stopPropagation());
