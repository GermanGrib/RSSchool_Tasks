import './github.scss';
import { ElementParams } from '../../../models/types';
import ElementCreator from '../element-creator';
import { GIT_CLASSNAMES, GIT_DEVELOPER_URL, GIT_SVG } from './variables-github';

export default class GitHub extends ElementCreator {
  constructor() {
    const gitParams: ElementParams = {
      tag: 'a',
      classNames: GIT_CLASSNAMES,
      textContent: GIT_SVG,
      callback: null,
    };
    super(gitParams);
    this.setHref();
  }

  setHref(): void {
    if (this.element instanceof HTMLAnchorElement) {
      this.element.href = GIT_DEVELOPER_URL;
      this.element.target = '_blank';
    }
  }

  setTextContent(text = ''): void {
    if (this.element) {
      this.element.innerHTML = text;
    }
  }
}
