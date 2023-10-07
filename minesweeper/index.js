import './styles/styles.scss';
import HEADER from './components/header';
import { BURGER_ICON } from './components/burger';
import { SECTION_GAME } from './components/minesweepergame';
import { FOOTER, toggleMode } from './components/footer';
import './components/minesweepergame/cell';
import './components/modal';
import { GAME_OVER_MODAL, RULES_CONTAINER, SCORE_CONTAINER } from './components/modal';
import { restartGame } from './components/reusableFunctions';

const BODY = document.body;
const isDarkMode = localStorage.getItem('darkMode')

BODY.append(HEADER, SECTION_GAME, FOOTER, GAME_OVER_MODAL, SCORE_CONTAINER, RULES_CONTAINER);
const HEADER_CONTAINER = document.querySelector('.header__container');
HEADER_CONTAINER.appendChild(BURGER_ICON);

if (isDarkMode) {
  BODY.classList.add('is-moon');
  toggleMode();
}

restartGame();
