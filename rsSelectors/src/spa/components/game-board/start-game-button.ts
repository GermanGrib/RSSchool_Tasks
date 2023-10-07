import './game-board.scss';
import ElementCreator from '../element-creator';
import { ElementParams } from '../../../models/types';
import {
  GameBoardCss,
  START_BTN_TEXT,
} from './variables-game-board';
import HtmlViewerFieldCreator from '../html-viewer/html-viewer-creator';
import cardInfo from '../../../data/cards';
import state from '../../state/state';
import { cssEditorClasses } from '../css-editor/variables-css-editor';

export default class StartBtn extends ElementCreator {
  constructor() {
    const START_BTN_PARAMS: ElementParams = {
      tag: 'button',
      classNames: GameBoardCss.START_BTN,
      textContent: START_BTN_TEXT,
      callback: () => this.startGame(state.getField('currentGameLevel')),
    };
    super(START_BTN_PARAMS);
  }

  startGame(level: string):void {
    const INDEX_PAGE_BTN = document.querySelector('.nav-item') as HTMLAnchorElement;
    INDEX_PAGE_BTN.click();

    this.setAsyncSettings(Number(level));

    const htmlViewer = new HtmlViewerFieldCreator();
    htmlViewer.currentDeskDOM();
  }

  setSettingsToLevel(gameLevel: number): void {
    switch (gameLevel) {
      case 1: {
        const GAME_TABLE = document.querySelector(`.${GameBoardCss.DESK}`) as HTMLElement;
        GAME_TABLE.id = 'table';
        break;
      }
      case 5: {
        const THIRD_PLATE = document.querySelector(`.${GameBoardCss.PLATE}:nth-child(3)`) as HTMLElement;
        THIRD_PLATE.dataset.attribute = 'orange';
        break;
      }
      case 8: {
        const CHOSE_LEVEL_BTN = document.querySelectorAll('.nav-item')
        CHOSE_LEVEL_BTN.forEach(btn => btn.addEventListener('click', () => document.body.classList.remove(cssEditorClasses.WIN_ELEMENT), {once: true}))
        break
      }
      case 9: {
        const CHOSE_LEVEL_BTN = document.querySelectorAll('.nav-item');
        const FOOTER_CONTAINER = document.querySelector('.footer__container');
        CHOSE_LEVEL_BTN.forEach(btn => btn.addEventListener('click', () => (FOOTER_CONTAINER !== null) ? FOOTER_CONTAINER.classList.remove(cssEditorClasses.WIN_ELEMENT) : false, {once: true}));
        break
      }
      case 10: {
        const SECOND_TOMATO = document.querySelector(`.${GameBoardCss.PLATE}:nth-child(2) .${GameBoardCss.TOMATO}`) as HTMLElement;
        SECOND_TOMATO.id = 'tomato';
        break;
      }
      default: {
        break;
      }
    }
  }

  setWinTargetElementAnimation(gameLevel: number): void {
    if(gameLevel === 6) {
      return
    }
    const currentWinElement = document.querySelectorAll(`${cardInfo[gameLevel - 1].answer[0]}`);
    currentWinElement?.forEach(el=> el.classList.add(cssEditorClasses.WIN_ELEMENT));
  }

  async setAsyncSettings(gameLevel: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.setSettingsToLevel(gameLevel);
    this.setWinTargetElementAnimation(gameLevel);
  }
}
