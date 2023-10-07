import { getAllNearestCells, endOfGame } from './matrix';
import { GAME_BOARD, clickCounter } from './index';
import { showModal } from '../modal';
import {
  saveResultsInScore,
  flagsAndBombsLeftCounter,
  saveCurrentGameProgress,
} from '../reusableFunctions';

let timerStarted = false;
let deleteTimerInterval;
let isSoundEnabled = { value: true };

class Cell {
  constructor(hasBomb, coordinates) {
    this.hasBomb = hasBomb;
    this.coordinates = coordinates;
  }

  setCellValue(value) {
    this.value = value;
  }

  setCellType() {
    if (this.hasBomb) {
      this.setCellValue('bomb');
      return;
    }

    const nearestCells = getAllNearestCells(this.coordinates);
    let countBomb = 0;

    nearestCells.forEach((cell) => {
      if (cell === 1 || cell.hasBomb) {
        countBomb++;
      }
    });

    if (countBomb) {
      this.setCellValue(countBomb);
    }
  }

  visibleCellValue() {
    if (this.hasBomb) {
      this.cellElement.innerHTML = `
        <?xml version="1.0" encoding="utf-8"?>
        <svg class="bomb-svg" fill="currentColor" viewBox="0 -2.5 37 37" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <title>bomb</title>
          <path
            d="M33.228 7.928l3.284 0.464-2.92 1.546 2.117 1.934-3.065-0.387 1.897 3.945-3.795-2.862-3.139 3.79 1.46-4.717-4.599 2.475 3.211-3.48-0.22-0.856c-0.867 0.432-2.095 0.873-3.379 0.822-1.703 0-3.818-1.188-6.345-3.312 0 0-2.861-3.026-5.266-3.026-2.474 0-2.232 3.722-2.229 3.759h2.802v2.532c3.562 1.372 5.969 4.818 5.969 8.865 0 5.25-4.256 9.506-9.506 9.506s-9.505-4.258-9.505-9.508c0-4.046 2.469-7.493 6.031-8.865v-2.532h2.504c-0.003-0.019-0.288-2.744 1.15-4.256 0.767-0.806 1.704-1.209 2.813-1.209 3.337 0 6.332 3.512 6.332 3.512 2.195 1.884 3.985 2.825 5.37 2.825 0.562 0 1.706-0.354 2.294-0.549l-1.807-1.422 3.139 0.231-2.408-3.712 3.941 2.784 0.438-2.63 0.729 2.398 2.92-3.48-0.657 3.867 3.357-0.773-2.918 2.321z"></path>
        </svg>
      `;
    } else {
      this.cellElement.innerHTML = this.value || '';
    }
  }

  setFlag(hasFlagged) {
    this.hasFlagged = hasFlagged;
    this.cellElement.innerHTML = hasFlagged ? '&otimes;' : '';
  }

  open() {
    this.isOpened = true;
    this.cellElement.classList.remove('initial');
    this.visibleCellValue();
    this.isLast();
  }

  onCellClick(couldOpen = false) {
    if (this.hasFlagged || this.cellElement.classList.contains('flag')) {
      return;
    }

    if (!timerStarted) {
      timerStarted = true;
      startGameTimer(false);
    }

    if (this.hasBomb) {
      this.value = `
        <?xml version="1.0" encoding="utf-8"?>
        <svg class="bomb-svg" fill="currentColor" viewBox="0 -2.5 37 37" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <title>bomb</title>
          <path
            d="M33.228 7.928l3.284 0.464-2.92 1.546 2.117 1.934-3.065-0.387 1.897 3.945-3.795-2.862-3.139 3.79 1.46-4.717-4.599 2.475 3.211-3.48-0.22-0.856c-0.867 0.432-2.095 0.873-3.379 0.822-1.703 0-3.818-1.188-6.345-3.312 0 0-2.861-3.026-5.266-3.026-2.474 0-2.232 3.722-2.229 3.759h2.802v2.532c3.562 1.372 5.969 4.818 5.969 8.865 0 5.25-4.256 9.506-9.506 9.506s-9.505-4.258-9.505-9.508c0-4.046 2.469-7.493 6.031-8.865v-2.532h2.504c-0.003-0.019-0.288-2.744 1.15-4.256 0.767-0.806 1.704-1.209 2.813-1.209 3.337 0 6.332 3.512 6.332 3.512 2.195 1.884 3.985 2.825 5.37 2.825 0.562 0 1.706-0.354 2.294-0.549l-1.807-1.422 3.139 0.231-2.408-3.712 3.941 2.784 0.438-2.63 0.729 2.398 2.92-3.48-0.657 3.867 3.357-0.773-2.918 2.321z"></path>
        </svg>
      `;
      this.cellElement.classList.add('loss-game');
      endOfGame();
      startGameTimer(true);
      saveResultsInScore(false);
      showModal(false);
      this.cellSounds('lost');
    } else if (!this.value && !this.isOpened) {
      this.open();
      const nearestCells = getAllNearestCells(this.coordinates);

      nearestCells.forEach((cell) => {
        if (!cell.isOpened) {
          cell.onCellClick(true);
        }
      });
    } else if ((this.value && couldOpen) || typeof this.value === 'number') {
      this.open();
      this.cellSounds('click');
    }

    this.visibleCellValue();

    if (timerStarted) {
      saveCurrentGameProgress();
    }
  }

  createThisCell(isExist = false) {
    if (isExist) {
      this.cellElement.addEventListener('click', () => this.onCellClick());
      this.cellElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (
          !e.target.classList.contains('flag') &&
          e.target.classList.contains('initial')
        ) {
          e.target.classList.add('flag');
          this.setFlag(true);
        } else if (e.target.classList.contains('flag')) {
          e.target.classList.remove('flag');
          this.setFlag(false);
        }
        
        flagsAndBombsLeftCounter();
        saveCurrentGameProgress();
        if (timerStarted) {
          saveCurrentGameProgress();
        }
      });

      return;
    }

    const cellElement = document.createElement('div');
    cellElement.classList.add('game-board__cell', 'initial');

    if (this.value) {
      cellElement.classList.add(`bomb-${this.value}`);
    }

    this.cellElement = cellElement;
    this.cellElement.addEventListener('click', () => this.onCellClick());
    this.cellElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (
        !e.target.classList.contains('flag') &&
        e.target.classList.contains('initial')
      ) {
        e.target.classList.add('flag');
        this.setFlag(true);
      } else if (e.target.classList.contains('flag')) {
        e.target.classList.remove('flag');
        this.setFlag(false);
      }
      flagsAndBombsLeftCounter();

      if (timerStarted) {
        saveCurrentGameProgress();
      }
    });
    GAME_BOARD.appendChild(cellElement);
  }

  isLast() {
    let leftCellsInGame = document.querySelectorAll(
      '.game-board__cell.initial:not(.bomb-bomb)'
    );

    if (leftCellsInGame.length === 0) {
      startGameTimer(true);
      showModal(true);
      clickCounter('win');
      saveResultsInScore(true);
      this.cellSounds('win');
    }
  }

  cellSounds(type) {
    if (!isSoundEnabled.value) {
      return;
    }
    let audio = new Audio();

    switch (type) {
      case 'win':
        audio.src = './win.mp3';
        break;
      case 'lost':
        audio.src = './boom.mp3';
        break;
      case 'click':
        audio.src = './click.mp3';
        break;
    }

    audio.play();
  }
}

function startGameTimer(isWork, anotherCondition) {
  let timerElement = document.querySelector('.bottom-menu__timer');
  let timer = Number(timerElement.innerHTML);

  if (!isWork) {
    clearInterval(deleteTimerInterval);
    deleteTimerInterval = setInterval(() => {
      timer++;
      timerElement.textContent = timer;
    }, 1000);
  } else if (isWork && anotherCondition) {
    clearInterval(deleteTimerInterval);
    timerElement.textContent = '00';
    timerStarted = false;
  } else if (isWork) {
    localStorage.setItem(
      'currentGameTimer',
      JSON.stringify(timerElement.textContent)
    );
    clearInterval(deleteTimerInterval);
    timerElement.textContent = '00';
    timerStarted = false;
  }
}

function createCell(hasBomb, coordinates) {
  const newCell = new Cell(hasBomb, coordinates);
  newCell.setCellType();
  newCell.createThisCell();

  return newCell;
}

function restoreCell(hasBomb, isOpen, element, coords, cellValue) {
  const restoredCell = new Cell(hasBomb, coords);
  restoredCell.cellElement = element;
  restoredCell.setCellType();
  restoredCell.createThisCell(true);
  restoredCell.isOpen = isOpen;
  restoredCell.value = Number(cellValue);

  return restoredCell;
}

export { startGameTimer, createCell, isSoundEnabled, Cell, restoreCell };
