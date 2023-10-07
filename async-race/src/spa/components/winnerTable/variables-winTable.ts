import { ElementParams } from '../../../models/types';

const defaultTableParams: ElementParams = {
  tag: 'div',
  classNames: ['winner-table'],
  textContent: '',
};

const headerCellsClasses = {
  WINS: 'cell-wins',
  BEST_TIME: 'cell-best-time',
};

const winTableCss = {
  HEADER: ['winner-table__header'],
  RAW: ['winner-table__raw'],
  CELL: ['winner-table__cell'],
};

const HEADER_NAMES = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
const COLUMNS_IN_TABLE = 5;
const WINNERS_LIMIT = 10;

const COLUMN_NUMBER = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
  FOURTH: 3,
  FIFTH: 4,
};

export {
  defaultTableParams,
  winTableCss,
  HEADER_NAMES,
  COLUMNS_IN_TABLE,
  WINNERS_LIMIT,
  COLUMN_NUMBER,
  headerCellsClasses,
};
