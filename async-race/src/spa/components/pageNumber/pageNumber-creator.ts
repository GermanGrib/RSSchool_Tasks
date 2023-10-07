/* eslint-disable prettier/prettier */
import './pageNumber.scss';
import state from '../../state/state';
import ElementCreator from '../element-creator';
import {
  FIRST_PAGE,
  pageNumberCss,
  pageNumberText,
} from './variables-pageNumber';
import { DECIMAL_SYSTEM } from '../pageTitle/variables-pageTitle';
import singletonEventHandler from '../../controller/controller';
import singletonCarService from '../../services/carsService/carsService';
import { LocalSt, ClassListMethods } from '../../../models/enums';
import { appPages, returnMaximumAvailablePages } from '../../router/pages';

class PageNumber extends ElementCreator {
  constructor() {
    const params = ElementCreator.getElementParams('h1', pageNumberCss.PAGE_TITLE, '');
    super(params);
  }

  public setPageNumber(): void {
    const numberOfPage = state.getCurrentPageNumber();

    if (this.element) {
      this.element.innerHTML = `${pageNumberText.TITLE}${numberOfPage}`;
    }
  }

  getPageNavigationButtons(): HTMLElement {
    const numberOfPage = state.getCurrentPageNumber();
    const buttonContainerParams = ElementCreator.getElementParams('div', pageNumberCss.BTNS_CONTAINER,'');
    const previousPageParams = ElementCreator.getElementParams('button',[...pageNumberCss.PREVIOUS_BTN],pageNumberText.PREV_BTN); 
    const nextPageParams = ElementCreator.getElementParams('button',pageNumberCss.NEXT_BTN,pageNumberText.NEXT_BTN);

    const BTNS_CONTAINER = new ElementCreator(buttonContainerParams).getElement() as HTMLDivElement;
    const PREV_BTN = new ElementCreator(previousPageParams).getElement() as HTMLButtonElement;
    const NEXT_BTN = new ElementCreator(nextPageParams).getElement() as HTMLButtonElement;
    if (numberOfPage === FIRST_PAGE) {
      PREV_BTN.classList.add(...pageNumberCss.BTN_DISABLED);

      const methodToCall = (state.getField(LocalSt.CURRENT_PAGE_NAME) === appPages.INDEX) ? singletonCarService.getCars() : singletonCarService.getWinners()
      methodToCall.then((carsData) => {
        const maxPages = returnMaximumAvailablePages(carsData)
        if(maxPages === 1) {
          NEXT_BTN.classList.add(...pageNumberCss.BTN_DISABLED)
        }
      })
    }

    if (numberOfPage !== FIRST_PAGE) {
      singletonCarService.getCars().then((response) => {
        const maxPages = returnMaximumAvailablePages(response);
        if (numberOfPage === maxPages) {
          NEXT_BTN.classList.add(...pageNumberCss.BTN_DISABLED);
        }
      });
    }

    BTNS_CONTAINER.addEventListener('click', (event) =>
      singletonEventHandler.changePageBtns(event, PREV_BTN, NEXT_BTN)
    );

    BTNS_CONTAINER.append(PREV_BTN, NEXT_BTN);

    return BTNS_CONTAINER;
  }

  async changePage( currentBtn: HTMLElement, prevBtn: HTMLButtonElement, nextBtn: HTMLButtonElement ): Promise<void> {
    let numberOfPage = state.getCurrentPageNumber();
    const isPrevBtn = currentBtn === prevBtn;
    const oppositeBtn = isPrevBtn ? nextBtn : prevBtn;
    const currentPageName = state.getField(LocalSt.CURRENT_PAGE_NAME);
    const pageName = currentPageName === appPages.INDEX ? appPages.INDEX : appPages.WINNER;
    if (isPrevBtn && numberOfPage === FIRST_PAGE) {
      return;
    }
    const response = pageName === appPages.INDEX ? await singletonCarService.getCars() : await singletonCarService.getWinners();
    const maxPages = returnMaximumAvailablePages(response);

    if (numberOfPage === FIRST_PAGE && maxPages !== 1 && !isPrevBtn) {
      this.toggleButtonDisabledClass(oppositeBtn, false);
    } else if (numberOfPage - 1 === FIRST_PAGE && isPrevBtn) {
      this.toggleButtonDisabledClass(currentBtn, true);
      this.toggleButtonDisabledClass(oppositeBtn, false);
    } else if (numberOfPage === FIRST_PAGE && maxPages === 1 && !isPrevBtn) {
      return;
    }
    if (numberOfPage + 1 === maxPages && !isPrevBtn) {
      this.toggleButtonDisabledClass(currentBtn, true);
      this.toggleButtonDisabledClass(oppositeBtn, false);
    }
    if (numberOfPage === maxPages && isPrevBtn) {
      this.toggleButtonDisabledClass(oppositeBtn, false);
    }
    numberOfPage += isPrevBtn ? -1 : 1;
    this.updateTotalCounter(!isPrevBtn);
    if (currentPageName === appPages.INDEX) {
      const WINNER_PAGE_NUMB: string = JSON.parse(state.getField(LocalSt.TRACKS_PAGE_NUMBER)).WINNER;
      state.setField( LocalSt.TRACKS_PAGE_NUMBER, JSON.stringify({ INDEX: numberOfPage, WINNER: WINNER_PAGE_NUMB }) );
    } else if (currentPageName === appPages.WINNER) {
      const INDEX_PAGE_NUMB: string = JSON.parse( state.getField(LocalSt.TRACKS_PAGE_NUMBER)).INDEX;
      state.setField(LocalSt.TRACKS_PAGE_NUMBER, JSON.stringify({ INDEX: INDEX_PAGE_NUMB, WINNER: numberOfPage }));
    }
    state.saveState();
  }

  toggleButtonDisabledClass(button: HTMLElement, isDisabled: boolean): void {
    const classListMethod = isDisabled
      ? ClassListMethods.ADD
      : ClassListMethods.REMOVE;
    button.classList[classListMethod](...pageNumberCss.BTN_DISABLED);
  }

  updateTotalCounter(increment: boolean): void {
    let currentPageValue: number = parseInt(
      this.element?.textContent?.replace(/\D/g, '') ?? '0',
      DECIMAL_SYSTEM
    );

    if (increment) {
      currentPageValue += 1;
    } else {
      currentPageValue -= 1;
    }

    if (this.element) {
      this.element.innerHTML = `${pageNumberText.TITLE}${currentPageValue}`;
    }
  }

  removeDisableStateFromNextPageBtn(): void {
    const NEXT_BTN = document.querySelector(`.${pageNumberCss.NEXT_BTN}`);
    NEXT_BTN?.classList.remove('disabled');
  }

  disableStateToNextPageBtn():void {
    const currentPageName = (state.getField(LocalSt.CURRENT_PAGE_NAME)) 
    const methodToCall = (currentPageName === appPages.INDEX) ? singletonCarService.getCars() : singletonCarService.getWinners()
    const NEXT_BTN = document.querySelector(`.${pageNumberCss.NEXT_BTN}`)

    methodToCall.then((carsData) => {
      const maxPages = returnMaximumAvailablePages(carsData);
      const numberOfCurrentPage = state.getCurrentPageNumber()
      if(numberOfCurrentPage === FIRST_PAGE && numberOfCurrentPage === maxPages) {
        NEXT_BTN?.classList.add(...pageNumberCss.BTN_DISABLED)
      }
    })

  }

  usePrevBtn(): void {
    const PREV_BTN = document.querySelector(`.${pageNumberCss.PREVIOUS_BTN}`)
    if (PREV_BTN instanceof HTMLButtonElement) {
      PREV_BTN.click()
      this.disableStateToNextPageBtn()
    }
  }
}

const singletonPageNumber = new PageNumber();

export default singletonPageNumber;
