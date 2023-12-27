//menu burger
const menuBurger = document.querySelector('.header-burger')
const menuBurgerLines = document.querySelector('.header-burger__lines')
const headerNav = document.querySelector('.header-nav')

menuBurger.addEventListener('click', () => {
  menuBurgerLines.classList.toggle('header-burger__lines_open')
  headerNav.classList.toggle('header-nav_open')

})