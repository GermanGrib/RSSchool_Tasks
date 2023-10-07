import './footer.scss';
import View from '../view';
import { ElementParams, ViewParams } from '../../../models/types';
import { CssClasses, APP_NAME } from './footer-variables';
import RsLogo from '../../components/rs-logo/rs-logo-creator';
import GitHub from '../../components/github-link/github-creator';
import ElementCreator from '../../components/element-creator';
export default class FooterView extends View {
  container: HTMLElement;
  logo: HTMLElement;
  title: HTMLElement;
  gitLink: HTMLElement;

  constructor() {
    const params: ViewParams = {
      tag: 'section',
      classNames: [CssClasses.FOOTER],
    };
    super(params);
    this.container = document.createElement('div');
    this.logo = document.createElement('a');
    this.title = document.createElement('h1');
    this.gitLink = document.createElement('a');
    this.configureView();
  }

  configureView(): void {
    const containerParams: ElementParams = {
      tag: 'div',
      classNames: [CssClasses.CONTAINER],
      textContent: '',
      callback: null,
    };
    const titleParams: ElementParams = {
      tag: 'h1',
      classNames: [CssClasses.TITLE],
      textContent: APP_NAME,
      callback: null,
    };

    this.container = new ElementCreator(containerParams).getElement() as HTMLElement;
    this.logo = new RsLogo().getElement() as HTMLElement;
    this.title = new ElementCreator(titleParams).getElement() as HTMLElement;
    this.gitLink = new GitHub().getElement() as HTMLElement;

    this.container.append(this.logo, this.title, this.gitLink);
    this.viewElementCreator.addInnerElement(this.container);
  }
}
