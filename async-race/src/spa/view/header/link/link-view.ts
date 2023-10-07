import './link.scss';
import { linkClasses } from './variables-link';
import View from '../../view';
import { Page } from '../../../../models/types';
import { CallbackMouseFunction } from '../../../../models/interfaces';
import { namePages } from '../variables-header';
import state from '../../../state/state';
import { appPages } from '../../../router/pages';
import MainView from '../../main/main-view';
import { LocalSt } from '../../../../models/enums';

export default class LinkView extends View {
  linkElements: Map<string, LinkView>;

  static winnerLinkTimeout: NodeJS.Timeout | undefined;

  constructor(pageParam: Page, linkElements: Map<string, LinkView>) {
    const params = View.getViewParams('a', [linkClasses.ITEM]);
    super(params);

    this.linkElements = linkElements;
    this.configureView(pageParam);
  }

  configureView(pageParam: Page): void {
    this.viewElementCreator.setTextContent(pageParam.name);
    this.viewElementCreator.setCallback(
      pageParam.callback as CallbackMouseFunction
    );

    const element = this.viewElementCreator.getElement();
    if (element) {
      element.addEventListener('click', this.setSelectedStatus.bind(this));
    }
  }

  setSelectedStatus(): void {
    this.linkElements.forEach((linkElement) => {
      linkElement.setNotSelectedStatus();
    });

    const element = this.viewElementCreator.getElement();
    if (element) {
      element.classList.add(linkClasses.ITEM_SELECTED);
    }

    this.setCurrentPageInState(element);

    MainView.rerenderMainPage();
  }

  setNotSelectedStatus(): void {
    const element = this.viewElementCreator.getElement();
    if (element) {
      element.classList.remove(linkClasses.ITEM_SELECTED);
    }
  }

  setCurrentPageInState(element: HTMLElement | null): void {
    if (element?.textContent === namePages.INDEX) {
      state.setField(LocalSt.CURRENT_PAGE_NAME, appPages.INDEX);
    } else if (element?.textContent === namePages.WINNER) {
      state.setField(LocalSt.CURRENT_PAGE_NAME, appPages.WINNER);
    }

    state.saveState();
  }

  static toggleWinnerLink(isRaceStart: boolean): void {
    const WINNER_LINK = document.querySelector(
      `.${linkClasses.ITEM}:nth-child(2)`
    );

    if (LinkView.winnerLinkTimeout !== undefined) {
      clearTimeout(LinkView.winnerLinkTimeout);
      LinkView.winnerLinkTimeout = undefined;
    }

    if (isRaceStart) {
      WINNER_LINK?.classList.add(linkClasses.ITEM_DISABLED);
      LinkView.winnerLinkTimeout = setTimeout(() => {
        WINNER_LINK?.classList.remove(linkClasses.ITEM_DISABLED);
        LinkView.winnerLinkTimeout = undefined;
      }, 15000);
    } else {
      setTimeout(() => {
        WINNER_LINK?.classList.remove(linkClasses.ITEM_DISABLED);
      }, 2500);
    }
  }
}
