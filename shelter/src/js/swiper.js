import orphansArray from '../assets/jsons/pets.json';

const SWIPER = document.querySelector('.swiper__container');
const BTN_LEFT = document.querySelector('.prevbtn');
const BTN_RIGHT = document.querySelector('.nextbtn');
let copyOrphArray = [...orphansArray];
let currentMouseLeftClick = [];
let currentMouseRightClick = [];

const moveLeft = () => {
  let currentWindowWidth = window.innerWidth;
  let transitionName = (currentWindowWidth <= 760) ? 'transition-left-mobile' : (currentWindowWidth <= 1200) ? 'transition-left-tablet' : 'transition-left'
  SWIPER.classList.add(transitionName);
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight)
  currentMouseLeftClick.push('left')
  if (currentMouseLeftClick.length === 2) {
    renderNewCards(currentMouseLeftClick)
  }

  if (currentMouseRightClick.length === 1) {
    currentMouseRightClick.length = 0
  }
}
const moveRight = () => {
  let currentWindowWidth = window.innerWidth;
  let transitionName = (currentWindowWidth <= 760) ? 'transition-right-mobile' : (currentWindowWidth <= 1200) ? 'transition-right-tablet' : 'transition-right'
  SWIPER.classList.add(transitionName);
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
  currentMouseRightClick.push('right')

  if (currentMouseRightClick.length === 2) {
    renderNewCards(currentMouseRightClick)
  }

  if (currentMouseLeftClick.length === 1) {
    currentMouseLeftClick.length = 0
  }
}

function renderNewCards(side) {
  let leftCards = document.querySelector('.swiper__pictures:first-child');
  let currentCenterCards = document.querySelector('.swiper__pictures:nth-child(2)');
  let rightCards = document.querySelector('.swiper__pictures:last-child');
  let currentCenterTitles = currentCenterCards.querySelectorAll('.swiper__title');
  let centerTitlesValues = [];
  currentCenterTitles.forEach(function (title) {
    centerTitlesValues.push(title.innerText)
  });
  let filteredArray = shuffleArray(copyOrphArray.filter(el => !centerTitlesValues.includes(el['name'])));
  console.log(centerTitlesValues)

  if (side[0] === 'left') {
    let swiperTitles = document.querySelectorAll('.swiper__title')
    let swiperImgs = document.querySelectorAll('.swiper__img')

    rightCards.innerHTML = currentCenterCards.innerHTML;
    for (let i = 0; i < 3; i++) {
      swiperTitles[i].textContent = filteredArray[i]['name']
      swiperImgs[i].src = filteredArray[i]['src']
      swiperImgs[i].alt = filteredArray[i]['alt']
      swiperTitles[3 + i].textContent = filteredArray[i]['name']
      swiperImgs[3 + i].src = filteredArray[i]['src']
      swiperImgs[3 + i].alt = filteredArray[i]['alt']
    }
  } else if (side[0] === 'right') {
    let swiperTitles = document.querySelectorAll('.swiper__title')
    let swiperImgs = document.querySelectorAll('.swiper__img')

    leftCards.innerHTML = currentCenterCards.innerHTML;
    for (let i = 0; i < 3; i++) {
      swiperTitles[3 + i].textContent = filteredArray[i]['name']
      swiperTitles[6 + i].textContent = filteredArray[i]['name']
      swiperImgs[3 + i].src = filteredArray[i]['src']
      swiperImgs[3 + i].alt = filteredArray[i]['alt']
      swiperImgs[6 + i].src = filteredArray[i]['src']
      swiperImgs[6 + i].alt = filteredArray[i]['alt']
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function firstScreen() {
  copyOrphArray = shuffleArray(copyOrphArray)
  let swiperTitles = document.querySelectorAll('.swiper__title')
  let swiperImgs = document.querySelectorAll('.swiper__img')

  for (let i = 0; i < 8; i++) {
    swiperTitles[i].innerText = copyOrphArray[i]['name']
    swiperImgs[i].src = copyOrphArray[i]['src']
    swiperImgs[i].alt = copyOrphArray[i]['alt']
  }

  swiperTitles[swiperTitles.length - 1].innerText = copyOrphArray[2]['name']
  swiperImgs[swiperTitles.length - 1].src = copyOrphArray[2]['src']
  swiperImgs[swiperTitles.length - 1].alt = copyOrphArray[2]['alt']
}

firstScreen()
SWIPER.addEventListener('animationend', (animationEvent) => {
  let currentWindowWidth = window.innerWidth;
  let transitionNameLeft = (currentWindowWidth <= 760) ? 'transition-left-mobile' : (currentWindowWidth <= 1200) ? 'transition-left-tablet' : 'transition-left';
  let transitionNameRight = (currentWindowWidth <= 760) ? 'transition-right-mobile' : (currentWindowWidth <= 1200) ? 'transition-right-tablet' : 'transition-right';
  let animaionNameLeft = (currentWindowWidth <= 760) ? 'move-left-mobile' : (currentWindowWidth <= 1200) ? 'move-left-tablet' : 'move-left';
  let animationNameRight = (currentWindowWidth <= 760) ? 'move-right-mobile' : (currentWindowWidth <= 1200) ? 'move-right-tablet' : 'move-right';

  if (animationEvent.animationName === animaionNameLeft) {
    SWIPER.classList.remove(transitionNameLeft);
    const leftItems = document.querySelector('#item-left').innerHTML;
    const centerItem = document.querySelector('#item-active').innerHTML;
    if (currentMouseLeftClick.length === 0 || currentMouseLeftClick.length === 1) {
      document.querySelector('#item-right').innerHTML = centerItem;
      document.querySelector('#item-active').innerHTML = leftItems;
    } else if (currentMouseLeftClick.length === 2) {
      currentMouseLeftClick.length = 1;
    }

  } else if (animationEvent.animationName === animationNameRight) {
    SWIPER.classList.remove(transitionNameRight);
    const rightItems = document.querySelector('#item-right').innerHTML;
    const centerItem = document.querySelector('#item-active').innerHTML;
    if (currentMouseRightClick.length === 0 || currentMouseRightClick.length === 1) {
      document.querySelector('#item-left').innerHTML = centerItem;
      document.querySelector('#item-active').innerHTML = rightItems;
    } else if (currentMouseRightClick.length === 2) {
      currentMouseRightClick.length = 1
    }
  }

  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);
})

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);


