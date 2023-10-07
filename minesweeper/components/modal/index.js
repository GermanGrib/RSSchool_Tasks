import './modal.scss';
import {
  createElement,
  removeGameProgress,
  restartGame,
  toggleGameRules,
} from '../reusableFunctions';

// MODAL END GAME ---------------- START ----------------------
const CONTAINER_BACKGROUND = createElement('div', 'modal-background');
const CONTAINER = createElement('div', 'game-over');
const IMG = createElement('div', 'game-over__image');
const TEXT = createElement('div', 'game-over__textbox');
const BTNS_CONTAINER = createElement('div', 'game-over__buttons');
const RESTART_BTN = createElement(
  'div',
  'game-over__buttons-restart',
  'Restart game'
);
const RULES_BTN = createElement(
  'div',
  'game-over__buttons-rules',
  'Read rules'
);

CONTAINER_BACKGROUND.appendChild(CONTAINER);
BTNS_CONTAINER.append(RESTART_BTN, RULES_BTN);
CONTAINER.append(IMG, TEXT, BTNS_CONTAINER);

function fillTextAndImg(isWin) {
  switch (true) {
    case isWin:
      {
        IMG.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50px" height="50px" viewBox="0 0 1280.000000 1242.000000" preserveAspectRatio="xMidYMid meet">
    <metadata>
    Created by potrace 1.15, written by Peter Selinger 2001-2017
    </metadata>
    <g transform="translate(0.000000,1242.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
    <path d="M6010 12080 c-14 -4 -144 -9 -290 -9 -146 -1 -332 -6 -415 -11 -82 -6 -204 -13 -270 -16 -150 -7 -667 -50 -840 -70 -71 -8 -168 -18 -215 -23 -47 -5 -114 -14 -150 -20 -68 -11 -172 -27 -275 -41 -101 -15 -369 -61 -490 -84 -202 -39 -552 -118 -596 -135 -19 -7 -41 1 -114 40 -146 77 -300 129 -500 165 -144 27 -537 27 -645 1 -258 -63 -431 -157 -586 -320 -180 -188 -252 -368 -261 -652 -8 -254 45 -490 183 -802 209 -475 567 -972 1140 -1583 245 -261 374 -387 772 -753 29 -26 52 -54 52 -62 0 -8 -13 -38 -29 -67 -82 -153 -83 -352 -3 -503 39 -72 155 -184 227 -219 191 -93 406 -68 573 64 59 47 133 154 159 228 10 28 21 52 26 52 5 0 20 -28 35 -63 46 -108 237 -488 305 -603 482 -830 1118 -1438 1914 -1826 101 -50 183 -94 183 -98 0 -5 -10 -12 -22 -15 -13 -4 -38 -21 -55 -38 -61 -57 -36 -116 70 -166 34 -16 86 -34 115 -41 57 -13 65 -29 28 -54 -34 -22 -127 -139 -164 -207 -48 -87 -89 -223 -101 -335 -32 -297 89 -601 299 -757 89 -65 91 -67 85 -77 -3 -5 -27 -12 -53 -15 -175 -24 -312 -97 -312 -165 0 -53 85 -111 206 -141 25 -7 48 -18 51 -26 4 -9 -17 -38 -53 -74 -120 -122 -314 -228 -504 -274 -241 -58 -514 -146 -685 -221 -16 -7 -70 -29 -120 -50 -98 -40 -416 -194 -505 -244 -397 -225 -610 -410 -663 -579 -24 -77 -25 -372 0 -396 63 -64 567 -213 933 -276 144 -25 244 -41 340 -54 58 -8 155 -21 215 -30 807 -112 1540 -135 2280 -69 304 26 432 42 800 99 50 8 122 19 160 25 39 5 93 15 120 20 28 5 97 19 155 30 331 63 748 190 812 248 16 13 18 36 18 197 0 112 -4 195 -12 216 -56 164 -287 360 -688 582 -185 103 -362 184 -695 319 -79 33 -422 143 -505 163 -267 63 -419 138 -565 276 -83 80 -93 104 -42 114 97 20 202 80 213 124 4 13 0 37 -9 55 -24 51 -157 109 -299 131 -40 6 -52 30 -20 42 51 19 174 130 225 203 105 149 152 306 152 505 0 141 -16 228 -62 345 -35 88 -122 218 -184 274 -58 52 -59 71 -2 82 60 11 158 59 181 89 38 48 24 97 -38 133 -22 12 -40 27 -40 32 0 6 39 28 88 51 387 179 694 378 1027 664 218 188 460 450 654 710 77 102 296 434 314 475 4 8 15 29 25 45 78 129 274 520 291 582 11 40 25 30 59 -42 24 -50 54 -89 106 -141 108 -105 221 -154 361 -154 211 1 382 108 479 299 33 63 46 126 46 221 0 110 -16 179 -59 255 -17 30 -31 61 -31 68 0 7 46 56 103 108 807 740 1379 1405 1706 1979 45 78 153 295 179 360 13 30 27 64 32 75 27 63 85 261 112 380 18 84 18 444 -1 505 -74 241 -127 335 -272 476 -148 144 -310 228 -559 290 -107 27 -500 27 -640 1 -242 -46 -435 -115 -557 -198 -44 -31 -72 -36 -90 -18 -11 11 -53 20 -248 54 -44 8 -120 21 -170 30 -223 40 -617 102 -820 129 -432 58 -625 80 -985 116 -104 10 -320 27 -455 35 -38 3 -92 7 -120 10 -27 3 -122 7 -210 10 -88 3 -168 9 -179 12 -10 3 -199 9 -420 15 -220 5 -466 11 -546 13 -80 2 -156 0 -170 -5z m-4325 -731 c4 -5 0 -18 -7 -27 -35 -41 -89 -144 -114 -217 -24 -72 -27 -95 -27 -220 -1 -157 10 -208 71 -332 88 -179 256 -318 457 -378 84 -26 296 -26 380 -2 129 38 236 99 332 190 24 22 34 27 37 16 2 -8 7 -79 10 -159 4 -80 11 -185 16 -235 5 -49 14 -139 20 -200 26 -266 31 -308 66 -535 35 -232 120 -667 152 -785 7 -22 21 -78 33 -125 45 -181 78 -296 125 -439 13 -41 21 -77 18 -80 -3 -3 -28 7 -57 23 -98 53 -787 757 -1112 1135 -202 235 -427 517 -527 661 -126 183 -161 236 -235 360 -163 273 -252 487 -288 689 -18 104 -18 157 -1 236 48 223 209 348 536 416 105 21 107 21 115 8z m9556 -4 c202 -37 375 -117 457 -211 90 -101 125 -242 103 -411 -7 -54 -19 -118 -27 -143 -38 -122 -47 -147 -59 -175 -8 -16 -21 -48 -30 -70 -48 -114 -154 -308 -259 -470 -300 -466 -765 -1015 -1420 -1674 -280 -282 -375 -366 -393 -347 -5 5 23 106 57 206 14 41 95 349 115 435 9 44 23 105 30 135 87 375 165 897 201 1335 3 44 7 89 8 100 1 11 6 84 10 163 5 79 13 142 18 142 6 0 29 -17 53 -37 64 -57 145 -102 242 -136 81 -28 99 -31 223 -31 154 -1 201 10 338 78 126 62 249 182 309 301 64 127 83 204 83 340 0 60 -5 128 -11 150 -5 22 -14 56 -19 76 -11 44 -71 160 -105 205 -26 34 -32 54 -16 54 5 0 46 -7 92 -15z"/>
    </g>
    </svg>`;
        TEXT.innerHTML = 'Omg You are SO Awesome!';
      }
      break;
    case !isWin: {
      IMG.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
      <defs>
      </defs>
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(236,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      </g>
    </svg>
    `;
      TEXT.innerHTML = `Don't worry, you can read the rules and start again`;
    }
  }
}

function showModal(isWin) {
  fillTextAndImg(isWin);
  CONTAINER_BACKGROUND.classList.add('show');
  document.body.style.overflow = 'hidden';
  BTNS_CONTAINER.addEventListener('click', chooseOption);
}

function chooseOption() {
  let clickCounter = document.querySelector('.bottom-menu__counter');
  document.body.style.overflow = 'auto';
  CONTAINER_BACKGROUND.classList.remove('show');
  if (event.target.classList.contains('game-over__buttons-restart')) {
    removeGameProgress()
    restartGame();
    clickCounter.innerHTML = '0';
  } else if (event.target.classList.contains('game-over__buttons-rules')) {
    removeGameProgress()
    clickCounter.innerHTML = '0';
    toggleGameRules();
    restartGame();
  }
}

// MODAL END GAME ---------------- END ----------------------

// MODAL SCORE ------------ START ---------------------

const SCORE_CONTAINER = createElement('div', 'score');
const SCORE_TITLE = createElement('div', 'score__title', 'Last 10 results');
const ROWS_TITLES = createElement('div', ['score__rows', 'rows']);
const FIRST_ROW = createElement('div', 'rows__first', 'Name');
const SECOND_ROW = createElement('div', 'rows__second', 'Clicks');
const THIRD_ROW = createElement('div', 'rows__third', 'Timer');
const CLOSE_BTN = createElement('div', 'score__close-btn');
const CLOSE_BTN_LINE = createElement('span', 'score__close-btn--line');
const CLOSE_BTN_LINE_SECOND = createElement('span', 'score__close-btn--line');
const SCORE_TABLE_BOX = createElement('div', 'score__table-box');
CLOSE_BTN.append(CLOSE_BTN_LINE, CLOSE_BTN_LINE_SECOND);
SCORE_CONTAINER.appendChild(CLOSE_BTN);
ROWS_TITLES.append(FIRST_ROW, SECOND_ROW, THIRD_ROW);
SCORE_CONTAINER.append(SCORE_TITLE, ROWS_TITLES, SCORE_TABLE_BOX);

CLOSE_BTN.addEventListener('click', toggleScoreTable);

function toggleScoreTable() {
  SCORE_CONTAINER.classList.add('is-active');

  if (!window._scoreCloseHandlerAdded) {
    setTimeout(() => {
      window.addEventListener('click', closeScore);
      window._scoreCloseHandlerAdded = true;
    }, 0);
  }

  function closeScore(event) {
    const scoreElement = document.querySelector('.score');
    const closeBtn = scoreElement.querySelector('.score__close-btn');
    const isClickedOnCloseBtn =
      event.target === closeBtn || closeBtn.contains(event.target);

    if (!scoreElement.contains(event.target) || isClickedOnCloseBtn) {
      scoreElement.classList.remove('is-active');
      window.removeEventListener('click', closeScore);
      window._scoreCloseHandlerAdded = false;
    }
  }
}

// MODAL SCORE ------------ END ---------------------

// MODAL RULES ------------ START ---------------------

const RULES_CONTAINER = createElement('div', 'rules');
const RULES_TITLE = createElement('div', 'rules__title', 'Game rules');
const RULES_TEXT = createElement(
  'div',
  'rules__text',
  `
The goal of Minesweeper is to uncover all the cells on the game board that do not contain mines.
The game board is a grid of cells, and some of these cells contain hidden mines.
To uncover a cell, you can left-click on it.
If you uncover a cell with a mine, you lose the game.
If you uncover a cell without a mine, the cell will display a number indicating how many mines are adjacent to it.
Use the numbers as clues to determine the locations of the mines. For example, if a cell displays the number 3, it means that there are 3 mines adjacent to that cell.
To help you keep track of potential mine locations, you can right-click on a cell to flag it as a mine. This can prevent accidental left-clicks on those cells.
Continue uncovering cells and flagging potential mines until you have uncovered all the safe cells on the board.
If you successfully uncover all the safe cells without hitting a mine, you win the game!
`
);
const RULES_CLOSE_BTN = createElement('div', 'rules__close-btn');
const RULES_CLOSE_BTN_LINE = createElement('span', 'rules__close-btn--line');
const RULES_CLOSE_BTN_LINE_SECOND = createElement(
  'span',
  'rules__close-btn--line'
);

RULES_CLOSE_BTN.append(RULES_CLOSE_BTN_LINE, RULES_CLOSE_BTN_LINE_SECOND);
RULES_CONTAINER.append(RULES_TITLE, RULES_TEXT, RULES_CLOSE_BTN);

RULES_CLOSE_BTN.addEventListener('click', toggleGameRules);

// MODAL RULES ------------ END ---------------------

export {
  CONTAINER_BACKGROUND as GAME_OVER_MODAL,
  showModal,
  SCORE_CONTAINER,
  SCORE_TABLE_BOX,
  toggleScoreTable,
  RULES_CONTAINER,
};
