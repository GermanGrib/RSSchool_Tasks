import { LocalSt, TracksViewSettings } from '../../models/enums';
import { ICar, Pages } from '../../models/interfaces';
import { WinnersData } from '../../models/types';
import state from '../state/state';

const appPages: Pages = {
  INDEX: 'garage',
  WINNER: 'winner',
  NOT_FOUND: 'not-found',
};

const defaultPageNumber = {
  INDEX: '1',
  WINNER: '1',
};

function returnMaximumAvailablePages(response: ICar[] | WinnersData[]): number {
  const currentPageName = state.getField(LocalSt.CURRENT_PAGE_NAME);
  const maxPages =
    currentPageName === appPages.INDEX
      ? Math.ceil(response.length / TracksViewSettings.TRACKS_ROWS)
      : Math.ceil(response.length / TracksViewSettings.WINNERS_ROW);

  return maxPages;
}

export { appPages, defaultPageNumber, returnMaximumAvailablePages };
