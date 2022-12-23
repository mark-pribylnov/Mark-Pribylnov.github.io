const openClass = 'nav-mobile--open';
const menu = document.querySelector('.nav-mobile');
const openBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.nav-mobile__close-btn');


// "Off click" ARTICLE ------------- https://codeburst.io/the-off-click-7cbc08bb3df5
















//  ---------------- BEFORE

function onClick(event) {
  menu.classList.toggle(openClass);

  event.stopPropagation();

  document.addEventListener("click", function(event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(".nav-mobile")) return;
    // If user clicks outside the element, hide it.
    menu.classList.toggle(openClass)
  });
}

function offClick() {
  menu.classList.toggle(openClass);
  document.removeEventListener('click', offClick);
}

openBtn.addEventListener('click', onClick);
closeBtn.addEventListener('click', offClick);
