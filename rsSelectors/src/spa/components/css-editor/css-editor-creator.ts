import 'prismjs/themes/prism.css';
import './css-editor.scss';
import ElementCreator from '../element-creator';
import { ElementParams, cardInfoType } from '../../../models/types';
import {
  cssEditorClasses,
  RULES_TEXT,
  EDITOR_TITLE,
  CONFIRM_BTN_TEXT,
  HELP_DEFAULT_TEXT,
  WIN_MESSAGE,
  CONFIRM_FORM_NAME,
} from './variables-css-editor';
import cardInfo from '../../../data/cards';
import state from '../../state/state';
import StartBtn from '../game-board/start-game-button';
import Prism from 'prismjs';


const cssEditorParams: ElementParams = {
  tag: 'div',
  classNames: [cssEditorClasses.CONTAINER],
  textContent: '',
  callback: null,
};

export default class cssEditorCreator extends ElementCreator {
  title: HTMLElement;
  body: HTMLElement;
  input: HTMLTextAreaElement;
  form: HTMLElement;
  cssColorCode: HTMLElement;
  button: HTMLButtonElement;
  utilsContainer: HTMLElement;
  gameTaskIcon: HTMLElement;
  gameTaskText: HTMLElement;
  rules: HTMLElement;

  constructor() {
    super(cssEditorParams);
    this.title = document.createElement('h3');
    this.body = document.createElement('div');
    this.form = document.createElement('form');
    this.cssColorCode = document.createElement('div')
    this.input = document.createElement('textarea');
    this.button = document.createElement('button');
    this.utilsContainer = document.createElement('div');
    this.gameTaskIcon = document.createElement('div');
    this.gameTaskText = document.createElement('div');
    this.rules = document.createElement('div');
    this.configureView();
  }

  configureView(): void {
    const titleParams: ElementParams = {
      tag: 'h3',
      classNames: [cssEditorClasses.TITLE],
      textContent: EDITOR_TITLE,
      callback: null,
    };
    const bodyParams: ElementParams = {
      tag: 'div',
      classNames: [cssEditorClasses.BODY],
      textContent: '',
      callback: null,
    };
    const formParams: ElementParams = {
      tag: 'form',
      classNames: [cssEditorClasses.FORM],
      textContent: '',
      callback: () => this.checkAnswer.bind(this),
    };

    const cssColorCodeParams: ElementParams = {
      tag: 'div',
      classNames: cssEditorClasses.COLOR_CODE,
      textContent: '',
      callback: null,
    };
    const inputParams: ElementParams = {
      tag: 'textarea',
      classNames: cssEditorClasses.EDITOR_INPUT,
      textContent: '',
      callback: null,
    };
    const buttonParams: ElementParams = {
      tag: 'button',
      classNames: cssEditorClasses.SOLUTION_BTN,
      textContent: CONFIRM_BTN_TEXT,
      callback: (event) => this.checkAnswer(event as Event),
    };
    const utilsParams: ElementParams = {
      tag: 'div',
      classNames: cssEditorClasses.UTILS_CONTAINER,
      textContent: '',
      callback: null,
    };
    const taskIconParams: ElementParams = {
      tag: 'div',
      classNames: [cssEditorClasses.TASK_ICON],
      textContent: '?',
      callback: null,
    };
    const taskTextParams: ElementParams = {
      tag: 'div',
      classNames: [cssEditorClasses.TASK_TEXT],
      textContent: '',
      callback: null,
    };
    const rulesParams: ElementParams = {
      tag: 'div',
      classNames: [cssEditorClasses.RULES],
      textContent: RULES_TEXT,
      callback: null,
    };

    this.title = new ElementCreator(titleParams).getElement() as HTMLElement;
    this.body = new ElementCreator(bodyParams).getElement() as HTMLElement;
    this.form = new ElementCreator(formParams).getElement() as HTMLElement;
    this.form.setAttribute('form', CONFIRM_FORM_NAME);
    this.input = new ElementCreator(inputParams).getElement() as HTMLTextAreaElement;
    this.cssColorCode = new ElementCreator(cssColorCodeParams).getElement() as HTMLElement;
    this.input.focus();
    this.input.setAttribute('form', CONFIRM_FORM_NAME);
    this.input.placeholder = 'Add your CSS Selector here';
    this.input.maxLength = 100;
    this.input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.checkAnswer(event);
      }
    });
    this.input.addEventListener('input', () => this.paintTextInElement())
    this.button = new ElementCreator(buttonParams).getElement() as HTMLButtonElement;
    this.button.type = 'submit';
    this.button.setAttribute('form', CONFIRM_FORM_NAME);
    this.utilsContainer = new ElementCreator(utilsParams).getElement() as HTMLElement;
    this.gameTaskIcon = new ElementCreator(taskIconParams).getElement() as HTMLElement;
    this.gameTaskIcon.addEventListener('mouseenter',this.toggleGameTask.bind(this));
    this.gameTaskIcon.addEventListener('mouseleave',this.toggleGameTask.bind(this));
    this.gameTaskText = new ElementCreator(taskTextParams).getElement() as HTMLElement;
    this.rules = new ElementCreator(rulesParams).getElement() as HTMLElement;

    this.utilsContainer.append(this.gameTaskIcon, this.gameTaskText);
    this.form.append(this.cssColorCode, this.input, this.button, this.utilsContainer);
    this.body.append(this.form, this.rules);
    this.element?.append(this.title, this.body);
  }

  checkAnswer(event: Event): void {
    event.preventDefault();
  
    const viewerHTMLCode = document.querySelector('.html-viewer__body') as HTMLElement;
    const htmlCodeLength = viewerHTMLCode.textContent?.length;
    const inputValue = this.input.value;
    const currentGameLevel = Number(state.getField('currentGameLevel'));
    let currentLocalLevelData: cardInfoType[] = JSON.parse(state.getField('cardsData'));
  
    if (htmlCodeLength) {
      if (htmlCodeLength > 0) {
        if (currentGameLevel === 6) {
          this.checkFinalLevelAnswer(inputValue, currentGameLevel, currentLocalLevelData);
          return;
        }
  
        const currentWinElement = document.querySelectorAll(`${cardInfo[currentGameLevel - 1].answer[0]}`);
        const isCorrectAnswer = cardInfo[currentGameLevel - 1].answer.includes(inputValue);
  
        if (!isCorrectAnswer) {
          this.handleWrongAnswer();
        } else if (isCorrectAnswer) {
          this.handleCorrectAnswer(currentWinElement, currentGameLevel, currentLocalLevelData);
        }
      }
    }
  }
  
  checkFinalLevelAnswer(inputValue: string, currentGameLevel: number, currentLocalLevelData: cardInfoType[]): void {
    const regex = /^.{5,}$/;
    const isCorrectAnswer = regex.test(inputValue);
  
    if (!isCorrectAnswer) {
      this.handleWrongAnswer();
    } else {
      const bodyElement = document.querySelectorAll('body');
      currentLocalLevelData[currentGameLevel - 1].levelPassed = 'true';
      state.setField('cardsData', JSON.stringify(currentLocalLevelData));
      state.setField('currentGameLevel', String(currentGameLevel + 1));
      this.handleCorrectAnswer(bodyElement, currentGameLevel, currentLocalLevelData);
      this.handleNextLevelStart();
    }
  }
  
  handleWrongAnswer(): void {
    this.body.classList.add(cssEditorClasses.WRONG_ANSWER);
    setTimeout(() => {
      this.body.classList.remove(cssEditorClasses.WRONG_ANSWER);
    }, 1000);
  }
  
  handleCorrectAnswer(currentWinElement:NodeListOf<Element>, currentGameLevel: number, currentLocalLevelData: cardInfoType[]): void {
    currentWinElement.forEach(el=> el.classList.add(cssEditorClasses.RIGHT_ANSWER));
    currentWinElement.forEach(el=> el.classList.remove(cssEditorClasses.WIN_ELEMENT));
    // currentWinElement.classList.remove(cssEditorClasses.WIN_ELEMENT);
    currentLocalLevelData[currentGameLevel - 1].levelPassed = 'true';
    state.setField('cardsData', JSON.stringify(currentLocalLevelData));
    state.setField('currentGameLevel', String(currentGameLevel + 1));
    const isGameDone = currentLocalLevelData.every((item: cardInfoType) => {
      return item.levelPassed === 'true';
    });
  
    if (isGameDone) {
      if (confirm(WIN_MESSAGE)) {
        state.setField('cardsData', JSON.stringify(state.filterFields(cardInfo)));
        state.setField('currentGameLevel', '1');
        this.handleNextLevelStart();
      } else {
        this.input.value = '';
        currentWinElement.forEach(el=> el.classList.add(cssEditorClasses.RIGHT_ANSWER));
        currentWinElement.forEach(el=> el.classList.remove(cssEditorClasses.WIN_ELEMENT));
        // currentWinElement.classList.remove(cssEditorClasses.WIN_ELEMENT);
        currentLocalLevelData[currentGameLevel - 1].levelPassed = 'true';
        state.setField('cardsData', JSON.stringify(currentLocalLevelData));
      }
    }
  
    setTimeout(():void => {
      this.input.value = '';
      currentWinElement.forEach(el=>el.classList.remove(cssEditorClasses.RIGHT_ANSWER));
      this.handleNextLevelStart();
    }, 2000);
  }
  
  handleNextLevelStart(): void {
    let currentLevel =  String(state.getField('currentGameLevel'))
    const newGame = new StartBtn();
    if(currentLevel === String(cardInfo.length + 1)) {
      state.setField('currentGameLevel', '1');
      newGame.startGame('1');
    } else {
      newGame.startGame(currentLevel);
    }

  }

  toggleGameTask(event: Event): void {
    const htmlViewer = document.querySelector('.html-viewer__body') as HTMLDivElement;

    if(htmlViewer && htmlViewer.textContent) {
      const gameIsStart = htmlViewer.textContent.length > 0;

      if(gameIsStart) {
        if (event.type === 'mouseenter') {
          let currentLevel = state.getField('currentGameLevel');
          let currentTask = cardInfo[Number(currentLevel) - 1].task;
          this.gameTaskText.classList.add(cssEditorClasses.SHOW_TASK);
          this.gameTaskText.textContent = currentTask;
        } else {
          this.gameTaskText.classList.remove(cssEditorClasses.SHOW_TASK);
          this.gameTaskText.textContent = '';
        }
      }
    } else {
      if (event.type === 'mouseenter') {
        this.gameTaskText.classList.add(cssEditorClasses.SHOW_TASK);
        this.gameTaskText.textContent = HELP_DEFAULT_TEXT;
      } else {
        this.gameTaskText.classList.remove(cssEditorClasses.SHOW_TASK);
        this.gameTaskText.textContent = '';
      }
    }
  }

  paintTextInElement() {
    const textOutElement = document.querySelector('.css-editor__color-code') as HTMLElement
    const inputTextareaEl = document.querySelector('.css-editor__text-solution') as HTMLTextAreaElement
    if(inputTextareaEl) {
      let textareaValue = inputTextareaEl.value
      const prismCode = Prism.highlight(textareaValue, Prism.languages.javascript, 'javascript')
      if(textOutElement) {
        textOutElement.innerHTML= prismCode
      }
    }

  }
}
