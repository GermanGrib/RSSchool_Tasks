import { ViewParams } from '../../../models/types';
import View from '../view';

const CssClasses = {
  MAIN: 'main',
};

export default class MainView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'main',
      classNames: [CssClasses.MAIN],
    };
    super(params);
  }

  setContent(content: View) {
    const htmlElement = this.viewElementCreator.getElement();
    if (htmlElement) {
      while (htmlElement.firstElementChild) {
        htmlElement.firstElementChild.remove();
      }
    }
    this.viewElementCreator.addInnerElement(
      content.getHtmlElement() as HTMLElement
    );
  }
}
