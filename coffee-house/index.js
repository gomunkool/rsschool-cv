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
//
//
// //slider
// let currentSlide = 0
// let timerSwapSliders;
// const sliderButtonLeft = document.querySelector('.slider-button__left')
// const sliderButtonRight = document.querySelector('.slider-button__right')
// const slidersCollection = document.querySelectorAll('.slider')
// const sliderBarCollection = document.querySelectorAll('.slide-bar-count__item')
// const sliderCount = document.querySelector('.slider-count')
//
// function changeCurrentSlide(direction) {
//   slidersCollection.forEach((slide) => {
//     slide.classList.remove('slider__active')
//     slide.classList.remove('slider__active_left')
//     slide.classList.remove('slider__active_right')
//     slidersCollection[currentSlide].classList.add('slider__active')
//     slidersCollection[currentSlide].classList.add(direction)
//   })
//
//   sliderBarCollection.forEach((slideBar) => {
//     slideBar.classList.remove('slide-bar-count__item_active')
//     sliderBarCollection[currentSlide].classList.add('slide-bar-count__item_active')
//   })
// }
//
// sliderButtonLeft.addEventListener('click', () => {
//   currentSlide === 0 ? currentSlide = 2 : currentSlide--
//   changeCurrentSlide('slider__active_left')
//   clearTimeout(timerSwapSliders)
//   startTimerSlider()
// })
//
// sliderButtonRight.addEventListener('click', () => {
//   currentSlide === 2 ? currentSlide = 0 : currentSlide++
//   changeCurrentSlide('slider__active_right')
//   clearTimeout(timerSwapSliders)
//   startTimerSlider()
// })
//
// function startTimerSlider() {
//   timerSwapSliders = setTimeout(function tick() {
//     currentSlide === 2 ? currentSlide = 0 : currentSlide++
//     changeCurrentSlide('slider__active_right')
//     timerSwapSliders = setTimeout(tick, 5000);
//   }, 5000);
// }
//
// changeCurrentSlide('slider__active_right')
// startTimerSlider()
//
//
// let swapCoordinates = null
//
// sliderCount.addEventListener('touchstart', swapTouchStart)
// document.addEventListener('touchend', swapTouchEnd)
//
// function swapTouchStart(event) {
//   swapCoordinates = event.touches[0].screenX
// }
//
// function swapTouchEnd(event) {
//   const touchEnd = event.changedTouches[0].screenX
//   if (touchEnd < swapCoordinates) {
//     currentSlide === 0 ? currentSlide = 2 : currentSlide--
//     changeCurrentSlide('slider__active_left')
//     clearTimeout(timerSwapSliders)
//     startTimerSlider()
//   }
//   if (touchEnd > swapCoordinates) {
//     currentSlide === 2 ? currentSlide = 0 : currentSlide++
//     changeCurrentSlide('slider__active_right')
//     clearTimeout(timerSwapSliders)
//     startTimerSlider()
//   }
// }

//categories
const menuButtons = document.querySelectorAll('.menu-button')
const products = document.querySelectorAll('.product')
const refreshButton = document.querySelector('.refresh-button')
let currentMenuList = 'coffee'
const productArr = [];

menuButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    currentMenuList = event.currentTarget.className.split(' ')[1].split('_')[1]
    refreshButton.classList.remove('refresh-button_disabled')
    menuButtons.forEach((but) => {
      but.classList.remove('menu-button_active')
    })
    event.currentTarget.classList.add('menu-button_active');
    displayProducts()
  })
})

function displayProducts() {
  productArr.splice(0, productArr.length)
  products.forEach((product) => {
    const productClass = product.classList[1].split('_')[1]
    product.classList.remove('product_disabled')
    if (productClass !== currentMenuList) {
      product.classList.add('product_disabled')
    } else {
      productArr.push(product)
    }
  })
  productSmallScreen()
}


function productSmallScreen() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    for (let i = 4; i < productArr.length; i++) {
      productArr[i].classList.add('product_disabled')
    }
  } else {
    productArr.forEach((product) => {
      product.classList.remove('product_disabled')
    })
  }
}

refreshButton.addEventListener('click', () => {
  productArr.forEach((product) => {
    product.classList.remove('product_disabled')
    refreshButton.classList.add('refresh-button_disabled')
  })
})

productSmallScreen()
displayProducts()

window.addEventListener('resize', productSmallScreen);

//modal window
const body = document.querySelector('body')
const modalWindow = document.querySelector('.modal-window')
const modalWindowCloseButton = document.querySelector('.modal-window__close-button')
const modalWindowFon = document.querySelector('.modal-window__fon')
const sizeButtons = document.querySelectorAll('.modal-window-size__button')
const modalTitle = document.querySelector('.modal-window__title')
const modalDescription = document.querySelector('.modal-window__description')
const modalCoast = document.querySelector('.modal-window__total-sum')
const modalImg = document.querySelector('.modal-window__img')
import productsData from './data.js'
const modalSize = document.querySelectorAll('.modal-window-size__button__text')
const modalAdditives = document.querySelectorAll('.modal-window-additives__button__text')


const currentProduct = {}
let modalProductTitleData;
let modalProductDescriptionData;
let modalProductPriseData;
let modalProductImgData;
let totalCoast;
let sizeCoast = 0

products.forEach((product) => {
  product.addEventListener('click', (event) => {
    window.scrollTo({top: 0});
    body.classList.add('body_disabled')
    modalWindow.classList.add('modal-window_active')



    modalProductTitleData = event.currentTarget.querySelector('.product__title').innerText;
    modalProductDescriptionData = event.currentTarget.querySelector('.product__description').innerText;
    modalProductPriseData = event.currentTarget.querySelector('.product__prise').innerText;
    const ProductImg = event.currentTarget.querySelector('.product__image')
    modalProductImgData = window.getComputedStyle(ProductImg).getPropertyValue('background');

    productsData.forEach((data) => {
      if (modalProductTitleData === data.name) {
        Object.assign(currentProduct, data);
      }
    })

    modalTitle.innerHTML = `${modalProductTitleData}`
    modalDescription.innerHTML = `${modalProductDescriptionData}`
    modalCoast.innerHTML = `${modalProductPriseData}`
    modalImg.style.background = `${modalProductImgData}`
    modalSize[0].innerHTML = `${currentProduct.sizes.s.size}`
    modalSize[1].innerHTML = `${currentProduct.sizes.m.size}`
    modalSize[2].innerHTML = `${currentProduct.sizes.l.size}`
    modalAdditives[0].innerHTML = `${currentProduct.additives[0].name}`
    modalAdditives[1].innerHTML = `${currentProduct.additives[1].name}`
    modalAdditives[2].innerHTML = `${currentProduct.additives[2].name}`
  })
})


modalWindowCloseButton.addEventListener('click', () => {
  body.classList.remove('body_disabled')
  modalWindow.classList.remove('modal-window_active')
})

modalWindowFon.addEventListener('click', (event) => {
  if (event.target.className === 'modal-window__fon') {
    body.classList.remove('body_disabled')
    modalWindow.classList.remove('modal-window_active')
  }
})


sizeButtons.forEach((button) => {
  button.addEventListener('click', (el) => {
    sizeButtons.forEach((but) => {
      but.classList.remove('modal-window-size__button_active')
    })
    button.classList.add('modal-window-size__button_active')
  })
})