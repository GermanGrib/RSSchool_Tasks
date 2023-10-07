import './product.scss';
import cardsInfo from '../../../../data/cards';
import CardDetailView from './card-detail/card-detail-view';
import CardView from './card/card-view';
import View from '../../view';
import Router from '../../../router/router';
import { ElementParams, ViewParams, cardInfoType } from '../../../../models/types';
import state from '../../../state/state';
import { CONFIRM_TEXT, CssClasses, RESET_BTN_TEXT } from './variables-product';


export default class ProductView extends View {
  constructor(router: Router, id: string = '') {
    const params: ViewParams = {
      tag: 'section',
      classNames: [CssClasses.PRODUCT],
    };
    super(params);
    if (id) {
      this.addLargeCardToView(router, id);
    } else {
      this.addSmallCardsToView(router);
      this.addResetProgressBtn()
    }
  }

  addSmallCardsToView(router: Router): void {
    cardsInfo.forEach((card) => {
      const smallCardComponent = new CardView(card, router);
      this.viewElementCreator.addInnerElement(smallCardComponent.getHtmlElement() as HTMLElement);
    });
  }

  addLargeCardToView(router: Router, id: string): void {
    setTimeout(() => {
      const PAGE_BODY = document.querySelector(`section.${CssClasses.PRODUCT}`) as HTMLElement;
      PAGE_BODY.classList.add(CssClasses.CARD_DETAILS);
    }, 0);

    const selectedCard: cardInfoType | undefined = cardsInfo.find(
      (card) => card.id === id
    );

    if (selectedCard) {
      const largeCardComponent = new CardDetailView(selectedCard, router);
      this.viewElementCreator.addInnerElement(largeCardComponent.getHtmlElement() as HTMLElement);
    } else {
      throw Error('ERROR');
    }
  }

  addResetProgressBtn() {
    const resetParams:ElementParams = {
      tag: 'btn',
      classNames: CssClasses.RESET,
      textContent: RESET_BTN_TEXT,
      callback: null,
    }

    const RESET_BTN = new View().createView(resetParams).getElement() as HTMLElement
    RESET_BTN.addEventListener('click', this.clearAllProgress)
    RESET_BTN.textContent = RESET_BTN_TEXT;
    this.viewElementCreator.element?.appendChild(RESET_BTN)
  }

  clearAllProgress() {
    const HEADER_LEVELS_BTN = document.querySelector('.nav-item__selected') as HTMLElement

    if(confirm(CONFIRM_TEXT)) {
      state.setField('cardsData', JSON.stringify(state.filterFields(cardsInfo)));
      state.setField('currentGameLevel', '1');
      HEADER_LEVELS_BTN.click()
    } else {
      return
    }
  }
}
