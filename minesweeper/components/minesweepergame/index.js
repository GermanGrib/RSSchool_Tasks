import './styles.scss';
import {
  createElement,
  removeGameProgress,
  restartGame,
} from '../reusableFunctions';
import { isSoundEnabled } from './cell';

let deleteClassTimeoutId;

const SECTION_GAME = createElement('section', 'minesweeper-game');
const GAME_CONTAINER = createElement('div', [
  'container',
  'minesweeper-game__container',
]);
const TOP_MENU = createElement('div', ['minesweeper-game__topmenu', 'topmenu']);
const BOMB_SELECT_CONTAINER = createElement(
  'div',
  'minesweeper-game__bombs-container'
);
const VALUE_OF_BOMB_IN_GAME = createElement(
  'label',
  ['topmenu__bomb-value'],
  'Bombs'
);
VALUE_OF_BOMB_IN_GAME.setAttribute('for', 'number');
const BOMB_VARIABLES = createElement('select', 'topmenu__bomb-variables');
BOMB_VARIABLES.setAttribute('for', 'number');
BOMB_VARIABLES.setAttribute('id', 'number');

for (let i = 10; i < 100; i++) {
  const BOMB_OPTION = createElement('option', 'topmenu__bomb-option');
  BOMB_OPTION.setAttribute('value', i);
  BOMB_OPTION.textContent = i;
  if (i === 10) {
    BOMB_OPTION.setAttribute('selected', 'selected');
  }
  BOMB_VARIABLES.appendChild(BOMB_OPTION);
}

BOMB_VARIABLES.addEventListener('change', changeValue);

const SOUND_BTN = createElement('div', 'sound');
SOUND_BTN.innerHTML = 'Sound: <span class="sound__position on">On</span>';
SOUND_BTN.addEventListener('click', toggleSoundBtn);

const RESTART_GAME_ICON = createElement('div', ['topmenu__restart-icon']);
RESTART_GAME_ICON.innerHTML = `<svg class="topmenu__restart-icon--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.013 27.26">
<path fill="currentColor" id="Refresh-ICon-SVG-paldjvc" d="M3.371,7.616a11.46,11.46,0,0,1,6.945-3.3L8.422,2.422A1.406,1.406,0,0,1,8.309.267a1.987,1.987,0,0,1,2.452.41l1.9,1.9a19.975,19.975,0,0,0,2.618,2.157,1.184,1.184,0,0,1,.516.634.991.991,0,0,1-.516,1.111,20.055,20.055,0,0,0-2.618,2.157l-1.9,1.9a2.179,2.179,0,0,1-1.974.629,1.327,1.327,0,0,1-.478-.219,1.378,1.378,0,0,1,.03-2.067c.028-.03.054-.061.083-.09l1.711-1.71A8.779,8.779,0,0,0,5.295,21.964c.152.152.31.3.47.433A8.784,8.784,0,0,0,17.718,9.539l1.926-1.924a11.7,11.7,0,0,1,.855.959A11.507,11.507,0,0,1,11.506,27.26a11.425,11.425,0,0,1-7.669-2.931c-.159-.142-.315-.288-.467-.44a11.506,11.506,0,0,1,0-16.273"/>
</svg>`;
RESTART_GAME_ICON.addEventListener('click', function () {
  removeGameProgress();
  this.classList.add('rotate');
  clearTimeout(deleteClassTimeoutId);
  deleteClassTimeoutId = setTimeout(() => {
    this.classList.remove('rotate');
  }, 500);
  restartGame();
});
const GAME_BOARD = createElement('div', [
  'minesweeper-game__gameboard',
  'game-board',
]);
const BOTTOM_MENU = createElement('div', [
  'minesweeper-game__bottommenu',
  'bottom-menu',
]);
const TIMER_CONTAINER = createElement('div', 'bottom-menu__timer-container');
const TIMER_TEXT = createElement(
  'div',
  'bottom-menu__timer-container--text',
  'Time'
);
const TIMER_TIME = createElement('div', ['bottom-menu__timer'], '00');
const CLICKS_COUNTER_CONTAINER = createElement(
  'div',
  'bottom-menu__clicks-container'
);
const CLICKS_TEXT = createElement(
  'div',
  'bottom-menu__timer-container--text',
  'Clicks'
);

const FLAG_LEFT_BOMBS_COUNTER = createElement('div', [
  'bottom-menu__flag-counter',
  'flag-counter',
]);
const FLAGS_COUNTER_CONTAINER = createElement('div', 'flag-counter__container');
const FLAG_TEXT = createElement('div', 'flag-counter__text', 'Flags:');
const FLAG_VALUE = createElement('div', 'flag-counter__value');
const BOMBS_LEFT_CONTAINER = createElement(
  'div',
  'flag-counter__bomb-container'
);
const BOMBS_LEFT_COUNTER_TEXT = createElement(
  'div',
  'flag-counter__bomb-text',
  'Bombs:'
);
const BOMBS_LEFT_COUNTER_VALUE = createElement(
  'div',
  'flag-counter__bomb-value'
);
BOMBS_LEFT_CONTAINER.append(BOMBS_LEFT_COUNTER_TEXT, BOMBS_LEFT_COUNTER_VALUE);
FLAGS_COUNTER_CONTAINER.append(FLAG_TEXT, FLAG_VALUE);
FLAG_LEFT_BOMBS_COUNTER.append(BOMBS_LEFT_CONTAINER, FLAGS_COUNTER_CONTAINER);

const CLICK_COUNTER = createElement('div', ['bottom-menu__counter'], '0');
CLICKS_COUNTER_CONTAINER.append(CLICKS_TEXT, CLICK_COUNTER);

BOMB_SELECT_CONTAINER.append(VALUE_OF_BOMB_IN_GAME, BOMB_VARIABLES);
TIMER_CONTAINER.append(TIMER_TEXT, TIMER_TIME);
SECTION_GAME.appendChild(GAME_CONTAINER);
TOP_MENU.append(BOMB_SELECT_CONTAINER, SOUND_BTN, RESTART_GAME_ICON);

BOTTOM_MENU.append(
  TIMER_CONTAINER,
  FLAG_LEFT_BOMBS_COUNTER,
  CLICKS_COUNTER_CONTAINER
);
GAME_CONTAINER.append(TOP_MENU, GAME_BOARD, BOTTOM_MENU);

GAME_BOARD.addEventListener('mousedown', clickCounter);

function clickCounter(isWin) {
  let currentCounter = +CLICK_COUNTER.textContent;

  if (
    event.target.classList.contains('initial') &&
    event.button !== 2 &&
    !event.target.classList.contains('flag')
  ) {
    CLICK_COUNTER.innerHTML = currentCounter + 1;
  }

  if (event.target.classList.contains('bomb-bomb') || isWin) {
    localStorage.setItem(
      'clickCounter',
      JSON.stringify(String(CLICK_COUNTER.innerHTML))
    );
  }
}

function toggleSoundBtn() {
  let conditionElement = this.firstElementChild;

  conditionElement.classList.toggle('on');
  conditionElement.classList.toggle('off');
  if (conditionElement.classList.contains('on')) {
    conditionElement.innerHTML = 'On';
    isSoundEnabled.value = true;
  } else {
    conditionElement.innerHTML = 'Off';
    isSoundEnabled.value = false;
  }
}

function changeValue() {
  removeGameProgress();
  let currentBombsValue = this.value;
  let localStorageGameOptions = localStorage.getItem('currentGameBoardOption');
  let localStorageGameOptionsObj = JSON.parse(localStorageGameOptions);

  localStorageGameOptionsObj.cellsBombValue = currentBombsValue;
  localStorage.setItem(
    'currentGameBoardOption',
    JSON.stringify(localStorageGameOptionsObj)
  );

  restartGame();
}

document.addEventListener('DOMContentLoaded', function() {

  TIMER_TIME.addEventListener('input', setTimeInLocalStorage);
  let savedTimerValue = localStorage.getItem('currentGameTimer');

  if (savedTimerValue) {
    TIMER_TIME.innerHTML = savedTimerValue;
  }

  function setTimeInLocalStorage() {
    let currentTime = TIMER_TIME.innerHTML;
    localStorage.setItem('currentGameTimer', currentTime);
  }

  window.addEventListener('beforeunload', function(event) {
    let currentTime = TIMER_TIME.innerHTML;

    localStorage.setItem('currentGameTimer', currentTime);

    if(FLAG_LEFT_BOMBS_COUNTER.classList.contains('is-active')) {
      let flagsAndBombsCounter = {
        'is-active': 'is-active',
        'flagsCounter': FLAG_VALUE.innerHTML,
        'bombsCounter': BOMBS_LEFT_COUNTER_VALUE.innerHTML
      }

      localStorage.setItem('flagAndBombsValue', JSON.stringify(flagsAndBombsCounter))
    }
  });
});


export { SECTION_GAME, GAME_BOARD, clickCounter };
