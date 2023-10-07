import ElementCreator from '../spa/components/element-creator';

type RouteType = {
  path: string;
  callback: () => Promise<void>;
};

type ViewParams = {
  tag: string;
  classNames: string[];
};

type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  callback?: ((event?: Event | undefined) => void) | null;
};

type ElementOrCreator = HTMLElement | ElementCreator;

type PositiveNumber = number extends 0 ? never : number;

type Page = {
  name: string;
  callback: CallableFunction | null;
};

type SortOrder = 'ASC' | 'DESC';
type SortField = 'id' | 'wins' | 'time';
type WinnersData = {
  [K in SortField]: number;
};

type CarIdWithActiveBtn = {
  ACTIVE_BTN: HTMLElement;
  CAR_ID: number;
};

export {
  ElementParams,
  Page,
  ViewParams,
  ElementOrCreator,
  PositiveNumber,
  SortField,
  SortOrder,
  WinnersData,
  CarIdWithActiveBtn,
  RouteType,
};
