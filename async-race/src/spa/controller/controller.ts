import state from '../state/state';
import { ICar, IEngine } from '../../models/interfaces';
import { EngineStatus, LocalSt } from '../../models/enums';
import Car from '../components/car/car-creator';
import {
  getRandomCarName,
  getRandomColor,
} from '../components/car/variables-car';
import ConsolePanel from '../components/controlConsole/console-creator';
import singletonPageNumber from '../components/pageNumber/pageNumber-creator';
import singletonTitle from '../components/pageTitle/pageTitle-creator';
import Track from '../components/track/track-creator';
import singletonCarService from '../services/carsService/carsService';
import { GENERATE_NUMBER } from './variables-controller';
import { appPages } from '../router/pages';
import WinnerTable from '../components/winnerTable/winTable-creator';
import { WinnersData } from '../../models/types';
import { defaultTableParams } from '../components/winnerTable/variables-winTable';
import { pageNumberCss } from '../components/pageNumber/variables-pageNumber';
import LinkView from '../view/header/link/link-view';

class EventsHandler {
  static weHaveWinner: boolean = false;

  async createBtnInGarage(
    event: Event,
    nameInput: HTMLInputElement,
    colorInput: HTMLInputElement
  ): Promise<void> {
    event.preventDefault();
    const newCarParams: ICar = {
      name: nameInput.value,
      color: colorInput.value,
      id: null,
    };

    if (Track.returnTrackChildrenLength() === 7) {
      singletonPageNumber.removeDisableStateFromNextPageBtn();
    }
    await singletonCarService.createCar(newCarParams);
    const cars = await singletonCarService.getCars();
    newCarParams.id = cars[cars.length - 1].id;
    Track.addNewTrackInTracks(newCarParams);
    singletonTitle.updateTotalCounter(true);
    ConsolePanel.setDefaultFormValues(nameInput, colorInput);
  }

  updateBtnInGarage(
    event: Event,
    nameInput: HTMLInputElement,
    colorInput: HTMLInputElement
  ): void {
    event?.preventDefault();

    if (event?.type === 'submit') {
      const activeCarData = Track.returnActiveBtnAndCarID();
      const { CAR_ID } = activeCarData;
      const changeCarOptions: ICar = {
        name: nameInput?.value,
        color: colorInput?.value,
        id: CAR_ID,
      };
      Car.updateCarInGarage(changeCarOptions);
      Track.toggleActiveState(activeCarData.ACTIVE_BTN);
      ConsolePanel.setDefaultFormValues(nameInput, colorInput);
      ConsolePanel.toggleDisableStateUpdateForm(false);
    }
  }

  async changePageBtns(
    event: Event,
    prevBtn: HTMLButtonElement,
    nextBtn: HTMLButtonElement
  ): Promise<void> {
    const element = event.target as HTMLElement;
    const BTNS_CONTAINER = document.querySelector(
      `.${pageNumberCss.BTNS_CONTAINER}`
    );
    const currentPageName = state.getField(LocalSt.CURRENT_PAGE_NAME);
    const WINNER_TABLE = document.querySelector(
      `.${[...defaultTableParams.classNames]}`
    );

    if (element === BTNS_CONTAINER) {
      return;
    }
    await singletonPageNumber.changePage(element, prevBtn, nextBtn);

    if (currentPageName === appPages.INDEX) {
      Track.rerenderCarsTrack();
    } else if (currentPageName === appPages.WINNER) {
      if (
        WINNER_TABLE &&
        WINNER_TABLE !== null &&
        WINNER_TABLE instanceof HTMLElement
      ) {
        WinnerTable.fillWinnersInTable(WINNER_TABLE);
      }
    }
  }

  selectCarBtn(
    event: Event | null,
    CAR?: HTMLDivElement,
    currentState?: boolean
  ): void {
    if (currentState === true || currentState === false) {
      ConsolePanel.toggleDisableStateUpdateForm(currentState);
    }
  }

  async deleteCarBtn(carID?: number): Promise<void> {
    const userWantDeleteColor = Track.usedDeleteBtn();

    if (userWantDeleteColor && carID) {
      Track.deleteTrackByID(carID);
      const tracksOnPage = Track.returnTrackChildrenLength();

      if (tracksOnPage === 0) {
        singletonPageNumber.usePrevBtn();
      }
      singletonTitle.updateTotalCounter(false);
      singletonPageNumber.disableStateToNextPageBtn();
      try {
        await singletonCarService.deleteCarByID(carID);
        singletonPageNumber.disableStateToNextPageBtn();
        await Track.getAndAddNextTrack();
        await singletonCarService.deleteWinnerByID(carID);
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        return;
      }
    }
  }

  async driveOrStopSingleCar(
    event: Event,
    startBtn: HTMLButtonElement,
    stopBtn: HTMLButtonElement,
    carID: number
  ): Promise<void> {
    const { target } = event;

    try {
      if (Track.isRaceStart(event, startBtn, stopBtn)) {
        Track.toggleRaceAndResetBtns();
        const engineData: IEngine =
          await singletonCarService.setEngineStatusReturnData(
            carID,
            EngineStatus.Started
          );
        await Car.startDriveAnimation(engineData, carID);
        await singletonCarService.startDriveReturnStatus(carID);
      } else if (target === stopBtn) {
        await singletonCarService.setEngineStatusReturnData(
          carID,
          EngineStatus.Stopped
        );
        Car.returnCarOnBase(carID);
        Track.toggleRaceAndResetBtns();
      }
    } catch (error) {
      Car.carIsDead(carID);
    }
  }

  filterTableData(event: Event): void {
    WinnerTable.filterTable(event);
  }

  async raceAllCarsOnCurrentPage(event: Event): Promise<void> {
    Car.animationInProgress = false;
    EventsHandler.weHaveWinner = false;
    Track.clickAllStartBtns();
    LinkView.toggleWinnerLink(true);
    ConsolePanel.toggleRaceAndResetBtns(event);
  }

  returnAllCarsToBase(event: Event): void {
    Track.clickAllStopBtns();
    LinkView.toggleWinnerLink(false);
    ConsolePanel.toggleRaceAndResetBtns(event);
  }

  async generateCarsBtn(): Promise<void> {
    singletonPageNumber.removeDisableStateFromNextPageBtn();
    const promises: Promise<ICar>[] = [];

    for (let i = 0; i < GENERATE_NUMBER; i++) {
      const newCarParams: ICar = {
        name: getRandomCarName(),
        color: getRandomColor(),
        id: null,
      };
      const createCarPromise = singletonCarService.createCar(newCarParams);
      promises.push(createCarPromise);
      singletonTitle.updateTotalCounter(true);
    }

    await Promise.all(promises);

    Track.getAndAddNextTrack();
  }

  async winner(carID: number): Promise<void> {
    if (!EventsHandler.weHaveWinner) {
      EventsHandler.weHaveWinner = true;

      const isWinnerInTable = await WinnerTable.isWinnerInTable(carID);
      Car.showWinner(carID);

      if (!isWinnerInTable) {
        const newWinnerParams: WinnersData = {
          id: carID,
          wins: await WinnerTable.countWins(carID),
          time: await WinnerTable.countTimeToWin(carID),
        };
        await singletonCarService.createWinner(newWinnerParams);
      } else if (isWinnerInTable) {
        const currentWinner = await singletonCarService.getWinnerByID(carID);
        const currentWinnerTime = currentWinner.time;
        const updateWinnerData: WinnersData = {
          id: carID,
          wins: await WinnerTable.countWins(carID),
          time: await WinnerTable.countTimeToWin(carID, currentWinnerTime),
        };
        await singletonCarService.updateWinnerByID(carID, updateWinnerData);
      }
    }
  }
}

const singletonEventHandler = new EventsHandler();
export default singletonEventHandler;
