

// --- --- MOBILE MENU --- ---




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





// --- --- CAROUSEL --- ---





const slidesList = document.querySelector('.carousel__slides-list');
const slides = Array.from(slidesList.children);
const leftBtn = document.querySelector('.carousel__btn--left');
const rightBtn = document.querySelector('.carousel__btn--right');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;


// Functions

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);


const moveToSlide = (slidesList, currentSlide, targetSlide) => {
  slidesList.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('js-current-slide');
  targetSlide.classList.add('js-current-slide');
}


const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-dot');
  targetDot.classList.add('current-dot');
}


const hideShowArrow = (slides, leftBtn, rightBtn, targetIndex) => {
  if (targetIndex === 0) {
    leftBtn.classList.add('is-hidden');
    rightBtn.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    leftBtn.classList.remove('is-hidden');
    rightBtn.classList.add('is-hidden');
  } else {
    leftBtn.classList.remove('is-hidden');
    rightBtn.classList.remove('is-hidden');
  }
}


// Event listeners

leftBtn.addEventListener('click', () => {
  const currentSlide = slidesList.querySelector('.js-current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-dot')
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slides.findIndex(slide => slide === prevSlide)

  moveToSlide(slidesList, currentSlide,prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrow(slides, leftBtn, rightBtn, prevIndex);
})


rightBtn.addEventListener('click', () => {
  const currentSlide = slidesList.querySelector('.js-current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-dot')
  const nextDot = currentDot.nextElementSibling
  const nextIndex = slides.findIndex(slide => slide === nextSlide)

  moveToSlide(slidesList, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrow(slides, leftBtn, rightBtn, nextIndex);
})


dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('.carousel__dot');

  if(!targetDot) return;

  const currentSlide = slidesList.querySelector('.js-current-slide');
  const currentDot = dotsNav.querySelector('.current-dot');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex]

  moveToSlide(slidesList, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrow(slides, leftBtn, rightBtn, targetIndex);
});





// --- --- TEXT TRUNCATER --- ---





const resizedText = document.getElementsByClassName('storeis__text--trancated');

if (document.body.clientWidth < 390) {
  for (const element of resizedText) {
    $clamp(element, {clamp: 6, useNativeClamp: true, animate: false})
  }
}
