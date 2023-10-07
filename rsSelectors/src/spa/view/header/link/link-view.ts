import './link.scss';
import View from '../../view';
import { Page, ViewParams } from '../../../../models/types';
import { CallbackMouseFunction } from '../../../../models/interfaces';

const CssClasses = {
  ITEM: 'nav-item',
  ITEM_SELECTED: 'nav-item__selected',
};

export default class LinkView extends View {
  linkElements: Map<string, LinkView>;
  constructor(pageParam: Page, linkElements: Map<string, LinkView>) {
    const params: ViewParams = {
      tag: 'a',
      classNames: [CssClasses.ITEM],
    };
    super(params);

    this.linkElements = linkElements;
    this.configureView(pageParam);
  }

  setSelectedStatus(): void {
    this.linkElements.forEach((linkElement) =>
      linkElement.setNotSelectedStatus()
    );

    const element = this.viewElementCreator.getElement();
    if (element) {
      element.classList.add(CssClasses.ITEM_SELECTED);
    }
  }

  setNotSelectedStatus(): void {
    const element = this.viewElementCreator.getElement();
    if (element) {
      element.classList.remove(CssClasses.ITEM_SELECTED);
    }
  }

  configureView(pageParam: Page): void {
    this.viewElementCreator.setTextContent(pageParam.name);
    this.viewElementCreator.setCallback(pageParam.callback as CallbackMouseFunction);

    const element = this.viewElementCreator.getElement();
    if (element) {
      element.addEventListener('click', this.setSelectedStatus.bind(this));
    }
  }
}
