import { appPages } from './pages';
import MainView from '../view/main/main-view';
import { RouteType } from '../../models/types';

export default class Router {
  routes;

  constructor() {
    this.routes = this.createRoutes();
  }

  createRoutes(): RouteType[] {
    return [
      {
        path: appPages.INDEX,
        callback: async (): Promise<void> => {
          const { default: IndexView } = await import(
            '../view/main/index/index-view'
          );
          MainView.setContent(new IndexView());
        },
      },
      {
        path: appPages.WINNER,
        callback: async (): Promise<void> => {
          const { default: WinnerView } = await import(
            '../view/main/winner/winner-view'
          );
          MainView.setContent(new WinnerView());
        },
      },
    ];
  }
}
