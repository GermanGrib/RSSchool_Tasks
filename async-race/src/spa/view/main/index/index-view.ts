import { TracksViewSettings } from '../../../../models/enums';
import ConsolePanel from '../../../components/controlConsole/console-creator';
import ElementCreator from '../../../components/element-creator';
import singletonTitle from '../../../components/pageTitle/pageTitle-creator';
import Track from '../../../components/track/track-creator';
import View from '../../view';
import { indexCss } from './variables-index';
import state from '../../../state/state';
import singletonPageNumber from '../../../components/pageNumber/pageNumber-creator';

export default class IndexView extends View {
  constructor() {
    const params = View.getViewParams('section', indexCss.GARAGE);
    super(params);
    this.configureView();
  }

  public configureView(): void {
    const numberOfPage = state.getCurrentPageNumber();
    const raceTracksParams = ElementCreator.getElementParams(
      'div',
      indexCss.TRACKS_CONTAINER,
      ''
    );
    const RACE_TRACKS = new ElementCreator(
      raceTracksParams
    ).getElement() as HTMLDivElement;
    const controlPanel = new ConsolePanel().configureView();
    const title = singletonTitle.setPageTitle() as HTMLElement;
    singletonTitle.setCurrentCarsNumber();
    const pageNumber = singletonPageNumber.getElement() as HTMLElement;
    singletonPageNumber.setPageNumber();
    const changePagesBtns = singletonPageNumber.getPageNavigationButtons();

    if (controlPanel) {
      this.viewElementCreator.addInnerElement(controlPanel);
    }

    Track.addAllTracksOnPage(RACE_TRACKS, {
      page: numberOfPage,
      limit: TracksViewSettings.TRACKS_ROWS,
    });

    this.viewElementCreator.addInnerElement(title);
    this.viewElementCreator.addInnerElement(pageNumber);
    this.viewElementCreator.addInnerElement(RACE_TRACKS);
    this.viewElementCreator.addInnerElement(changePagesBtns);
  }
}
