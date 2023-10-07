/* eslint-disable prettier/prettier */
import './track.scss';
import { TracksViewSettings } from '../../../models/enums';
import { GetWinnersOptions, ICar } from '../../../models/interfaces';
import { CarIdWithActiveBtn } from '../../../models/types';
import singletonEventHandler from '../../controller/controller';
import singletonCarService from '../../services/carsService/carsService';
import { indexCss } from '../../view/main/index/variables-index';
import Car from '../car/car-creator';
import ElementCreator from '../element-creator';
import {
  CONFIRM_DELETE_TEXT,
  IS_ACTIVE,
  btnsText,
  defaultTrackParams,
  trackCss,
} from './variables-track';
import state from '../../state/state';
import { DISABLED_CLASS, controlButtonsCss } from '../controlConsole/variables-console';

export default class Track extends ElementCreator {
  public name?: string;

  color?: string;

  constructor(name?: string, color?: string) {
    super(defaultTrackParams);
    this.name = name;
    this.color = color;
  }

  configureView(carID: number): HTMLElement | null {
    const trackContainerParams = ElementCreator.getElementParams( 'div', trackCss.TRACK_CONTAINER, '');
    if (this.element && this.element instanceof HTMLElement) {
      this.element.dataset.id = String(carID);
    }

    const TRACK_CONTAINER = new ElementCreator( trackContainerParams ).getElement() as HTMLDivElement;
    const CAR = new Car(this.color).setCarColor() as HTMLDivElement; CAR.dataset.id = String(carID);
    const CONTROLLERS = this.createCurrentCarControllers(carID, CAR);

    TRACK_CONTAINER.append(CONTROLLERS, CAR);
    this.element?.appendChild(TRACK_CONTAINER);

    return this.element;
  }

  createCurrentCarControllers(carID: number,CAR?: HTMLDivElement): HTMLDivElement {
    const mainContainerParams = ElementCreator.getElementParams('div',trackCss.CONTROLLERS_CONTAINER,'');
    const topControllersContainerParams = ElementCreator.getElementParams('div',trackCss.TOP_CONTROLLERS_CONTAINER,'');
    const topSelectedBtnParams = ElementCreator.getElementParams('button',trackCss.TOP_SELECT_BTN,btnsText.SELECT);
    const topRemoveBtnParams = ElementCreator.getElementParams('button',trackCss.TOP_REMOVE_BTN,btnsText.REMOVE);
    const carNameParams = ElementCreator.getElementParams('h4', trackCss.TOP_CAR_NAME, '');
    const middleContainerParams = ElementCreator.getElementParams('div',trackCss.MIDDLE_CONTROLLERS_CONTAINER,'');
    const middleStartBtnPArams = ElementCreator.getElementParams('button',trackCss.MID_START_RACE_BTN,btnsText.START_RACE);
    const middleStopBtnParams = ElementCreator.getElementParams('button',trackCss.MID_STOP_RACE_BTN,btnsText.STOP_RACE);

    const CONTROLLERS = new ElementCreator(mainContainerParams).getElement() as HTMLDivElement;
    const TOP_CONTROLLERS = new ElementCreator(topControllersContainerParams).getElement() as HTMLDivElement;
    const SELECT_BTN = new ElementCreator(topSelectedBtnParams).getElement() as HTMLButtonElement;
    SELECT_BTN.dataset.id = String(carID);
    const REMOVE_BTN = new ElementCreator(topRemoveBtnParams).getElement() as HTMLButtonElement;
    const CAR_NAME = new ElementCreator(carNameParams).getElement() as HTMLHeadingElement;
    CAR_NAME.dataset.id = String(carID);
    const MIDDLE_CONTROLLERS = new ElementCreator(middleContainerParams).getElement() as HTMLDivElement;
    const START_BTN = new ElementCreator(middleStartBtnPArams).getElement() as HTMLButtonElement;
    const STOP_BTN = new ElementCreator(middleStopBtnParams).getElement() as HTMLButtonElement;
    START_BTN.dataset.id = String(carID);

    MIDDLE_CONTROLLERS.addEventListener('click', (event) => singletonEventHandler.driveOrStopSingleCar(event,START_BTN,STOP_BTN,carID));
    SELECT_BTN.addEventListener('click', () => this.handleSelectBtnClick(SELECT_BTN, CAR) );
    REMOVE_BTN.addEventListener('click', () => singletonEventHandler.deleteCarBtn(carID) );

    if (this.name) {
      CAR_NAME.textContent = this.name;
    }

    TOP_CONTROLLERS.append(SELECT_BTN, REMOVE_BTN, CAR_NAME);
    MIDDLE_CONTROLLERS.append(START_BTN, STOP_BTN);
    CONTROLLERS.append(TOP_CONTROLLERS, MIDDLE_CONTROLLERS);

    return CONTROLLERS;
  }

  static async addAllTracksOnPage( track: HTMLElement, options?: GetWinnersOptions ): Promise<void> {
    if (options) {
      const allCarsInGarage = await singletonCarService.getCars(options);
      for (let i = 0; i < allCarsInGarage.length; i++) {
        const carID = allCarsInGarage[i].id;
        const newTrack = new Track( allCarsInGarage[i].name, allCarsInGarage[i].color)
          .configureView(Number(carID)) as HTMLElement;
        track.appendChild(newTrack);
      }
    }
  }

  static addNewTrackInTracks(carParams: ICar): void {
    const TRACK_CONTAINER = document.querySelector(
      `.${indexCss.TRACKS_CONTAINER}`
    ) as HTMLElement;
    const newTrack = new Track(carParams.name, carParams.color).configureView(
      Number(carParams.id)
    ) as HTMLElement;

    if (TRACK_CONTAINER.children.length < TracksViewSettings.TRACKS_ROWS) {
      TRACK_CONTAINER.appendChild(newTrack);
    }
  }

  handleSelectBtnClick( selectBtn: HTMLElement, CAR?: HTMLDivElement ): boolean | void {
    const isActive: boolean | undefined = Track.toggleActiveState(selectBtn) ?? undefined;
    singletonEventHandler.selectCarBtn(null, CAR, isActive);
  }

  static toggleActiveState(element: HTMLElement): boolean | void {
    const SELECTED_BTNS: HTMLElement[] = Array.from(
      document.querySelectorAll(`.${trackCss.TOP_SELECT_BTN}`)
    );
    const isElementActive = element.classList.contains(`${IS_ACTIVE}`);

    SELECTED_BTNS.forEach((btn) => {
      if (btn === element) {
        if (isElementActive) {
          btn.classList.remove(`${IS_ACTIVE}`);
        } else {
          btn.classList.add(`${IS_ACTIVE}`);
        }
      } else {
        btn.classList.remove(`${IS_ACTIVE}`);
      }
    });

    return !isElementActive;
  }

  static usedDeleteBtn(): boolean {
    // eslint-disable-next-line no-restricted-globals, no-alert
    return confirm(CONFIRM_DELETE_TEXT);
  }

  static deleteTrackByID(carID: number): void {
    const allTracksInApp: HTMLElement[] = Array.from( document.querySelectorAll(`.${[...defaultTrackParams.classNames]}`));
    const targetTrack = allTracksInApp.find((track) => track.dataset.id === String(carID));

    targetTrack?.remove();
  }

  static async getAndAddNextTrack(): Promise<void> {
    const TRACK_CONTAINER = document.querySelector(`.${indexCss.TRACKS_CONTAINER}`);
    const tracksOnPage = TRACK_CONTAINER?.children.length;

    if (
      tracksOnPage !== undefined &&
      tracksOnPage < TracksViewSettings.TRACKS_ROWS
    ) {
      const lastTrackOnPage = TRACK_CONTAINER?.children[tracksOnPage - 1] as HTMLElement;
      const lastTrackID = Number(lastTrackOnPage.dataset.id);
      const nextCarID = await singletonCarService.getCars().then((carsData):number | null => {
        const targetIndex = carsData.findIndex((el) => el.id === lastTrackID);

        if (targetIndex !== -1 && targetIndex + 1 < carsData.length) {
          const nextObject = carsData[targetIndex + 1];
          return nextObject?.id
        } 
          return null
        
      })

      if(nextCarID) {
        const needTracks = TracksViewSettings.TRACKS_ROWS - tracksOnPage;
        const promises: Promise<ICar | undefined>[] = Array.from(
          { length: needTracks },
          (_, index) => singletonCarService.getCarById(nextCarID + index).catch(() => undefined)
        );
  
          const responses = await Promise.allSettled(promises);
  
          responses.forEach((response) => {
            if (response.status === 'fulfilled' && response.value) {
              Track.addNewTrackInTracks(response.value);
            }
          });
      }

    }
  }

  static isRaceStart(event: Event,startBtn: HTMLButtonElement,stopBtn: HTMLButtonElement): boolean | undefined {
    const { target } = event;
    const currentBtn = target === startBtn ? startBtn : stopBtn;
    const oppositeBtn = currentBtn === startBtn ? stopBtn : startBtn;

    let isStartRace = currentBtn.classList.contains(`${IS_ACTIVE}`);

    if (target === startBtn && isStartRace) {
      return undefined;
    }
    if (target === stopBtn && isStartRace) {
      currentBtn.classList.remove(`${IS_ACTIVE}`);
      oppositeBtn.classList.remove(`${IS_ACTIVE}`);
      isStartRace = false;
    } else if (target === startBtn) {
      currentBtn.classList.add(`${IS_ACTIVE}`);
      oppositeBtn.classList.add(`${IS_ACTIVE}`);
      isStartRace = true;
    } else {
      return undefined;
    }

    return isStartRace;
  }

  static clickAllStartBtns(): void {
    const startBtns: HTMLButtonElement[] = Array.from(
      document.querySelectorAll(`.${trackCss.MID_START_RACE_BTN}`)
    );

    startBtns.forEach((el) => {
      const carID = Number(el.dataset.id);
      el.click();
      const element = document.querySelector(
        `.car[data-id="${carID}"] .car-svg`
      ) as HTMLElement;

      const transitionEndHandler = (): void => {
        singletonEventHandler.winner(carID);
        element.removeEventListener('transitionend', transitionEndHandler);
      };

      element.addEventListener('transitionend', transitionEndHandler);
    });
  }

  static clickAllStopBtns(): void {
    const stopBtns: HTMLButtonElement[] = Array.from( document.querySelectorAll(`.${trackCss.MID_STOP_RACE_BTN}`));

    stopBtns.forEach((el) => el.click());
  }

  static rerenderCarsTrack(): void {
    const TRACK = document.querySelector('.tracks-container') as HTMLElement;
    const numberOfPage = state.getCurrentPageNumber();
    const garageCarsParam: GetWinnersOptions = {
      page: numberOfPage,
      limit: TracksViewSettings.TRACKS_ROWS,
    };

    TRACK.innerHTML = '';

    Track.addAllTracksOnPage(TRACK, garageCarsParam);
  }

  static returnTrackChildrenLength(): number | undefined {
    const TRACK = document.querySelector(`.tracks-container`);
    if (TRACK) {
      return TRACK.children.length;
    }
    return undefined;
  }

  static returnActiveBtnAndCarID(): CarIdWithActiveBtn {
    const SELECTED_BTNS: HTMLElement[] = Array.from(
      document.querySelectorAll(`.${trackCss.TOP_SELECT_BTN}`)
    );
    const ACTIVE_SELECTED_BTN = SELECTED_BTNS.find((el) =>
      el.classList.contains('is-active')
    ) as HTMLElement;
    const result = {
      ACTIVE_BTN: ACTIVE_SELECTED_BTN,
      CAR_ID: Number(ACTIVE_SELECTED_BTN.getAttribute('data-id')),
    };

    return result;
  }

  static toggleRaceAndResetBtns(): void {
    const allStartBtns = document.querySelectorAll(`.${trackCss.MID_START_RACE_BTN}`);
    const RACE_BTN = document.querySelector(`.${controlButtonsCss.RACE}`);
    const RESET_BTN = document.querySelector(`.${controlButtonsCss.RESET}`);
  
    const isRaceActive = Array.from(allStartBtns).some((btn) => btn.classList.contains('is-active'));
  
    RACE_BTN?.classList.toggle(DISABLED_CLASS, isRaceActive);
    RESET_BTN?.classList.toggle(DISABLED_CLASS, !isRaceActive);
  }
}
