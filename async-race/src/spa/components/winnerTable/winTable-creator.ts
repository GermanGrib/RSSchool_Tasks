import './winTable.scss';
import ElementCreator from '../element-creator';
import {
  COLUMNS_IN_TABLE,
  COLUMN_NUMBER,
  HEADER_NAMES,
  WINNERS_LIMIT,
  defaultTableParams,
  headerCellsClasses,
  winTableCss,
} from './variables-winTable';
import singletonCarService from '../../services/carsService/carsService';
import { GetWinnersOptions } from '../../../models/interfaces';
import state from '../../state/state';
import { carParams } from '../car/variables-car';
import {
  EngineStatus,
  LocalSt,
  SortFieldTypes,
  SortOrderTypes,
} from '../../../models/enums';
import singletonEventHandler from '../../controller/controller';

export default class WinnerTable extends ElementCreator {
  constructor() {
    super(defaultTableParams);
  }

  configureView(): HTMLElement | null {
    const HEADER = WinnerTable.createRowElement(winTableCss.HEADER);

    for (let i = 0; i < COLUMNS_IN_TABLE; i++) {
      const CELL = WinnerTable.createCellElement(winTableCss.CELL);
      CELL.textContent = HEADER_NAMES[i];

      if (i === COLUMN_NUMBER.FOURTH) {
        CELL.classList.add(headerCellsClasses.WINS);
      } else if (i === COLUMN_NUMBER.FIFTH) {
        CELL.classList.add(headerCellsClasses.BEST_TIME);
      }

      HEADER.appendChild(CELL);
    }

    HEADER.addEventListener('click', (event) =>
      singletonEventHandler.filterTableData(event)
    );
    this.element?.appendChild(HEADER);
    return this.element;
  }

  static createRowElement(cssStyles: string[]): HTMLElement {
    const rowParams = ElementCreator.getElementParams('div', cssStyles, '');
    return new ElementCreator(rowParams).getElement() as HTMLElement;
  }

  static createCellElement(cssStyles: string[]): HTMLElement {
    const cellParams = ElementCreator.getElementParams('div', cssStyles, '');
    return new ElementCreator(cellParams).getElement() as HTMLElement;
  }

  static async fillWinnersInTable(element: HTMLElement): Promise<void> {
    const elementToRemove = element.firstElementChild;
    while (elementToRemove && elementToRemove.nextElementSibling) {
      element.removeChild(elementToRemove.nextElementSibling);
    }
    const numberOfPage = state.getCurrentPageNumber();
    const lastSortBy = state.getField(LocalSt.LAST_SORT);
    const lastOrderBy = state.getField(LocalSt.ORDER_BY);
    const winnersOptions: GetWinnersOptions = {
      page: numberOfPage,
      limit: WINNERS_LIMIT,
      sort: lastSortBy,
      order: lastOrderBy,
    };
    const currentWinners = await singletonCarService.getWinners(winnersOptions);
    for (let i = 0; i < currentWinners.length; i++) {
      const ROW = WinnerTable.createRowElement(winTableCss.RAW);
      element.appendChild(ROW);
      for (let j = 0; j < COLUMNS_IN_TABLE; j++) {
        const CELL = WinnerTable.createRowElement(winTableCss.CELL);
        ROW.appendChild(CELL);
        if (j === COLUMN_NUMBER.FIRST) {
          CELL.textContent = String(i + 1);
        } else if (j === COLUMN_NUMBER.SECOND) {
          CELL.innerHTML = carParams.textContent;
          singletonCarService.getCarById(currentWinners[i].id).then((car) => {
            CELL.style.color = car.color;
          });
        } else if (j === COLUMN_NUMBER.THIRD) {
          singletonCarService.getCarById(currentWinners[i].id).then((car) => {
            CELL.textContent = car.name;
          });
        } else if (j === COLUMN_NUMBER.FOURTH) {
          CELL.textContent = String(currentWinners[i].wins);
        } else if (j === COLUMN_NUMBER.FIFTH) {
          CELL.textContent = String(currentWinners[i].time);
        }
      }
    }
  }

  static async countTimeToWin(
    carID: number,
    currentWinTime?: number
  ): Promise<number> {
    const winnerCarData = await singletonCarService.setEngineStatusReturnData(
      carID,
      EngineStatus.Started
    );
    const winnerDistance = winnerCarData.distance;
    const winnerVelocity = winnerCarData.velocity;

    const timeInSeconds = Number(
      (winnerDistance / winnerVelocity / 1000).toFixed(2)
    );

    if (currentWinTime) {
      return timeInSeconds > currentWinTime ? currentWinTime : timeInSeconds;
    }

    await singletonCarService.setEngineStatusReturnData(
      carID,
      EngineStatus.Stopped
    );
    return timeInSeconds;
  }

  static async countWins(carID: number): Promise<number> {
    try {
      const currentWinner = await singletonCarService.getWinnerByID(carID);
      let { wins } = currentWinner;
      wins += 1;

      return wins;
    } catch {
      return 1;
    }
  }

  static async isWinnerInTable(carID: number): Promise<boolean> {
    try {
      await singletonCarService.getWinnerByID(carID);
      return true;
    } catch {
      return false;
    }
  }

  static filterTable(event: Event): void {
    const { target } = event;

    if (
      event.currentTarget instanceof HTMLElement &&
      target instanceof HTMLElement
    ) {
      const WINNER_TABLE = event.currentTarget.parentNode as HTMLElement;

      if (target.classList.contains(headerCellsClasses.WINS)) {
        WinnerTable.sortAndFillTable(WINNER_TABLE, SortFieldTypes.WIN);
      } else if (target.classList.contains(headerCellsClasses.BEST_TIME)) {
        WinnerTable.sortAndFillTable(WINNER_TABLE, SortFieldTypes.TIME);
      }
    }
  }

  static sortAndFillTable(
    WINNER_TABLE: HTMLElement,
    sortField: SortFieldTypes
  ): void {
    const order =
      state.getField(LocalSt.ORDER_BY) === SortOrderTypes.SmallToLarge
        ? SortOrderTypes.LargeToSmall
        : SortOrderTypes.SmallToLarge;

    state.setField(LocalSt.LAST_SORT, sortField);
    state.setField(LocalSt.ORDER_BY, order);
    state.saveState();
    WinnerTable.fillWinnersInTable(WINNER_TABLE);
  }
}
