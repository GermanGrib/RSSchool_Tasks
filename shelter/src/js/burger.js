const BURGER_ICON = document.querySelector('.burger');
const BURGER_LINE = document.querySelector('.burger__line');
const BURGER_CLASS = 'burger';
const BURGER_LINE_CLASS = 'burger__line';
const NAV_CONTAINER = document.querySelector('.navigation');
const NAV_LINKS = document.querySelectorAll('.navigation__link');
const BODY_BLACKOUT = document.querySelector('.modal-background');

function openNavMenu(event) {
  let eventTargetClassList = event.target.classList

  if (
    (eventTargetClassList.contains(BURGER_CLASS) &&
      BURGER_ICON.classList.contains('is-active')) ||
    (eventTargetClassList.contains(BURGER_LINE_CLASS) &&
      BURGER_ICON.classList.contains('is-active'))
  ) {
    closeNavMenu()
  } else {
    event.stopPropagation();
    BURGER_ICON.classList.add('is-active');
    NAV_CONTAINER.classList.add('block');
    BODY_BLACKOUT.classList.add('block');

    changeBodyOverlay();
    NAV_LINKS.forEach(link => link.addEventListener('click', closeNavMenu))
    BODY_BLACKOUT.addEventListener('click', closeNavMenu);
  }
}

function changeBodyOverlay() {
  const bodyStyleValue = window.getComputedStyle(document.body).overflowY;

  (bodyStyleValue === 'overlay') ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'overlay';
}

function closeNavMenu() {
  BURGER_ICON.classList.remove('is-active');
  NAV_CONTAINER.classList.remove('block');
  BODY_BLACKOUT.classList.remove('block');

  changeBodyOverlay();
  NAV_LINKS.forEach(link => link.removeEventListener('click', closeNavMenu))
  BODY_BLACKOUT.removeEventListener('click', closeNavMenu);
}

BURGER_ICON.addEventListener('click', openNavMenu)