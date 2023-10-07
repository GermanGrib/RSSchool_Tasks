import './header.scss';
import { Page } from '../../../models/types';
import View from '../view';
import { headerClasses, namePages } from './variables-header';
import LinkView from './link/link-view';
import ElementCreator from '../../components/element-creator';
import { appPages } from '../../router/pages';

export default class HeaderView extends View {
  headerLinkElements;

  constructor() {
    const params = View.getViewParams('header', headerClasses.HEADER);
    super(params);

    this.headerLinkElements = new Map<string, LinkView>();
    this.configureView();
  }

  configureView(): void {
    const navParams = ElementCreator.getElementParams(
      'nav',
      headerClasses.NAV,
      '',
      null
    );
    const creatorNav = new ElementCreator(navParams);
    this.viewElementCreator.addInnerElement(creatorNav);

    Object.keys(namePages).forEach((key) => {
      const pageParam: Page = {
        name: namePages[key],
        callback: null,
      };
      const linkElement = new LinkView(pageParam, this.headerLinkElements);

      creatorNav.addInnerElement(linkElement.getHtmlElement() as HTMLElement);

      this.headerLinkElements.set(
        appPages[key as keyof typeof appPages].toUpperCase(),
        linkElement
      );
    });

    this.viewElementCreator.addInnerElement(creatorNav);
  }

  setSelectedItem(namePage: string): void {
    const linkItem = this.headerLinkElements.get(namePage.toUpperCase());
    if (linkItem instanceof LinkView) {
      linkItem.setSelectedStatus();
    }
  }
}
