import singletonPageNumber from '../../../components/pageNumber/pageNumber-creator';
import singletonTitle from '../../../components/pageTitle/pageTitle-creator';
import WinnerTable from '../../../components/winnerTable/winTable-creator';
import View from '../../view';
import { winnerCss } from './variables-winner';

export default class WinnerView extends View {
  constructor() {
    const params = View.getViewParams('section', winnerCss.WINNER);
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const winnerTitle = singletonTitle.setPageTitle() as HTMLElement;
    singletonTitle.setCurrentCarsNumber();
    const PAGE_NUMBER = singletonPageNumber.getElement() as HTMLElement;
    const WINNER_TABLE = new WinnerTable().configureView() as HTMLElement;
    WinnerTable.fillWinnersInTable(WINNER_TABLE);
    const changePagesBtns = singletonPageNumber.getPageNavigationButtons();
    singletonPageNumber.setPageNumber();

    this.viewElementCreator.addInnerElement(winnerTitle);
    this.viewElementCreator.addInnerElement(PAGE_NUMBER);
    this.viewElementCreator.addInnerElement(WINNER_TABLE);
    this.viewElementCreator.addInnerElement(changePagesBtns);
  }
}
