import { CallbackFunction, Route } from '../../models/interfaces';
import { RequestParams } from '../../models/types';
import HashRouterHandler from './handler/hash/hash-router-handler';
import HistoryRouterHandler from './handler/history/history-router-handler';
import { Pages, ID_SELECTOR } from './pages';
export default class Router {
  routes: Route[];
  handler: HistoryRouterHandler | HashRouterHandler;

  constructor(routes: Route[]) {
    this.routes = routes;

    this.handler = new HistoryRouterHandler(
      this.urlChangedHandler.bind(this) as CallbackFunction
    );

    document.addEventListener('DOMContentLoaded', (): void => {
      this.handler.navigate('');
    });
  }

  setHashHandler(): void {
    this.handler.disable();
    this.handler = new HashRouterHandler(
      this.urlChangedHandler.bind(this) as CallbackFunction
    );
  }

  navigate(url: string): void {
    const urlString = window.location.pathname.slice(1);
    url = `${urlString.split('/')[0]}/${url}`;
    window.history.pushState({}, '', `/${url}`);
    this.handler.navigate(url);
  }

  urlChangedHandler(requestParams: RequestParams): void {
    
    const pathForFind = requestParams.resource === '' ? requestParams.path : `${requestParams.path}/${ID_SELECTOR}`;
    const route = this.routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectToNotFoundPage();
      return;
    }

    const resource = requestParams.resource || '';
    route.callback(resource);
  }

  redirectToNotFoundPage(): void {
    const notFoundPage = this.routes.find((item) => item.path === Pages.NOT_FOUND);
    if (notFoundPage) {
      this.navigate(notFoundPage.path);
    }
  }
}
