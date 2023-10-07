import './rs_logo.scss';
import { ElementParams } from '../../../models/types';
import ElementCreator from '../element-creator';
import { LOGO_LINK_CLASSNAMES, LOGO_SVG, LOGO_URL } from './variables-rs-logo';

export default class RsLogo extends ElementCreator {
  constructor() {
    const logoParams: ElementParams = {
      tag: 'a',
      classNames: LOGO_LINK_CLASSNAMES,
      textContent: LOGO_SVG,
      callback: null,
    };
    super(logoParams);
    this.setHref();
  }

  setHref(): void {
    if (this.element instanceof HTMLAnchorElement) {
      this.element.href = LOGO_URL;
      this.element.target = '_blank';
    }
  }

  setTextContent(text = ''): void {
    if (this.element) {
      this.element.innerHTML = text;
    }
  }
}
