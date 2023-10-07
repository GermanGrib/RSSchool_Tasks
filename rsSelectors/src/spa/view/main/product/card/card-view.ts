import './card.scss';
import { Pages } from '../../../../router/pages';
import ElementCreator from '../../../../components/element-creator';
import View from '../../../view';
import {
  ElementParams,
  ViewParams,
  cardInfoType,
} from '../../../../../models/types';
import Router from '../../../../router/router';
import state from '../../../../state/state';
import cardInfo from '../../../../../data/cards';
import { levelConditionsCss } from '../variables-product';

const CssClasses = {
  CONTAINER: 'card',
  FIELD: 'card__field',
  BUTTON: ['card__button', 'btn'],
};
const CARD_TEXT_MORE = 'Details';
export default class CardView extends View {
  protected static totalInstances = 0;
  protected instanceIndex: number;

  card;
  router;
  htmlElement;

  constructor(card: cardInfoType, router: Router) {
    const params: ViewParams = {
      tag: 'article',
      classNames: [CssClasses.CONTAINER],
    };
    super(params);

    CardView.totalInstances++;
    this.instanceIndex = CardView.totalInstances;
    this.card = card;
    this.router = router;

    this.htmlElement = this.configureView();
    this.setPassedLevelStyle();
    this.setPassedWithHelpStyle()
  }

  configureView(): void {
    let currentLevel = state.getField('currentGameLevel');
    let labelParams: ElementParams = {
      tag: 'label',
      classNames: [CssClasses.FIELD],
      textContent: this.card.level,
      callback: null,
    };
    const creatorLabel = new ElementCreator(labelParams);
    this.viewElementCreator.addInnerElement(creatorLabel);

    labelParams = {
      tag: 'button',
      classNames: CssClasses.BUTTON,
      textContent: CARD_TEXT_MORE,
      callback: this.buttonClickHandler.bind(this,`${Pages.PRODUCT}/${this.card.id}`),
    };
    const creatorButton = new ElementCreator(labelParams);
    this.viewElementCreator.addInnerElement(creatorButton);

    if (currentLevel === this.card.id) {
      this.viewElementCreator.element?.classList.add(levelConditionsCss.ACTIVE);
    }
  }

  buttonClickHandler(url: string): void {
    this.router.navigate(url);
    if (url === 'product' || url.match(/product\/\d+/g)) {
      state.setField('currentGameLevel', this.card.id);
    }

  }

  setPassedLevelStyle(): void {
    let isCurrentPassedLevel: string = JSON.parse(state.getField('cardsData'))[this.instanceIndex - 1].levelPassed;
    if (this.instanceIndex >= cardInfo.length) {
      CardView.totalInstances = 0;
    }

    if (isCurrentPassedLevel === 'true') {
      this.viewElementCreator.element?.classList.add(levelConditionsCss.PASSED);
    } else {
      this.viewElementCreator.element?.classList.remove(levelConditionsCss.PASSED);
    }
  }

  setPassedWithHelpStyle(): void {
    let isCurrentPassedLevel: string = JSON.parse(state.getField('cardsData'))[this.instanceIndex - 1].passedWithHelp;

    if (isCurrentPassedLevel === 'true') {
      this.viewElementCreator.element?.classList.add(levelConditionsCss.WITH_HELP);
    } else {
      this.viewElementCreator.element?.classList.remove(levelConditionsCss.WITH_HELP);
    }
  }

}
