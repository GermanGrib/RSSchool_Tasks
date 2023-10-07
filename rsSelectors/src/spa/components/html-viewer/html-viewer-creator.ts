import 'prismjs/themes/prism.css';
import './html-viewer.scss';
import ElementCreator from '../element-creator';
import { ElementParams } from '../../../models/types';
import { HtmlViewerFieldCssClasses, TITLE_TEXT, paddingClasses } from './variables-viewer-html';
import Prism from 'prismjs';
import { GameBoardCss } from '../game-board/variables-game-board';
import { cssEditorClasses } from '../css-editor/variables-css-editor';

const htmlViewParams: ElementParams = {
  tag: 'div',
  classNames: [HtmlViewerFieldCssClasses.CONTAINER],
  textContent: '',
  callback: null,
};

export default class HtmlViewerFieldCreator extends ElementCreator {
  title: HTMLElement;
  body: HTMLElement;

  constructor() {
    super(htmlViewParams);
    this.title = document.createElement('h3');
    this.body = document.createElement('div');
    this.configureView();
  }

  configureView(): void {
    const titleParams: ElementParams = {
      tag: 'h3',
      classNames: [HtmlViewerFieldCssClasses.CONTAINER_TITLE],
      textContent: TITLE_TEXT,
      callback: null,
    };
    const bodyParams: ElementParams = {
      tag: 'div',
      classNames: [HtmlViewerFieldCssClasses.CONTAINER_BODY],
      textContent: '',
      callback: null,
    };

    this.title = new ElementCreator(titleParams).getElement() as HTMLElement;
    this.body = new ElementCreator(bodyParams).getElement() as HTMLElement;

    this.element?.append(this.title, this.body);
  }

  currentDeskDOM(): void {
    setTimeout(() => {
      const htmlViewrBody: HTMLElement[] = [];
      const boardDesk = document.querySelector(`.${GameBoardCss.DESK}`) as HTMLElement;
      const htmlViewerBody = document.querySelector(`.${HtmlViewerFieldCssClasses.CONTAINER_BODY}`) as HTMLElement;
      let matchCounter = 1;

      function createDivElement(boardDeskNodes: HTMLElement, matchCounter: number): HTMLElement {
        let divCSS = '';
        if (boardDeskNodes.classList.contains(GameBoardCss.DESK)) {
          divCSS = paddingClasses.NO_PADDING;
        } else if (boardDeskNodes.classList.contains(GameBoardCss.PLATE)) {
          divCSS = paddingClasses.FIRST_PADDING_LVL;
        } else if (
          boardDeskNodes.classList.contains(GameBoardCss.TOMATO) ||
          boardDeskNodes.classList.contains(GameBoardCss.APPLE) ||
          boardDeskNodes.classList.contains(GameBoardCss.ORANGE) ||
          boardDeskNodes.classList.contains(GameBoardCss.PEACH)
        ) {
          divCSS = paddingClasses.SECOND_PADDING_LVL;
        }
      
        const clone = boardDeskNodes.cloneNode(false) as HTMLElement;
        const outerHTML = clone.outerHTML.replace(cssEditorClasses.WIN_ELEMENT, '');
        const divParams: ElementParams = {
          tag: 'div',
          classNames: [divCSS],
          textContent: outerHTML,
          callback: null,
        };
      
        const div = new ElementCreator(divParams).getElement() as HTMLElement;
        div.dataset.match = String(matchCounter);
        boardDeskNodes.dataset.match = String(matchCounter);
      
        return div;
      }
      
      function addEventListeners(boardDeskNodes: HTMLElement, div: HTMLElement): void {
        div.addEventListener('mouseover', (event) => addActiveCondition(event, boardDeskNodes));
        div.addEventListener('mouseout', (event) => removeActiveCondition(event, boardDeskNodes));
      
        boardDeskNodes.addEventListener('mouseover', (event) => addHoverMirror(event, div));
        boardDeskNodes.addEventListener('mouseout', (event) => removeHoverMirror(event, div));
      }
      
      function buildElementTreeWithListeners(boardDeskNodes: HTMLElement, matchCounter: number): void {
        const div = createDivElement(boardDeskNodes, matchCounter);
        if(div.textContent) {
          const prismCode = Prism.highlight(div.textContent, Prism.languages.javascript, 'javascript')
          div.innerHTML = prismCode
        }
        htmlViewrBody.push(div);
    
        const children = boardDeskNodes.children;
      
        for (let i = 0; i < children.length; i++) {
          matchCounter += 1;
          const child = children[i] as HTMLElement;
          buildElementTreeWithListeners(child, matchCounter);
        }
      
        addEventListeners(boardDeskNodes, div);
      }

      if (boardDesk) {
        buildElementTreeWithListeners(boardDesk, matchCounter);
      }

      for (let element of htmlViewrBody) {
        htmlViewerBody.appendChild(element);
      }

    }, 1000);

    function addActiveCondition(event: Event, deskElement: HTMLElement): void {
      const target = event.target as HTMLElement;
      if (target) {
        togglePopup(event, true, deskElement);
        deskElement.classList.add(HtmlViewerFieldCssClasses.HOVERED);
      }
    }

    function removeActiveCondition(event: Event, deskElement: HTMLElement): void {
      const target = event.target as HTMLElement;
      if (target) {
        togglePopup(event, true, deskElement);
        deskElement.classList.remove(HtmlViewerFieldCssClasses.HOVERED);
      }
    }

    function addHoverMirror(event: Event, htmlViewerEl: HTMLElement): void {
      event.stopPropagation()
      const target = event.target as HTMLElement;
      if (target) {
        togglePopup(event, false, htmlViewerEl);
        htmlViewerEl.classList.add(HtmlViewerFieldCssClasses.HOVERED);
        const childElements = htmlViewerEl.querySelectorAll('*');
        childElements.forEach((element) => element.classList.add(HtmlViewerFieldCssClasses.HOVERED)) 
        
        target.classList.add(HtmlViewerFieldCssClasses.HOVERED);
      }
    }

    function removeHoverMirror(event: Event, htmlViewerEl: HTMLElement): void {
      const target = event.target as HTMLElement;
      if (target) {
        togglePopup(event, false, htmlViewerEl);
        htmlViewerEl.classList.remove(HtmlViewerFieldCssClasses.HOVERED);
        const childElements = htmlViewerEl.querySelectorAll('*');
        childElements.forEach((element) => element.classList.remove(HtmlViewerFieldCssClasses.HOVERED)) 
        target.classList.remove(HtmlViewerFieldCssClasses.HOVERED);
      }
    }

    function togglePopup(event: Event, isViewerElement: Boolean, deskElement: HTMLElement): void {
      const target = event.target as HTMLElement;
      const allPopups = document.querySelectorAll(`.${GameBoardCss.POPUP}`);
      let popUpTextContent = '';
      if(deskElement.textContent){
        popUpTextContent = deskElement.textContent;
      }
      const popUpParams: ElementParams = {
        tag: 'div',
        classNames: [GameBoardCss.POPUP],
        textContent: popUpTextContent,
        callback: null,
      };
      const popUp = new ElementCreator(popUpParams).getElement() as HTMLElement;

      if (event.type === 'mouseover' && isViewerElement) {
        let viewHtmlTarget = event.currentTarget;
        if(viewHtmlTarget instanceof HTMLElement) {
          popUp.textContent = viewHtmlTarget.textContent
        }

        deskElement.appendChild(popUp);
      } else if (event.type === 'mouseover' && deskElement) {
        target.appendChild(popUp);
      } else if (event.type === 'mouseout') {
        allPopups.forEach((element) => element.remove());
      }
    }
  }
  
}
