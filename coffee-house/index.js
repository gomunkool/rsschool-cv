// //menu burger
// const menuBurger = document.querySelector('.header-burger')
// const menuBurgerTopLine = document.querySelector('.header-burger__top-line')
// const menuBurgerBottomLine = document.querySelector('.header-burger__bottom-line')
// const headerNav = document.querySelector('.header-nav')
// const countNav = document.querySelector('.nav-count')
// const burgerLinks = document.querySelectorAll('.header-nav li')
//
// function openAndCloseItemMenuBurger() {
//   menuBurgerTopLine.classList.toggle('header-burger__top-line_open')
//   menuBurgerBottomLine.classList.toggle('header-burger__bottom-line_open')
//   headerNav.classList.toggle('header-nav_open')
//   countNav.classList.toggle('nav-count_open')
// }
//
// menuBurger.addEventListener('click', () => {
//   openAndCloseItemMenuBurger()
// })
//
// burgerLinks.forEach((item) => {
//   item.addEventListener('click', () => {
//     openAndCloseItemMenuBurger()
//   })
// })
//
// function changeSizeDisplay() {
//   const screenWidth = window.innerWidth;
//   if (screenWidth > 768) {
//     openAndCloseItemMenuBurger()
//   }
// }
//
// window.addEventListener('resize', changeSizeDisplay)


//carousel
let currentSlide = 0
let timerSwapSliders;
const sliderButtonLeft = document.querySelector('.slider-button__left')
const sliderButtonRight = document.querySelector('.slider-button__right')
const slidersCollection = document.querySelectorAll('.slider')
const sliderBarCollection = document.querySelectorAll('.slide-bar-count__item')
const sliderCount = document.querySelector('.slider-count')

function changeCurrentSlide(direction) {
  slidersCollection.forEach((slide) => {
    slide.classList.remove('slider__active')
    slide.classList.remove('slider__active_left')
    slide.classList.remove('slider__active_right')
    slidersCollection[currentSlide].classList.add('slider__active')
    slidersCollection[currentSlide].classList.add(direction)

  })
  sliderBarCollection.forEach((slideBar) => {
    slideBar.classList.remove('slide-bar-count__item_active')
    sliderBarCollection[currentSlide].classList.add('slide-bar-count__item_active')
  })
}

sliderButtonLeft.addEventListener('click', () => {
  currentSlide === 0 ? currentSlide = 2 : currentSlide--
  changeCurrentSlide('slider__active_left')
  clearTimeout(timerSwapSliders)
  startTimerSlider()
})

sliderButtonRight.addEventListener('click', () => {
  currentSlide === 2 ? currentSlide = 0 : currentSlide++
  changeCurrentSlide('slider__active_right')
  clearTimeout(timerSwapSliders)
  startTimerSlider()
})

function startTimerSlider() {
  timerSwapSliders = setTimeout(function tick() {
    currentSlide === 2 ? currentSlide = 0 : currentSlide++
    changeCurrentSlide('slider__active_right')
    timerSwapSliders = setTimeout(tick, 5000);
  }, 5000);
}

changeCurrentSlide('slider__active_right')
startTimerSlider()


let swapCoordinates = null

sliderCount.addEventListener('touchstart', swapTouchStart)
document.addEventListener('touchend', swapTouchEnd)

function swapTouchStart(event) {
  swapCoordinates = event.touches[0].screenX
}

function swapTouchEnd(event) {
  const touchEnd = event.changedTouches[0].screenX
  if (touchEnd < swapCoordinates) {
    currentSlide === 0 ? currentSlide = 2 : currentSlide--
    changeCurrentSlide('slider__active_left')
    clearTimeout(timerSwapSliders)
    startTimerSlider()
  }
  if (touchEnd > swapCoordinates) {
    currentSlide === 2 ? currentSlide = 0 : currentSlide++
    changeCurrentSlide('slider__active_right')
    clearTimeout(timerSwapSliders)
    startTimerSlider()
  }
}