import { LocalSt } from '../../models/enums';
import { appPages } from '../router/pages';

const KEY_FOR_SAVE_TO_LOCALSTORAGE = 'async-race';

class State {
  private fields: Map<string, string>;

  constructor() {
    this.fields = this.loadState();

    window.addEventListener('beforeunload', this.saveState.bind(this));
  }

  setField(name: string, value: string): void {
    this.fields.set(name, value);
  }

  getField(name: string): string {
    return this.fields.get(name) || '';
  }

  saveState(): void {
    const fiedlsObject = Object.fromEntries(this.fields.entries());
    localStorage.setItem(
      KEY_FOR_SAVE_TO_LOCALSTORAGE,
      JSON.stringify(fiedlsObject)
    );
  }

  loadState(): Map<string, string> {
    const storageItem = localStorage.getItem(KEY_FOR_SAVE_TO_LOCALSTORAGE);
    if (storageItem) {
      const fieldObject: string = JSON.parse(storageItem);
      return new Map(Object.entries(fieldObject));
    }
    return new Map();
  }

  getCurrentPageNumber(currentPageName = this.getCurrentPageName()): number {
    const numberOfPage: number =
      currentPageName === appPages.INDEX
        ? JSON.parse(this.getField(LocalSt.TRACKS_PAGE_NUMBER)).INDEX
        : JSON.parse(this.getField(LocalSt.TRACKS_PAGE_NUMBER)).WINNER;

    return Number(numberOfPage);
  }

  getCurrentPageName(): string | undefined {
    const currentPage: string | undefined = this.loadState().get(
      LocalSt.CURRENT_PAGE_NAME
    );
    return currentPage;
  }
}

const stateSingleTone = new State();

export default stateSingleTone;
