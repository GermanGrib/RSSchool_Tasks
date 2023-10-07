import { ElementParams, ViewParams } from '../../models/types';
import ElementCreator from '../components/element-creator';

export default class View {
  public viewElementCreator: ElementCreator;
  constructor(params: ViewParams = { tag: 'section', classNames: [] }) {
    this.viewElementCreator = this.createView(params);
  }

  getHtmlElement(): HTMLElement | null {
    return this.viewElementCreator.getElement();
  }

  createView(params: ViewParams): ElementCreator {
    const elementParams: ElementParams = {
      tag: params.tag,
      classNames: params.classNames,
      textContent: '',
      callback: null,
    };
    this.viewElementCreator = new ElementCreator(elementParams);

    return this.viewElementCreator;
  }

}
