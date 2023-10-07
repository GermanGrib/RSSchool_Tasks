import { ElementParams } from '../../../models/types';

const DECIMAL_SYSTEM = 10;
const pageTitleCss = ['page-title'];
const defaultTitleParams: ElementParams = {
  tag: 'h1',
  classNames: pageTitleCss,
  textContent: '',
};

const defaultPageValue = '1';
const garagePageTitle = 'Garage';
const winnerPageTitle = 'Winners';

export {
  pageTitleCss,
  garagePageTitle,
  winnerPageTitle,
  defaultTitleParams,
  defaultPageValue,
  DECIMAL_SYSTEM,
};
