//menu burger
const menuBurger = document.querySelector('.header-burger')
const menuBurgerTopLine = document.querySelector('.header-burger__top-line')
const menuBurgerBottomLine = document.querySelector('.header-burger__bottom-line')
const headerNav = document.querySelector('.header-nav')
const countNav = document.querySelector('.nav-count')
const burgerLinks = document.querySelectorAll('.header-nav li')

function openAndCloseItemMenuBurger() {
  menuBurgerTopLine.classList.toggle('header-burger__top-line_open')
  menuBurgerBottomLine.classList.toggle('header-burger__bottom-line_open')
  headerNav.classList.toggle('header-nav_open')
  countNav.classList.toggle('nav-count_open')
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
  const screenWidth = window.innerWidth;
  if (screenWidth > 768) {
    openAndCloseItemMenuBurger()
  }
}

window.addEventListener('resize', changeSizeDisplay)