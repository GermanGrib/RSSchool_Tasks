import './burger.scss'

const BURGER_ICON = document.createElement('div');
BURGER_ICON.classList.add('burger');

for (let i = 0; i < 3; i++) {
  const BURGER_LINE = document.createElement('span');
  BURGER_LINE.classList.add('burger__line');

  BURGER_ICON.append(BURGER_LINE);
}

BURGER_ICON.addEventListener('click', toggleNavMenu);

function toggleNavMenu() {
  const NAV_MENU  = document.querySelector('.header__nav')
  NAV_MENU.classList.toggle('menu-open')
  BURGER_ICON.classList.toggle('is-open')
}

export {BURGER_ICON};
