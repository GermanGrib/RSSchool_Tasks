import { cardInfoType } from '../../models/types';

const KEY_FOR_SAVE_TO_LOCALSTORAGE = 'rs-selectorsApp';

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
    localStorage.setItem(KEY_FOR_SAVE_TO_LOCALSTORAGE,JSON.stringify(fiedlsObject));
  }

  loadState(): Map<string, string> {
    const storageItem = localStorage.getItem(KEY_FOR_SAVE_TO_LOCALSTORAGE);
    if (storageItem) {
      const fieldObject = JSON.parse(storageItem);
      return new Map(Object.entries(fieldObject));
    }
    return new Map();
  }

  filterFields(data: cardInfoType[]) {
    return data.map((card) => {
      const { id, task, levelPassed, passedWithHelp } = card;
      return { id, task, levelPassed, passedWithHelp };
    });
  }
}

const stateSingleTone = new State();

export default stateSingleTone;
