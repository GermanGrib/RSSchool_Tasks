import AppController from '../controller/controller';
import FilterNews from '../controller/filterNews';
import AppView from '../view/appView';

class App {
  private controller: AppController;

  private filter: FilterNews;

  private filterInput: HTMLInputElement | null;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.filter = new FilterNews();
    this.filterInput = document.querySelector('.news-filter');
  }

  public start(): void {
    const sourceElement = document.querySelector('.sources');

    if (sourceElement) {
      sourceElement.addEventListener('click', this.handleSourcesClick as EventListener);
    }

    this.filterInput?.addEventListener('input', this.filterChangeValue);

    this.controller.getSources((data) => this.view.drawSources(data));
  }

  private handleSourcesClick = (e: MouseEvent): void => {
    this.controller.getNews(e, (data) => this.view.drawNews(data));
  };

  public filterChangeValue = (): void => {
    const toFilterList = document.querySelectorAll('.source__item');
    const inputFilterInnerHTML = document.querySelector('.news-filter') as HTMLInputElement;

    if (inputFilterInnerHTML) {
      const filterValue = inputFilterInnerHTML.value;

      if (this.filterInput !== null) {
        this.filter.filterNewsInList(toFilterList, filterValue);
      }
    }
  };
}

export default App;
