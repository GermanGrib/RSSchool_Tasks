import { ViewParams } from '../../../../models/types';
import View from '../../view';
import './not-found.scss';

const CssClasses = {
  ERROR: 'not-found',
};
const TEXT_NOT_FOUND: string = 'Ошибка. Страница не найдена.';

export default class NotFoundView extends View {
  constructor() {
    const params: ViewParams = {
      tag: 'section',
      classNames: [CssClasses.ERROR],
    };
    super(params);
    this.configureView();
  }

  configureView(): void {
    this.viewElementCreator.setTextContent(TEXT_NOT_FOUND);
  }
}
