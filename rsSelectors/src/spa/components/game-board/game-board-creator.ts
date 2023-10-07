import './game-board.scss';
import ElementCreator from '../element-creator';
import { ElementParams, cardInfoType } from '../../../models/types';
import { CONFIRM_TEXT, GameBoardCss, LEVEL_SIX_RIGHT_ANSWER_TEXT, SHOW_TEXT_SOLUTION } from './variables-game-board';
import StartBtn from './start-game-button';
import state from '../../state/state';
import cardInfo from '../../../data/cards';
import cssEditorCreator from '../css-editor/css-editor-creator';

const gameBoardParams: ElementParams = {
  tag: 'div',
  classNames: [GameBoardCss.CONTAINER],
  textContent: '',
  callback: null,
};
export default class GameBoardCreator extends ElementCreator {
  answerExplanationModal: HTMLElement;
  button: HTMLElement;
  desk: HTMLElement;
  plate: HTMLElement;
  tomato: HTMLElement;
  apple: HTMLElement;
  orange: HTMLElement;
  peach: HTMLElement;
  startBtn: HTMLElement;

  constructor() {
    super(gameBoardParams);
    this.answerExplanationModal = document.createElement('div');
    this.button = document.createElement('button');
    this.desk = document.createElement('div');
    this.plate = document.createElement('div');
    this.tomato = document.createElement('div');
    this.apple = document.createElement('div');
    this.orange = document.createElement('div');
    this.peach = document.createElement('div');
    this.startBtn = document.createElement('button');
    this.configureView();
  }

  configureView(): void {
    const answerExplanationModalParams: ElementParams = {
      tag: 'div',
      classNames: GameBoardCss.ANSWER_MODAL,
      textContent: '',
      callback: null,
    };
    const btnSurrenderParams: ElementParams = {
      tag: 'button',
      classNames: GameBoardCss.SOLUTION_BTN,
      textContent: SHOW_TEXT_SOLUTION,
      callback: this.showSolution.bind(this),
    };
    const deskParams: ElementParams = {
      tag: 'div',
      classNames: [GameBoardCss.DESK],
      textContent: '',
      callback: null,
    };
    const plateParams: ElementParams = {
      tag: 'div',
      classNames: [GameBoardCss.PLATE],
      textContent: '',
      callback: null,
    };
    const tomatoParams: ElementParams = {
      tag: 'div',
      classNames: [GameBoardCss.TOMATO],
      textContent: '',
      callback: null,
    };
    const appleParams: ElementParams = {
      tag: 'div',
      classNames: [GameBoardCss.APPLE],
      textContent: '',
      callback: null,
    };
    const orangeParams: ElementParams = {
      tag: 'div',
      classNames: [GameBoardCss.ORANGE],
      textContent: '',
      callback: null,
    };
    const peachParams: ElementParams = {
      tag: 'div',
      classNames: [GameBoardCss.PEACH],
      textContent: '',
      callback: null,
    };

    this.answerExplanationModal = new ElementCreator(
      answerExplanationModalParams
    ).getElement() as HTMLElement;
    this.button = new ElementCreator(
      btnSurrenderParams
    ).getElement() as HTMLElement;
    this.desk = new ElementCreator(deskParams).getElement() as HTMLElement;
    this.startBtn = new StartBtn().getElement() as HTMLElement;

    for (let i = 0; i < 4; i++) {
      this.plate = new ElementCreator(plateParams).getElement() as HTMLElement;
      this.tomato = new ElementCreator(
        tomatoParams
      ).getElement() as HTMLElement;
      this.apple = new ElementCreator(appleParams).getElement() as HTMLElement;
      this.orange = new ElementCreator(
        orangeParams
      ).getElement() as HTMLElement;
      this.peach = new ElementCreator(peachParams).getElement() as HTMLElement;
      this.plate.append(this.tomato, this.apple, this.orange, this.peach);
      this.desk.appendChild(this.plate);
    }

    if (this.element) {
      this.element.append(
        this.answerExplanationModal,
        this.button,
        this.desk,
        this.startBtn
      );
    }
  }

  showSolution(): void {
    const cssEditor = new cssEditorCreator()
    const htmlBodyElement = document.querySelector('.html-viewer__body') as HTMLElement;
    const ANSWER_INPUT = document.querySelector('.css-editor__text-solution') as HTMLInputElement;
    const ANSWER_TEXT_LENGTH = ANSWER_INPUT.value?.length;
    const currentLevel = state.getField('currentGameLevel');
    let currentRightAnswer = cardInfo[Number(currentLevel) - 1].answer[0];
    let isGameStart = htmlBodyElement.innerHTML.length > 0;
    let index = 0;
    ANSWER_INPUT.addEventListener('input', cssEditor.paintTextInElement)

    if (currentLevel === '6') {
      currentRightAnswer = LEVEL_SIX_RIGHT_ANSWER_TEXT;
    }

    if (ANSWER_TEXT_LENGTH) {
      if (
        ANSWER_TEXT_LENGTH > 0 &&
        ANSWER_TEXT_LENGTH < currentRightAnswer.length
      ) {
        return;
      }
    }

    ANSWER_INPUT.value = '';
    if (isGameStart) {
      if (confirm(CONFIRM_TEXT)) {
        this.showAnswerExplanation(currentLevel);
        const printChar = () => {
          if (index < currentRightAnswer.length) {
            const char = currentRightAnswer.charAt(index);
            ANSWER_INPUT.value += char;
            index++;
            cssEditor.paintTextInElement()
            setTimeout(printChar, 50);
          }
        };
        this.addToStateWinWithHelp();
        printChar();
      } else {
        return;
      }
    }
  }

  addToStateWinWithHelp(): void {
    let currentLevel = Number(state.getField('currentGameLevel')) - 1;
    let currentData: cardInfoType[] = JSON.parse(state.getField('cardsData'));
    currentData[currentLevel].passedWithHelp = 'true';
    state.setField('cardsData', JSON.stringify(currentData));
  }

  showAnswerExplanation(currentLevel: string): void {
    const currentRightExplanation = cardInfo[Number(currentLevel) - 1].explanation.split('.');
    this.answerExplanationModal.classList.add(GameBoardCss.SHOW_MODAL);
    this.answerExplanationModal.innerHTML = currentRightExplanation.join('<br>');
  
    event?.stopPropagation()
    document.addEventListener('click', this.removerExplanationModal, {once: true})
  }

  removerExplanationModal():void {
    const EXPLANATION_MODAL = document.querySelector('.game-board__answer-modal.show-modal')

    if(EXPLANATION_MODAL) {
      EXPLANATION_MODAL.classList.remove(GameBoardCss.SHOW_MODAL)
    }
  }

}
