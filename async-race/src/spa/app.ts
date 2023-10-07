import HeaderView from './view/header/header-view';
import MainView from './view/main/main-view';
import state from './state/state';
import { appPages, defaultPageNumber } from './router/pages';
import { LocalSt } from '../models/enums';

export default class App {
  header: HeaderView | null;

  constructor() {
    this.header = null;
  }

  createView(): void {
    this.header = new HeaderView();

    document.body.append(
      this.header.getHtmlElement() as HTMLElement,
      MainView.getHtmlElement() as HTMLElement
    );
  }

  setGamePage(): void {
    const isNotSetPageInState =
      state.getField(LocalSt.CURRENT_PAGE_NAME).length === 0;

    if (isNotSetPageInState && !(LocalSt.CURRENT_PAGE_NAME in state)) {
      state.setField(LocalSt.CURRENT_PAGE_NAME, appPages.INDEX);
      state.setField(
        LocalSt.TRACKS_PAGE_NUMBER,
        JSON.stringify(defaultPageNumber)
      );
      state.saveState();
    }
    MainView.rerenderMainPage();
  }

  runApplication(): void {
    this.createView();
    this.setGamePage();
  }
}
