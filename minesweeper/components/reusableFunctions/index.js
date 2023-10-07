import { createMatrix, matrix } from '../minesweepergame/matrix';
import { GAME_BOARD } from '../minesweepergame';
import { Cell, startGameTimer, restoreCell } from '../minesweepergame/cell';
import { SCORE_TABLE_BOX } from '../modal';

let clickScores = [];
let timerScores = [];
let winOrLost = [];
let localStorResults = localStorage.getItem('gameResults');

if (localStorResults) {
  const gameResultsString = localStorResults;
  const gameResultsObj = JSON.parse(gameResultsString);

  clickScores = gameResultsObj.clickScores.map((click) =>
    click.replace(/["']/g, '')
  );
  timerScores = gameResultsObj.timerScores.map((time) =>
    time.replace(/["']/g, '')
  );
  winOrLost = gameResultsObj.winOrLost.map((result) => result);
}

function toggleHide(elementToHide) {
  elementToHide.classList.toggle('hide');
}

function createElement(tag, classes, textContent) {
  const element = document.createElement(tag);
  if (Array.isArray(classes)) {
    element.classList.add(...classes);
  } else {
    element.classList.add(classes);
  }
  element.textContent = textContent || '';
  return element;
}

function restartGame() {
  let gameResultsString = localStorage.getItem('gameResults');
  let gameResults = JSON.parse(gameResultsString);
  GAME_BOARD.innerHTML = '';
  const FLAG_BOMBS_COUNTER_CONTAINER = document.querySelector(
    '.bottom-menu__flag-counter'
  );
  const BOMBS_OPTIONS = document.querySelectorAll('.topmenu__bomb-option');
  let clickCounter = document.querySelector('.bottom-menu__counter');
  let headerLevelDifficult = document.querySelector('.header__settings-choice');
  let localStorageGameOptions = localStorage.getItem('currentGameBoardOption');
  let localStorageGameOptionsObj = JSON.parse(localStorageGameOptions);
  let flagsValue = document.querySelector('.flag-counter__value');
  let bombsValue = document.querySelector('.flag-counter__bomb-value');
  let scoreResults = document.querySelectorAll('.score__user-info');

  bombsValue.innerHTML = '';
  flagsValue.innerHTML = '';
  clickCounter.innerHTML = '0';
  FLAG_BOMBS_COUNTER_CONTAINER.classList.remove('is-active');

  if (localStorageGameOptionsObj) {
    let gameBoardRow = Number(localStorageGameOptionsObj.cellsValueInRaw);
    let gameBoardBombs = Number(localStorageGameOptionsObj.cellsBombValue);

    if (gameBoardRow === 10) {
      GAME_BOARD.classList.remove('expert', 'intermediate');
      headerLevelDifficult.innerHTML = `Choose difficulty:<br>Beginner`;
      BOMBS_OPTIONS[gameBoardBombs - 10].setAttribute('selected', 'selected');
    } else if (gameBoardRow === 15) {
      GAME_BOARD.classList.remove('expert');
      GAME_BOARD.classList.add('intermediate');
      headerLevelDifficult.innerHTML = `Choose difficulty:<br>Intermediate`;
      BOMBS_OPTIONS[gameBoardBombs - 10].setAttribute('selected', 'selected');
    } else if (gameBoardRow === 25) {
      GAME_BOARD.classList.remove('intermediate');
      GAME_BOARD.classList.add('expert');
      headerLevelDifficult.innerHTML = `Choose difficulty:<br>Expert`;
      BOMBS_OPTIONS[gameBoardBombs - 10].setAttribute('selected', 'selected');
    }
    createMatrix(gameBoardRow, gameBoardRow, gameBoardBombs);
  } else {
    createMatrix();
    let cellsValueInRaw = 10;
    let cellsBombValue = 10;
    let currentLocalStorageGameLevel = {
      cellsValueInRaw: String(cellsValueInRaw),
      cellsBombValue: String(cellsBombValue),
    };

    localStorage.setItem(
      'currentGameBoardOption',
      JSON.stringify(currentLocalStorageGameLevel)
    );
  }

  if (gameResults && scoreResults.length === 0) {
    fillScore(gameResults);
  }

  startGameTimer(true, 'offTimer');
}

function saveResultsInScore(win) {
  const LIST_LENGTH = 10;
  let currentClickResult = localStorage.getItem('clickCounter');
  let currentGameTimer = localStorage.getItem('currentGameTimer');

  if (clickScores.length <= LIST_LENGTH - 1) {
    clickScores.push(currentClickResult);
    timerScores.push(currentGameTimer);
    winOrLost.push(win);
  } else {
    clickScores.shift();
    clickScores.push(currentClickResult);
    timerScores.shift();
    timerScores.push(currentGameTimer);
    winOrLost.shift();
    winOrLost.push(win);
  }

  let gameResults = {
    clickScores: clickScores,
    timerScores: timerScores,
    winOrLost: winOrLost,
  };
  let gameResultsString = JSON.stringify(gameResults);
  localStorage.setItem('gameResults', gameResultsString);
  fillScoreContainer(win);
}

function fillScore(gameResults) {
  const SCORE_TABLE = document.querySelector('.score');
  let resultsLength = gameResults.winOrLost.length;

  for (let i = 0; i < resultsLength; i++) {
    const CURRENT_USER_INFO = createElement('div', 'score__user-info');
    const USER_NAME = createElement('div', 'score__user-name');
    const CURRENT_CLICK_VALUE = createElement('div', 'score__clicks');
    const CURRENT_TIMER_VALUE = createElement('div', 'score__timer');

    CURRENT_USER_INFO.append(
      USER_NAME,
      CURRENT_CLICK_VALUE,
      CURRENT_TIMER_VALUE
    );
    SCORE_TABLE.appendChild(CURRENT_USER_INFO);

    USER_NAME.innerHTML = gameResults.winOrLost[resultsLength - i - 1]
      ? 'RS Fighter (Win)'
      : 'RS Fighter (Lost)';
    CURRENT_CLICK_VALUE.innerHTML = gameResults.clickScores[
      resultsLength - i - 1
    ].replace(/["']/g, '');
    CURRENT_TIMER_VALUE.innerHTML =
      gameResults.timerScores[resultsLength - i - 1].replace(/['"]/g, '') + 's';
  }
}

function fillScoreContainer(win) {
  const USER_CLICKS = document.querySelectorAll('.score__clicks');

  if (USER_CLICKS.length < 10) {
    SCORE_TABLE_BOX.prepend(createUserInfoElement(win));
  } else {
    const firstChild = SCORE_TABLE_BOX.firstElementChild;
    if (firstChild) {
      SCORE_TABLE_BOX.removeChild(firstChild);
    }
    SCORE_TABLE_BOX.prepend(createUserInfoElement(win));
  }

  function createUserInfoElement(win) {
    const CURRENT_USER_INFO = createElement('div', 'score__user-info');
    const USER_NAME = createElement('div', 'score__user-name');
    const CURRENT_CLICK_VALUE = createElement('div', 'score__clicks');
    const CURRENT_TIMER_VALUE = createElement('div', 'score__timer');

    CURRENT_USER_INFO.append(
      USER_NAME,
      CURRENT_CLICK_VALUE,
      CURRENT_TIMER_VALUE
    );
    USER_NAME.innerHTML = win ? 'RS Fighter (Win)' : 'RS Fighter (Lost)';
    CURRENT_CLICK_VALUE.innerHTML = clickScores[clickScores.length - 1].replace(
      /["']/g,
      ''
    );
    CURRENT_TIMER_VALUE.innerHTML =
      timerScores[timerScores.length - 1].replace(/['"]/g, '') + 's';

    return CURRENT_USER_INFO;
  }
}

function toggleGameRules() {
  const GAME_RULES = document.querySelector('.rules');
  GAME_RULES.classList.add('is-active');

  setTimeout(() => {
    window.addEventListener('click', closeGameRules);
  }, 0);

  function closeGameRules(event) {
    const rulesElement = document.querySelector('.rules');
    const closeBtn = rulesElement.querySelector('.rules__close-btn');
    const isClickedOnCloseBtn =
      event.target === closeBtn || closeBtn.contains(event.target);
    if (!rulesElement.contains(event.target) || isClickedOnCloseBtn) {
      rulesElement.classList.remove('is-active');
      window.removeEventListener('click', closeGameRules);
      return;
    }
  }
}

function flagsAndBombsLeftCounter() {
  let FLAG_BOMB_COUNTER_CONTAINER = document.querySelector(
    '.bottom-menu__flag-counter'
  );
  let cellsWithFlagClass = document.querySelectorAll(
    '.game-board__cell.initial.flag'
  );
  let flagsValue = document.querySelector('.flag-counter__value');
  let currentGamebombsValue = document.querySelector(
    '.topmenu__bomb-variables'
  );
  let bombsLeft = document.querySelector('.flag-counter__bomb-value');

  if (cellsWithFlagClass.length > 0) {
    FLAG_BOMB_COUNTER_CONTAINER.classList.add('is-active');
    flagsValue.innerHTML = cellsWithFlagClass.length;
    bombsLeft.textContent =
      currentGamebombsValue.value - cellsWithFlagClass.length;
  } else {
    FLAG_BOMB_COUNTER_CONTAINER.classList.remove('is-active');
    flagsValue.innerHTML = '';
    bombsLeft.innerHTML = '';
  }

  if(FLAG_BOMB_COUNTER_CONTAINER.classList.contains('is-active')) {
    let flagsAndBombsCounter = {
      'is-active': 'is-active',
      'flagsCounter': flagsValue.innerHTML,
      'bombsCounter': bombsLeft.innerHTML
    }

    localStorage.setItem('flagAndBombsValue', JSON.stringify(flagsAndBombsCounter))
  } else {
    localStorage.removeItem('flagAndBombsValue')
  }
}

function saveCurrentGameProgress() {
  const gameboardElement = document.querySelector(
    '.minesweeper-game__gameboard'
  );
  const gameboardHTML = gameboardElement.innerHTML;

  localStorage.setItem('gameboard', gameboardHTML);
}

function applyCellBehavior() {
  const gameboardElement = document.querySelector(
    '.minesweeper-game__gameboard'
  );
  const cells = gameboardElement.querySelectorAll('.game-board__cell');
  const cellsInRow = cells.length === 100 ? 10 : cells.length === 225 ? 15 : 25;
  let temporary = [];

  cells.forEach((cell, index) => {
    let cellBombsValue = cell.classList.value.replace(/\D/g, '');

    let hasBomb = false;
    let isOpen = true;
    let cellValue;

    if (cell.classList.contains(`bomb-${cellBombsValue}`)) {
      cellValue = cellBombsValue;
    }

    const coords = {
      x: index % cellsInRow,
      y: Math.floor(index / cellsInRow),
    };
    if (cell.classList.contains('bomb-bomb')) {
      hasBomb = true;
    }
    if (cell.classList.contains('initial')) {
      isOpen = false;
    }

    const restoredCell = restoreCell(hasBomb, isOpen, cell, coords, cellValue);
    temporary.push(restoredCell);
  });

  for (let i = 0; i < cellsInRow * cellsInRow; i += cellsInRow) {
    matrix.push(temporary.slice(i, i + cellsInRow));
  }
}

function removeGameProgress() {
  localStorage.removeItem('gameboard');
  localStorage.removeItem('currentGameTimer');
  localStorage.removeItem('clickCounter');
  localStorage.removeItem('flagAndBombsValue');
}

function restoreGameProgress() {
  let currentClickCounterString = localStorage.getItem('clickCounter');
  let currentTimerCounterString = localStorage.getItem('currentGameTimer');
  let flagsAndBombsValueLocalStorage = JSON.parse(
    localStorage.getItem('flagAndBombsValue')
  );
  let flagBombsContainer = document.querySelector('.flag-counter');
  let flagsCounter = document.querySelector('.flag-counter__value');
  let bombsCounter = document.querySelector('.flag-counter__bomb-value');

  let clickCounterValue = document.querySelector('.bottom-menu__counter');
  clickCounterValue.innerHTML = currentClickCounterString.replace(/["']/g, '');
  let timerValue = document.querySelector('.bottom-menu__timer');
  timerValue.innerHTML = Number(currentTimerCounterString);

  if (flagsAndBombsValueLocalStorage && flagsAndBombsValueLocalStorage.flagsCounter > 0) {
    flagBombsContainer.classList.add('is-active');
    flagsCounter.innerHTML = flagsAndBombsValueLocalStorage.flagsCounter;
    bombsCounter.innerHTML = flagsAndBombsValueLocalStorage.bombsCounter;
  }
}

export {
  toggleHide,
  createElement,
  restartGame,
  saveResultsInScore,
  toggleGameRules,
  flagsAndBombsLeftCounter,
  saveCurrentGameProgress,
  applyCellBehavior,
  removeGameProgress,
  restoreGameProgress,
};
