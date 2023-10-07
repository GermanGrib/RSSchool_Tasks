import { removeGameProgress, toggleGameRules, toggleHide } from '../reusableFunctions';
import { GAME_BOARD } from '../minesweepergame';
import { createMatrix } from '../minesweepergame/matrix';
import { createElement } from '../reusableFunctions';
import { startGameTimer } from '../minesweepergame/cell';
import { BURGER_ICON } from '../burger';

const HEADER = createElement('header', 'header');
const HEADER_CONTAINER = createElement('div', [
  'container',
  'header__container',
]);
let LEVEL_BOX = createElement('div', ['settings-box', 'hide']);
let firstLevel = createElement(
  'div',
  ['settings-box__beginner', 'is-active'],
  'Beginner'
);
let secondLevel = createElement(
  'div',
  'settings-box__intermediate',
  'Intermediate'
);
let thirdLevel = createElement('div', 'settings-box_expert', 'Expert');
const MAIN_TITLE = createElement('h1', 'header__title', 'MineSweeper');
const LEVEL_SETTINGS = createElement('div', 'header__settings');
const SETTINGS_CHOICE = createElement('div', 'header__settings-choice');
SETTINGS_CHOICE.innerHTML = `Choose difficulty:<br>${firstLevel.textContent}`;

const NAVIGATION = createElement('nav', ['header__nav', 'nav']);
const RULES = createElement('div', 'nav__rules', 'Game rules');
const DEVELOPED_BY = createElement('div', 'nav__promotion');
const DEVELOPED_LINK = createElement(
  'a',
  'nav__promotion--link',
  'Developed by'
);
DEVELOPED_LINK.href = 'https://germangrib.github.io/rsschool-cv/';
DEVELOPED_LINK.target = '_blank';
DEVELOPED_BY.appendChild(DEVELOPED_LINK);
NAVIGATION.append(RULES, DEVELOPED_BY);

RULES.addEventListener('click', toggleGameRules);

NAVIGATION.addEventListener('click', handleUsingLinksInNavigation);
SETTINGS_CHOICE.addEventListener('click', function () {
  toggleHide(LEVEL_BOX);
});

LEVEL_SETTINGS.addEventListener('click', function () {
  setGameLevel.bind(this)();
});

function handleUsingLinksInNavigation() {
  if (event.target === DEVELOPED_LINK || event.target === RULES) {
    NAVIGATION.classList.remove('menu-open');
    BURGER_ICON.classList.remove('is-open');
  }
}

function setGameLevel() {
  event.preventDefault();
  let currentLevel = document.querySelector('.header__settings-choice');
  let clickCounter = document.querySelector('.bottom-menu__counter');

  clickCounter.innerHTML = '0';

  if (
    event.target === firstLevel ||
    event.target === secondLevel ||
    event.target === thirdLevel
  ) {
    removeGameProgress()
    let flagsValue = document.querySelector('.flag-counter__value');
    let bombsValue = document.querySelector('.flag-counter__bomb-value');
    const FLAG_BOMBS_COUNTER_CONTAINER = document.querySelector(
      '.bottom-menu__flag-counter'
    );

    bombsValue.innerHTML = '';
    flagsValue.innerHTML = '';
    FLAG_BOMBS_COUNTER_CONTAINER.classList.remove('is-active');

    let cellsValueInRaw =
      event.target === firstLevel ? 10 : event.target === secondLevel ? 15 : 25;
    let cellsBombValue =
      event.target === firstLevel ? 10 : event.target === secondLevel ? 30 : 60;
    let currentLocalStorageGameLevel = {
      cellsValueInRaw: String(cellsValueInRaw),
      cellsBombValue: String(cellsBombValue),
    };

    localStorage.setItem(
      'currentGameBoardOption',
      JSON.stringify(currentLocalStorageGameLevel)
    );

    currentLevel.textContent = `Choose difficulty:\n${event.target.textContent}`;
    LEVEL_BOX.classList.add('hide');
    GAME_BOARD.innerHTML = '';
    GAME_BOARD.classList.remove('expert');
    createMatrix(cellsValueInRaw, cellsValueInRaw, cellsBombValue);
    changeSelectedValue(cellsBombValue);

    if (event.target === firstLevel) {
      GAME_BOARD.classList.remove('expert', 'intermediate');
    } else if (event.target === secondLevel) {
      GAME_BOARD.classList.remove('expert');
      GAME_BOARD.classList.add('intermediate');
    } else if (event.target === thirdLevel) {
      GAME_BOARD.classList.remove('intermediate');
      GAME_BOARD.classList.add('expert');
    }
    startGameTimer(true, 'offTimer');

    firstLevel.classList.remove('is-active');
    secondLevel.classList.remove('is-active');
    thirdLevel.classList.remove('is-active');
    event.target.classList.add('is-active');
  }

  function changeSelectedValue(cellsBombValue) {
    let options = document.querySelectorAll('.topmenu__bomb-option');
    options.forEach((opt) => {
      if (opt.value !== String(cellsBombValue)) {
        opt.selected = false;
      } else {
        opt.selected = true;
      }
    });
  }
}

LEVEL_SETTINGS.append(SETTINGS_CHOICE, LEVEL_BOX);
LEVEL_BOX.append(firstLevel, secondLevel, thirdLevel);

HEADER.append(HEADER_CONTAINER);
HEADER_CONTAINER.append(LEVEL_SETTINGS, MAIN_TITLE, NAVIGATION);

export default HEADER;
