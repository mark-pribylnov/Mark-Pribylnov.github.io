

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
const dotsNavMobile = document.querySelector('.carousel__nav--mobile');
const dotsNavDesktop = document.querySelector('.carousel__nav--desktop');
const dotsMobile = Array.from(dotsNavMobile.children);
const dotsDesktop = Array.from(dotsNavDesktop.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const mediaIndicator = document.querySelector('.js-media-query-indicator');

// Functions


if (getComputedStyle(mediaIndicator).opacity != '0.1') {
  // If the media query isn't active
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);
} else {

  // Make the first slide the last in order to make maintaining the code easier. (if the carousel is infinite, which was the first idea)
  const swapSlidesInArray = () => {
    const swapedElement = slides.splice(0, 1)[0];
    slides.splice(2, 0, swapedElement);
  }
  swapSlidesInArray();


  const setSlidePositionDesktop = () => {
    const carouselWidth = parseInt(getComputedStyle(slidesList).width, 10);
    const emptyWidth = carouselWidth - slideWidth
    const spaceBetweenSlides = 60;

    // Last slide moves to the left
    slides[slides.length - 1].style.left = -slideWidth + emptyWidth / 2 - spaceBetweenSlides + 'px';
    // First slide in the middle
    slides[0].style.left = emptyWidth / 2 + 'px';
    // Second slide to the right
    slides[1].style.left = slideWidth + emptyWidth / 2 + spaceBetweenSlides + 'px';
  };
  setSlidePositionDesktop();


  const newCurrentSlideAndDotDesktop = () => {
    // Spain isn't current slide anymore
    slides[slides.length - 1].classList.remove('js-current-slide');
    // Now Japan is current slide by default
    slides[0].classList.add('js-current-slide');
    // The same with dots
    dotsDesktop[0].classList.remove('current-dot')
    dotsDesktop[1].classList.add('current-dot')
  }
  newCurrentSlideAndDotDesktop();

  const addListenerToSlidesDesktop = () => {
    const currentSlide = slidesList.querySelector('.js-current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const prevSlide = currentSlide.previousElementSibling;

    const currentDot = dotsNavDesktop.querySelector('.current-dot')
    const prevDot = currentDot.previousElementSibling
    const nextDot = currentDot.nextElementSibling

    nextSlide.addEventListener('click', () => {
      currentSlide.addEventListener('click', () => {
        moveToSlideDesktop(slidesList, currentSlide, currentSlide);
        updateDots(nextDot, currentDot)
      });
      moveToSlideDesktop(slidesList, currentSlide, nextSlide);
      updateDots(currentDot, nextDot)
    });

    prevSlide.addEventListener('click', () => {
      currentSlide.addEventListener('click', () => {
        moveToSlideDesktop(slidesList, currentSlide, currentSlide);
        updateDots(prevDot, currentDot)
      });
      moveToSlideDesktop(slidesList, currentSlide, prevSlide);
      updateDots(currentDot, prevDot)
    });
  }
  addListenerToSlidesDesktop();
}


const moveToSlide = (slidesList, currentSlide, targetSlide) => {
  slidesList.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('js-current-slide');
  targetSlide.classList.add('js-current-slide');
}

const moveToSlideDesktop = (slidesList, currentSlide, targetSlide) => {
  const carouselWidth = parseInt(getComputedStyle(slidesList).width, 10);
  const targetSlideLeft = parseInt(targetSlide.style.left, 10);
  const emptyWidth = carouselWidth - slideWidth;

  slidesList.style.transform = 'translateX(' + -(targetSlideLeft - emptyWidth / 2) + 'px)';
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
  const currentDot = dotsNavMobile.querySelector('.current-dot')
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slides.findIndex(slide => slide === prevSlide)

  moveToSlide(slidesList, currentSlide,prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrow(slides, leftBtn, rightBtn, prevIndex);
})


rightBtn.addEventListener('click', () => {
  const currentSlide = slidesList.querySelector('.js-current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNavMobile.querySelector('.current-dot')
  const nextDot = currentDot.nextElementSibling
  const nextIndex = slides.findIndex(slide => slide === nextSlide)

  moveToSlide(slidesList, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrow(slides, leftBtn, rightBtn, nextIndex);
})


dotsNavMobile.addEventListener('click', e => {
  const targetDot = e.target.closest('.carousel__dot');

  if(!targetDot) return;

  const currentSlide = slidesList.querySelector('.js-current-slide');
  const currentDot = dotsNavMobile.querySelector('.current-dot');
  const targetIndex = dotsMobile.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex]

  moveToSlide(slidesList, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrow(slides, leftBtn, rightBtn, targetIndex);
});

dotsNavDesktop.addEventListener('click', e => {
  const targetDot = e.target.closest('.carousel__dot');

  if(!targetDot) return;

  const currentSlide = slidesList.querySelector('.js-current-slide');
  const currentDot = dotsNavDesktop.querySelector('.current-dot');
  const targetIndex = dotsDesktop.findIndex(dot => dot === targetDot);
  let targetSlide = slides[targetIndex]

  if (targetIndex === 0) {
    targetSlide = slides[2]
  } else if (targetIndex === 1) {
    targetSlide = slides[0]
  } else {
    targetSlide = slides[1]
  }

  moveToSlideDesktop(slidesList, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});





// --- --- TEXT TRUNCATER --- ---





const resizedText = document.getElementsByClassName('storeis__text--trancated');

if (document.body.clientWidth < 390) {
  for (const element of resizedText) {
    $clamp(element, {clamp: 6, useNativeClamp: true, animate: false})
  }
}























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









// Might be helpful for infinite desktop carousel
// const cloneSlides = () => {
//   const secondSlide = slides[1];
//   const lastSlide = slides[slides.length - 1];
//   const secondSlideClone = secondSlide.cloneNode(true);
//   const lastSlideClone = lastSlide.cloneNode(true);
//   const spaceBetweenSlides = 60;

//   lastSlideClone.style.left = parseInt(slides[1].style.left, 10) + slideWidth + spaceBetweenSlides + 'px';
//   slidesList.appendChild(lastSlideClone);

//   secondSlideClone.style.left = parseInt(lastSlide.style.left, 10) - slideWidth - spaceBetweenSlides + 'px';
//   slidesList.insertBefore(secondSlideClone, lastSlide);

// };
// cloneSlides();
