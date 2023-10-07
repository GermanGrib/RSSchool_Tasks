import orphansArray from '../assets/jsons/pets.json';

const SWIPER_CONTAINER = document.querySelector('.swiper__line');
const SWIPER_BTNS = document.querySelectorAll('.swiper__btn');
let copyOrphArray = [...orphansArray];
let fullOrphArray = [];
let cardsToShow = setCardsToShow();
// I NEED
// 1) When double click on btns - handle this issue. 
// 2) On screens 768 and 320 - need to mix\shuffle info in cards that they don't repeat on any screens. 
// 3) do the same thing after 768 when returns ul

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setCardsToShow() {
  const CURRENT_SCREEN_WIDTH = window.screen.width;
  let cardNumbers;

  if (CURRENT_SCREEN_WIDTH <= 680) {
    cardNumbers = 3
  } else if (CURRENT_SCREEN_WIDTH <= 890) {
    cardNumbers = 6
  } else {
    cardNumbers = 8
  }

  return cardNumbers
}

function firstScreen() {

  for (let a = 0; a < 6; a++) {
    const SWIPER__LIST = document.createElement('ul')
    SWIPER__LIST.classList.add('list-reset', 'swiper__pictures', 'swiper__pictures-pets')
    SWIPER_CONTAINER.appendChild(SWIPER__LIST)
    fullOrphArray.push(shuffleArray([...copyOrphArray]))
  }

  let swiperLists = document.querySelectorAll('.swiper__pictures')

  for (let j = 0; j < swiperLists.length; j++) {
    for (let i = 0; i < 8; i++) {
      swiperLists[j].appendChild(createSwiperCard())
    }
  }

  fillCards()
  deleteUlLists()
}

function createSwiperCard() {

  const SWIPER_ITEM = document.createElement('li')
  SWIPER_ITEM.classList.add('swiper__item', 'swiper__item-pets')

  const CARD = document.createElement('div')
  CARD.classList.add('swiper__card')

  const CARD_IMG = document.createElement('img')
  CARD_IMG.classList.add('swiper__img')

  const CARD_TITLE = document.createElement('h4')
  CARD_TITLE.classList.add('swiper__title')

  const CARD_LINK = document.createElement('a')
  CARD_LINK.href = '#'
  CARD_LINK.classList.add('swiper__link', 'link', 'link-bordered')
  CARD_LINK.innerHTML = 'Learn more'

  CARD.appendChild(CARD_IMG);
  CARD.appendChild(CARD_TITLE);
  CARD.appendChild(CARD_LINK);

  SWIPER_ITEM.appendChild(CARD);


  return SWIPER_ITEM
}

function fillCards() {
  const SWIPER_TITLES = document.querySelectorAll('.swiper__title')
  let SWIPER_IMGS = document.querySelectorAll('.swiper__img')

  for (let i = 0; i < fullOrphArray.length; i++) {
    const currentData = fullOrphArray[i]
    for (let j = 0; j < currentData.length; j++) {
      const currentObject = currentData[j]
      SWIPER_TITLES[i * 8 + j].textContent = currentObject.name;
      SWIPER_IMGS[i * 8 + j].alt = currentObject.alt;
      SWIPER_IMGS[i * 8 + j].src = currentObject.src;

    }
  }

}

function setOffset() {
  const cardWidth = parseInt(window.getComputedStyle(document.querySelector('.swiper__item-pets')).width)
  const cardMarginRight = parseInt(window.getComputedStyle(document.querySelector('.swiper__item-pets')).marginRight);
  const cardMarginLeft = parseInt(window.getComputedStyle(document.querySelector('.swiper__item-pets')).marginLeft);
  let offsetSum = cardWidth + cardMarginRight + cardMarginLeft;
  let offset = (cardsToShow === 3) ? offsetSum : (cardsToShow === 6) ? offsetSum * (cardsToShow / 3) + 60 : offsetSum * (cardsToShow / 2) + 56;

  return offset
}

function changePages() {
  const SWIPER_PETS = document.querySelector('.swiper__line')
  const PREV_TO_BEGIN_BTN = document.querySelector('.paginbox__secondprevbtn-pets');
  const PREV_BTN = document.querySelector('.paginbox__prevbtn-pets');
  const NEXT_BTN = document.querySelector('.paginbox__nextbtn-pets');
  const NEXT_TO_END_BTN = document.querySelector('.paginbox__secondnextbtn-pets')
  let offset = setOffset()
  let pageNumberContainer = document.querySelector('.pagenumber-pets');
  let pageLimit = (cardsToShow === 3) ? 16 : (cardsToShow === 6) ? 8 : 6;

  if (this.classList.contains('paginbox__secondprevbtn-pets')) {
    pageNumberContainer.innerHTML = 1;
    SWIPER_PETS.style.left = 0;
    if (window.innerWidth <= 550) {
      SWIPER_PETS.style.left = '-5rem'
    }
    PREV_BTN.classList.add('disable');
    PREV_TO_BEGIN_BTN.classList.add('disable');
    NEXT_BTN.classList.remove('disable');
    NEXT_TO_END_BTN.classList.remove('disable');
  }

  if (this.classList.contains('paginbox__prevbtn-pets')) {
    let currentPageNumber = parseInt(pageNumberContainer.innerHTML);
    const currentLeft = parseInt(window.getComputedStyle(SWIPER_PETS).left);
    const newLeft = currentLeft + offset;
    SWIPER_PETS.style.left = newLeft + 'px';
    pageNumberContainer.innerHTML = currentPageNumber - 1;
    if (currentPageNumber === 2) {
      PREV_BTN.classList.add('disable');
      PREV_TO_BEGIN_BTN.classList.add('disable');
    }
    if (currentPageNumber === pageLimit) {
      NEXT_BTN.classList.remove('disable');
      NEXT_TO_END_BTN.classList.remove('disable');
    }
    return;
  };

  if (this.classList.contains('paginbox__nextbtn-pets')) {
    let currentPageNumber = parseInt(pageNumberContainer.innerHTML);
    const currentLeft = parseInt(window.getComputedStyle(SWIPER_PETS).left);
    const newLeft = currentLeft - offset;
    SWIPER_PETS.style.left = newLeft + 'px';
    if (PREV_BTN.classList.contains('disable')) {
      PREV_BTN.classList.remove('disable');
      PREV_TO_BEGIN_BTN.classList.remove('disable');
    }
    pageNumberContainer.innerHTML = currentPageNumber + 1;
    if (currentPageNumber === pageLimit - 1) {
      NEXT_BTN.classList.add('disable');
      NEXT_TO_END_BTN.classList.add('disable');
    }
    return;
  };

  if (this.classList.contains('paginbox__secondnextbtn-pets')) {
    pageNumberContainer.innerHTML = pageLimit;
    let currentPageNumber = parseInt(pageNumberContainer.innerHTML);
    SWIPER_PETS.style.left = (-offset * currentPageNumber + offset) + 'px';
    if (window.innerWidth <= 550) {
      SWIPER_PETS.style.left = (-offset * currentPageNumber + offset - 50) + 'px';
    }
    NEXT_BTN.classList.add('disable');
    NEXT_TO_END_BTN.classList.add('disable');
    PREV_BTN.classList.remove('disable');
    PREV_TO_BEGIN_BTN.classList.remove('disable');
  }

}

function handleResize() {
  const SWIPER_PETS = document.querySelector('.swiper__line')
  const NEXT_BTN = document.querySelector('.paginbox__nextbtn-pets');
  const NEXT_TO_END_BTN = document.querySelector('.paginbox__secondnextbtn-pets')
  const pageNumberContainer = document.querySelector('.pagenumber-pets')

  let swiperList = document.querySelectorAll('.swiper__pictures-pets')
  let windowWidth = window.innerWidth;
  let pageLimit = (cardsToShow === 3) ? 16 : (cardsToShow === 6) ? 8 : 6;
  cardsToShow = setCardsToShow();


  if (windowWidth <= 768 && +pageNumberContainer.innerHTML < pageLimit) {
    NEXT_BTN.classList.remove('disable');
    NEXT_TO_END_BTN.classList.remove('disable');
    deleteUlLists()
  }

  if (windowWidth <= 450) {
    let offset = setOffset();
    let currentPageNumber = parseInt(pageNumberContainer.innerHTML);
    SWIPER_PETS.style.left = (-offset * currentPageNumber + offset - 50) + 'px';
  }

  if (windowWidth === 768) {
    let offset = setOffset();
    let currentPageNumber = parseInt(pageNumberContainer.innerHTML)
    SWIPER_PETS.style.left = (-offset * currentPageNumber + offset) + 'px';
    deleteUlLists()
  }
  if (windowWidth === 1280) {
    let offset = setOffset();
    let currentPageNumber = parseInt(pageNumberContainer.innerHTML)
    SWIPER_PETS.style.left = (-offset * currentPageNumber + offset) + 'px';
  }

  if (windowWidth >= 769 && swiperList.length === 1) {
    createUlLists()
  }

  if (windowWidth >= 320 && +pageNumberContainer.innerHTML > pageLimit) {
    pageNumberContainer.textContent = pageLimit;
  }
}

function deleteUlLists() {
  let ulElements = SWIPER_CONTAINER.querySelectorAll('ul');

  if (window.innerWidth <= 768 && ulElements.length > 1) {
    for (let i = 1; i < ulElements.length; i++) {
      const liElements = ulElements[i].querySelectorAll('li');
      for (let j = 0; j < liElements.length; j++) {
        ulElements[0].appendChild(liElements[j]);
      }
      SWIPER_CONTAINER.removeChild(ulElements[i]);
    }
  }
}

function createUlLists() {
  const swiperLine = document.querySelector('.swiper__line');
  const firstUl = document.querySelector('.swiper__pictures-pets');
  const swiperCards = document.querySelectorAll('.swiper__item-pets');
  const chunks = []

  for (let i = 0; i < 5; i++) {
    const newUl = firstUl.cloneNode(false);
    swiperLine.appendChild(newUl);
  }

  for (let i = 0; i < swiperCards.length; i += 8) {
    chunks.push(Array.from(swiperCards).slice(i, i + 8));
  }

  let otherUls = document.querySelectorAll('.swiper__pictures-pets:not(:first-of-type)')

  chunks.forEach((chunk, index) => {
    if (index < otherUls.length) {
      const ul = otherUls[index];
      chunk.forEach((li) => ul.appendChild(li));
    }
  });
}

window.addEventListener("resize", handleResize);

SWIPER_BTNS.forEach(btn => btn.addEventListener('click', changePages))
firstScreen()

console.log('HELO SWIPER')