//menu burger
const menuBurger = document.querySelector('.header-burger')
const menuBurgerTopLine = document.querySelector('.header-burger__top-line')
const menuBurgerBottomLine = document.querySelector('.header-burger__bottom-line')
const headerNav = document.querySelector('.header-nav')
const countNav = document.querySelector('.nav-count')
const burgerLinks = document.querySelectorAll('.header-nav li')

function openAndCloseItemMenuBurger() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    menuBurgerTopLine.classList.toggle('header-burger__top-line_open')
    menuBurgerBottomLine.classList.toggle('header-burger__bottom-line_open')
    headerNav.classList.toggle('header-nav_open')
    countNav.classList.toggle('nav-count_open')
  }
}

menuBurger.addEventListener('click', () => {
  openAndCloseItemMenuBurger()
})

burgerLinks.forEach((item) => {
  item.addEventListener('click', () => {
    openAndCloseItemMenuBurger()
  })
})

function changeSizeDisplay() {
  const screenWidth = window.innerWidth
  if (screenWidth > 768) {
    openAndCloseItemMenuBurger()
  }
}

window.addEventListener('resize', changeSizeDisplay)

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
const additivesButtons = document.querySelectorAll('.modal-window-additives__button')


const currentProduct = {}
let modalProductTitleData;
let modalProductDescriptionData;
let modalProductPriseData;
let modalProductImgData;
let sizeCoast = '0.00'
let additivesCoast = '0.00'
let startCoast;
let totalCoast;


products.forEach((product) => {
  product.addEventListener('click', (event) => {
    window.scrollTo({top: 0});
    body.classList.add('body_disabled')
    modalWindow.classList.add('modal-window_active')
    additivesButtons.forEach((but) => {
      but.classList.remove('modal-window-additives__button_active')
    })
    sizeButtons.forEach((but) => {
      but.classList.remove('modal-window-size__button_active')
    })
    sizeButtons[0].classList.add('modal-window-size__button_active')

    modalProductTitleData = event.currentTarget.querySelector('.product__title').innerText;
    modalProductDescriptionData = event.currentTarget.querySelector('.product__description').innerText;
    modalProductPriseData = event.currentTarget.querySelector('.product__prise').innerText;
    const ProductImg = event.currentTarget.querySelector('.product__image')
    modalProductImgData = window.getComputedStyle(ProductImg).getPropertyValue('background');
    startCoast = modalProductPriseData

    productsData.forEach((data) => {
      if (modalProductTitleData === data.name) {
        Object.assign(currentProduct, data);
      }
    })

    modalTitle.innerHTML = `${modalProductTitleData}`
    modalDescription.innerHTML = `${modalProductDescriptionData}`
    modalCoast.innerHTML = `${startCoast}`
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

    const buttonElement = el.currentTarget;
    const imageElement = buttonElement.querySelector('.modal-window-size__button__image').textContent.trim();
    if (imageElement === 'S') {
      sizeCoast = '0.00'
    }
    if (imageElement === 'M') {
      sizeCoast = '0.50'
    }
    if (imageElement === 'L') {
      sizeCoast = '1.00'
    }
    calculationTotalCoast()
  })
})

additivesButtons.forEach((button) => {
  button.addEventListener('click', (el) => {
    el.currentTarget.classList.toggle('modal-window-additives__button_active')
    let countAdditives = 0
    additivesButtons.forEach((but) => {
      if (but.classList[1] === 'modal-window-additives__button_active') {
        countAdditives++
      }
    })
    if (countAdditives === 0) {
      additivesCoast = '0.00'
    }
    if (countAdditives === 1) {
      additivesCoast = '0.50'
    }
    if (countAdditives === 2) {
      additivesCoast = '1.00'
    }
    if (countAdditives === 3) {
      additivesCoast = '1.50'
    }
    calculationTotalCoast()
  })
})

function calculationTotalCoast() {
  const numericPrice1 = parseFloat(startCoast.replace("$", ""));
  const numericPrice2 = parseFloat(sizeCoast);
  const numericPrice3 = parseFloat(additivesCoast);

  const sum = numericPrice1 + numericPrice2 + numericPrice3
  if (sum % 1 === 0) {
    totalCoast = `$${sum}.00`
  }
  if (sum % 1 !== 0) {
    totalCoast = `$${sum}0`
  }
  modalCoast.innerHTML = `${totalCoast}`
}