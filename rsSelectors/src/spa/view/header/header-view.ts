import './header.scss';
import { Pages } from '../../router/pages';
import ElementCreator from '../../components/element-creator';
import View from '../view';
import LinkView from './link/link-view';
import Router from '../../router/router';
import { ElementParams, Page, ViewParams } from '../../../models/types';
import state from '../../state/state';

const CssClasses = {
  HEADER: 'header',
  NAV: 'nav',
};
const NamePages: { [key: string]: string } = {
  INDEX: 'Game board',
  PRODUCT: 'Levels',
};

export default class HeaderView extends View {
  headerLinkElements;

  constructor(router: Router) {
    const params: ViewParams = {
      tag: 'header',
      classNames: [CssClasses.HEADER],
    };
    super(params);

    this.headerLinkElements = new Map<string, LinkView>();
    this.configureView(router);
  }

  configureView(router: Router): void {
    const navParams: ElementParams = {
      tag: 'nav',
      classNames: [CssClasses.NAV],
      textContent: '',
      callback: null,
    };
    const creatorNav = new ElementCreator(navParams);
    this.viewElementCreator.addInnerElement(creatorNav);

    Object.keys(NamePages).forEach((key) => {
      const pageParam: Page = {
        name: NamePages[key],
        callback: () =>
          router.navigate(
            Pages[key as keyof typeof Pages] as unknown as string
          ),
      };
      const linkElement = new LinkView(pageParam, this.headerLinkElements);

      creatorNav.addInnerElement(linkElement.getHtmlElement() as HTMLElement);

      this.headerLinkElements.set(Pages[key as keyof typeof Pages].toUpperCase(),linkElement);
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
