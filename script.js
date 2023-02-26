

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





// --- --- CAROUSEL MOBILE--- ---





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







// --- --- CAROUSEL DESKTOP--- ---











// Functions

const swapSlides = () => {
  const swapedElement = slides.splice(0, 1)[0];
  // At index 2 delete 0 elements and insert swapedElement
  slides.splice(2, 0, swapedElement);
}
// Make the first slide the last
swapSlides();

const swapping2 = () => {
  const el = document.getElementsByClassName('carousel__slide')[0];
  console.log(el)
}
// swapping2();

const setSlidePositionDesktop = () => {
  const carouselWidth = parseInt(getComputedStyle(slidesList).width, 10);
  const emptyWidth = carouselWidth - slideWidth
  const spaceBetweenSlides = 60;

  // Last slide moves to the left
  slides[slides.length - 1].style.left = -slideWidth + emptyWidth / 2 - spaceBetweenSlides + 'px';
  // First slide in the middle
  slides[0].style.left = emptyWidth / 2 + 'px';
  // Second slide on the right
  slides[1].style.left = slideWidth + emptyWidth / 2 + spaceBetweenSlides + 'px';
};
setSlidePositionDesktop();


const newCurrentSlideDesktop = () => {
  // Spain isn't current slide anymore
  slides[slides.length - 1].classList.remove('js-current-slide');
  // Now Japan is current slide by default
  slides[0].classList.add('js-current-slide');
}
newCurrentSlideDesktop();


const cloneSlides = () => {
  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];
  const firstSlideClone = firstSlide.cloneNode(true);
  const lastSlideClone = lastSlide.cloneNode(true);

  slidesList.appendChild(firstSlideClone);
  slidesList.insertBefore(lastSlideClone, firstSlide)
  console.log(slidesList)
};

// cloneSlides();


const moveToSlideDesktop = (slidesList, currentSlide, targetSlide) => {
  const carouselWidth = parseInt(getComputedStyle(slidesList).width, 10);
  const spaceBetweenSlides = 60;
  const targetSlideLeft = parseInt(targetSlide.style.left, 10);
  // console.log(targetSlideLeft);
  // console.log(carouselWidth);
  const emptyWidth = carouselWidth - slideWidth;
  // console.log(emptyWidth / 2);
  // console.log(targetSlideLeft - emptyWidth / 2);
  slidesList.style.transform = 'translateX(' + -(targetSlideLeft - emptyWidth / 2) + 'px)';
  currentSlide.classList.remove('js-current-slide');
  targetSlide.classList.add('js-current-slide');
}

// Maybe don't need
// const definePrevSlide = () => {
//   const currentSlide = slidesList.querySelector('.js-current-slide');
//   const prevSlide = currentSlide.previousElementSibling;
//   return console.prevSlide;
// }
// const defineNextSlide = () => {
//   const currentSlide = slidesList.querySelector('.js-current-slide');
//   const nextSlide = currentSlide.nextElementSibling;
//   return console.nextSlide;
// }
// definePrevSlide();
// defineNextSlide();

// Event listeners

// Doesn't work
// const checkNearCurrentSlide = (clickedElement) => {
//   const currentSlide = slidesList.querySelector('.js-current-slide');
//   clickedElement === currentSlide.nextElementSibling ? console.log('Next') : console.log("Prev")
// }

// For each slide defint wheter it's the next or previous slide
slides.forEach(element => element.addEventListener('click', () => {
  const currentSlide = slidesList.querySelector('.js-current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const prevSlide = currentSlide.previousElementSibling;

  if (element === nextSlide) {
    // console.log('Next');
    moveToSlideDesktop(slidesList, currentSlide, nextSlide);
  } else if (element === prevSlide) {
    moveToSlideDesktop(slidesList, currentSlide, prevSlide);
    // console.log('Prev')
  };
}));

// slides[0].addEventListener('click', () => {
//   const currentSlide = slidesList.querySelector('.js-current-slide');
//   const nextSlide = currentSlide.nextElementSibling;
//   console.log(nextSlide);
//   const currentDot = dotsNav.querySelector('.current-dot')
//   const nextDot = currentDot.nextElementSibling
//   const nextIndex = slides.findIndex(slide => slide === nextSlide)

//   moveToSlideDesktop(slidesList, currentSlide, nextSlide)
//   updateDots(currentDot, nextDot)

//   const firstSlide = slides[0];
//   const lastSlide = slides[slides.length - 1];

//   const firstSlideClone = firstSlide.cloneNode(true);
//   const lastSlideClone = lastSlide.cloneNode(true);
//   console.log(slidesList);
//   slidesList.insertBefore(lastSlideClone, firstSlide);
//   slides.forEach(setSlidePositionDesktop);
//   // console.log(slidesList);
// })

// slides[2].addEventListener('click', () => {
//   const currentSlide = slidesList.querySelector('.js-current-slide');
//   const prevSlide = currentSlide.previousElementSibling;
//   const currentDot = dotsNav.querySelector('.current-dot')
//   const prevDot = currentDot.previousElementSibling
//   const prevIndex = slides.findIndex(slide => slide === prevSlide)

//   moveToSlideDesktop(slidesList, currentSlide,prevSlide)
//   updateDots(currentDot, prevDot)
// })































// DON'T DELETE --- DON'T DELETE --- DON'T DELETE




// --- --- RESPONSIVE PADDING for header --- ---
// (replaced by CSS calc() function. I left calculations to know where the values come from)




// Enable console logs to see in console how it works
// const resizePadding = () => {
//   const currentViewport = window.innerWidth;
//   console.log(`Viewport width: ${currentViewport}px`)

//   const onePxToVw = Math.round((100 / currentViewport) * 100) / 100;
//   console.log(`1px = ${onePxToVw}vw`)

//   const header = document.querySelector('.header')
//   const startViewport = 1440;
//   const finishViewport = 920;
//   const currentInlinePadding = getComputedStyle(header).paddingInline;
//   console.log(`Current inline padding: ${currentInlinePadding}`);

//   const maxInlinePadding = 120;
//   const targetInlinePadding = 15;
//   const pixelsFromStart = startViewport - currentViewport;
//   console.log(`Pixels from start: ${pixelsFromStart}px`)

//   const step = Math.round(((startViewport - finishViewport) / (maxInlinePadding - targetInlinePadding)) * 100) / 100;
//   console.log(`Step: ${step}px\nHow much viewport have to shrink to cut 1px off the padding`);

//   const pixelsToCut = Math.round((pixelsFromStart / step) * 100) / 100;
//   console.log(`${pixelsToCut} pixels to cut from padding`)

//   header.style.paddingLeft = maxInlinePadding - pixelsToCut + 'px'
//   header.style.paddingRight = maxInlinePadding - pixelsToCut + 'px'


// Turning JS into CSS calculation
// Variable 'pixelsFromStart'
// (1440px - 100vw)

// Variable 'step'
// (calc(1440px - 910px) / calc(120px - 15px))

// Variable 'pixelsToCut'
// ((1440px - 100vw) / ((1440px - 910px) / (120px - 15px)))

// Padding
// calc(120px - ((1440px - 100vw) / ((1440px - 910px) / (120px - 15px))))




// Enable to make responsive padding of desktop header
// resizePadding()

// Turn on if you want to play with window size to see how it works
// window.addEventListener('resize', resizePadding)
