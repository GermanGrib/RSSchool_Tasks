import { ElementParams } from '../../../models/types';

const defaultColorInputValue = '#000000';
const consoleParams: ElementParams = {
  tag: 'div',
  classNames: ['console'],
  textContent: '',
};

const DISABLED_CLASS = 'disabled';

const consoleContainerCss = ['console__container'];

const defaultFormCss = {
  FORM: ['form'],
  COLOR: ['form__set-color'],
  SET_NAME: ['form__set-name'],
};

const createCarFormCss = {
  FORM: ['create-car'],
  INPUT: ['create-car__set-name'],
  COLOR: ['create-car__set-color'],
  BTN: ['create-car__create-btn'],
};

const updateCarFormCss = {
  FORM: ['update-car', 'disabled'],
  INPUT: ['update-car__set-name'],
  COLOR: ['update-car__set-color'],
  BTN: ['update-car__update-btn'],
};

const controlButtonsCss = {
  CONTAINER: ['console__control-btns', 'control-btns'],
  RACE: ['control-btns__race'],
  RESET: ['control-btns__reset', 'disabled'],
  GENERATE_CARS: ['control-btns__generate-cars'],
};

const consoleBtnTexts = {
  createBtn: 'CREATE',
  updateBtn: 'UPDATE',
  race: 'RACE',
  reset: 'RESET',
  generateCars: 'GENERATE CARS',
};

const StateNames = {
  NAME_IN_CREATE_INPUT: 'name-in-create-input',
  COLOR_IN_CREATE_INPUT: 'color-in-create-input',

  NAME_IN_UPDATE_INPUT: 'name-in-update-input',
  COLOR_IN_UPDATE_INPUT: 'color-in-update-input',
};

export {
  consoleParams,
  createCarFormCss,
  consoleBtnTexts,
  defaultFormCss,
  updateCarFormCss,
  controlButtonsCss,
  consoleContainerCss,
  StateNames,
  defaultColorInputValue,
  DISABLED_CLASS,
};
