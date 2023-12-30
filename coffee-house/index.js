//menu burger
const menuBurger = document.querySelector('.header-burger')
const menuBurgerTopLine = document.querySelector('.header-burger__top-line')
const menuBurgerBottomLine = document.querySelector('.header-burger__bottom-line')
const headerNav = document.querySelector('.header-nav')
const countNav = document.querySelector('.nav-count')


menuBurger.addEventListener('click', () => {
  menuBurgerTopLine.classList.toggle('header-burger__top-line_open')
  menuBurgerBottomLine.classList.toggle('header-burger__bottom-line_open')
  headerNav.classList.toggle('header-nav_open')
  countNav.classList.toggle('nav-count_open')
})