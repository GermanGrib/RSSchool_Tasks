import './main.scss';
import View from '../view';
import { mainCss } from './variables-main';
import Router from '../../router/router';
import state from '../../state/state';
import { LocalSt } from '../../../models/enums';

class MainView extends View {
  router: Router;

  constructor() {
    const params = View.getViewParams('main', mainCss.MAIN);
    super(params);

    this.router = new Router();
  }

  setContent(content: View): void {
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

  rerenderMainPage(): void {
    const currentAppPage = state.getField(LocalSt.CURRENT_PAGE_NAME);
    const routes = this.router.createRoutes();
    const route = routes.find((theRoute) => {
      return theRoute.path === currentAppPage;
    });

    try {
      if (route && typeof route.callback === 'function') {
        route.callback();
      } else {
        throw Error('Route is not defined or callBack is not a function');
      }
    } catch (error) {
      if (error instanceof Error) {
        /* eslint-disable no-console */
        console.error(error.message);
      }
    }
  }
}

const singletonMain = new MainView();

export default singletonMain;
