import { appPages } from '../../router/pages';
import ElementCreator from '../element-creator';
import state from '../../state/state';
import {
  DECIMAL_SYSTEM,
  defaultTitleParams,
  garagePageTitle,
  winnerPageTitle,
} from './variables-pageTitle';
import singletonCarService from '../../services/carsService/carsService';

class PageTitle extends ElementCreator {
  constructor() {
    super(defaultTitleParams);
  }

  setPageTitle(): HTMLElement | null {
    const currentPage = state.loadState().get('currentAppPage');

    if (this.element) {
      if (currentPage === appPages.INDEX) {
        this.element.innerHTML = `${garagePageTitle} ()`;
      } else if (currentPage === appPages.WINNER) {
        this.element.innerHTML = `${winnerPageTitle} ()`;
      }
    }

    return this.element;
  }

  async setCurrentCarsNumber(): Promise<void> {
    const currentPageName = state.loadState().get('currentAppPage');
    const regex = /(\()/;

    if (this.element) {
      if (currentPageName === appPages.INDEX) {
        const carsInGarage = (await singletonCarService.getCars()).length;
        const garageResult = this.element?.innerHTML.replace(
          regex,
          `$1${carsInGarage}`
        );

        this.element.textContent = garageResult;
      } else if (currentPageName === appPages.WINNER) {
        const carsInWinnersList = (await singletonCarService.getWinners())
          .length;
        const winnerListResult = this.element?.innerHTML.replace(
          regex,
          `$1${carsInWinnersList}`
        );

        this.element.textContent = winnerListResult;
      }
    }
  }

  updateTotalCounter(increment: boolean): void {
    const currentPage = state.loadState().get('currentAppPage');
    let currentPageValue: number = parseInt(
      this.element?.textContent?.replace(/\D/g, '') ?? '0',
      DECIMAL_SYSTEM
    );
    currentPageValue += increment ? 1 : -1;

    if (currentPage !== undefined && this.element) {
      const pageTitles = {
        [appPages.INDEX]: `${garagePageTitle} (${currentPageValue})`,
        [appPages.WINNER]: `${winnerPageTitle} (${currentPageValue})`,
      };

      this.element.innerHTML = pageTitles[currentPage];
    }
  }
}

const singletonTitle = new PageTitle();

export default singletonTitle;
