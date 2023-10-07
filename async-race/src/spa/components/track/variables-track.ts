import { ElementParams } from '../../../models/types';

const CONFIRM_DELETE_TEXT =
  'are you sure that you want delete this beautiful car from your garage?';
const IS_ACTIVE = 'is-active';
const defaultTrackParams: ElementParams = {
  tag: 'div',
  classNames: ['track'],
  textContent: '',
};

const trackCss = {
  TRACK_CONTAINER: ['track__container'],
  CONTROLLERS_CONTAINER: ['controllers__container'],
  TOP_CONTROLLERS_CONTAINER: ['top-controllers-container', 'top-controllers'],
  TOP_SELECT_BTN: ['top-controllers__select-btn'],
  TOP_REMOVE_BTN: ['top-controllers__remove-btn'],
  TOP_CAR_NAME: ['top-controllers__car-name'],
  MIDDLE_CONTROLLERS_CONTAINER: [
    'middle-controllers-container',
    'middle-controllers',
  ],
  MID_START_RACE_BTN: ['middle-controllers__start-race'],
  MID_STOP_RACE_BTN: ['middle-controllers__stop-race'],
};

const btnsText = {
  SELECT: 'SELECT',
  REMOVE: 'REMOVE',
  START_RACE: 'A',
  STOP_RACE: 'B',
};

export {
  defaultTrackParams,
  trackCss,
  btnsText,
  IS_ACTIVE,
  CONFIRM_DELETE_TEXT,
};
