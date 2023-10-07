import CardView from '../card/card-view';
import { Pages } from '../../../../router/pages';
import ElementCreator from '../../../../components/element-creator';
import { ElementParams, cardInfoType } from '../../../../../models/types';
import StartBtn from '../../../../components/game-board/start-game-button';
import Router from '../../../../router/router';
import state from '../../../../state/state';
import { levelConditionsCss } from '../variables-product';

const CssClasses = {
  CONTAINER: 'card',
  CONTAINER_FULL: 'card__full',
  FIELD: 'card__field',
  BUTTON: ['card__button', 'btn'],
};
const CARD_TEXT_BACK = 'Back';

export default class CardDetailView extends CardView {
  constructor(card: cardInfoType, router: Router) {
    super(card, router); 
    CardView.totalInstances--;
  }

  configureView(): void {
    this.viewElementCreator.setCssClasses([
      CssClasses.CONTAINER,
      CssClasses.CONTAINER_FULL,
    ]);

    let labelParams: ElementParams = {
      tag: 'label',
      classNames: [CssClasses.FIELD],
      textContent: this.card.level,
      callback: null,
    };
    let creatorLabel = new ElementCreator(labelParams);
    this.viewElementCreator.addInnerElement(creatorLabel);

    labelParams = {
      tag: 'label',
      classNames: [CssClasses.FIELD],
      textContent: this.card.task,
      callback: null,
    };
    creatorLabel = new ElementCreator(labelParams);
    this.viewElementCreator.addInnerElement(creatorLabel);

    const buttonParams: ElementParams = {
      tag: 'button',
      classNames: CssClasses.BUTTON,
      textContent: CARD_TEXT_BACK,
      callback: this.buttonClickHandler.bind(this, `${Pages.PRODUCT}`),
    };
    const creatorButton = new ElementCreator(buttonParams);
    this.viewElementCreator.addInnerElement(creatorButton);

    const startGameBtn = new StartBtn();
    this.viewElementCreator.addInnerElement(startGameBtn);
  }

  setPassedLevelStyle(): void {
    let currentGameLevel = this.card.id
    let isCurrentPassedLevel = JSON.parse(state.getField('cardsData'))[Number(currentGameLevel) - 1].levelPassed;

    if (isCurrentPassedLevel === 'true') {
      this.viewElementCreator.element?.classList.add(levelConditionsCss.PASSED);
    } else {
      this.viewElementCreator.element?.classList.remove(levelConditionsCss.PASSED);
    }
  }

  setPassedWithHelpStyle(): void {
    let currentGameLevel = this.card.id
    let isCurrentPassedLevel = JSON.parse(state.getField('cardsData'))[Number(currentGameLevel) - 1].passedWithHelp;

    if (isCurrentPassedLevel === 'true') {
      this.viewElementCreator.element?.classList.add(levelConditionsCss.WITH_HELP);
    } else {
      this.viewElementCreator.element?.classList.remove(levelConditionsCss.WITH_HELP);
    }
  }
}
