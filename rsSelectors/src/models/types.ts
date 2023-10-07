import ElementCreator from '../spa/components/element-creator';

type ElementParams = {
  tag: string;
  classNames: string[];
  textContent: string;
  callback?: ((event?: Event | undefined) => void) | null;
};

type ViewParams = {
  tag: string;
  classNames: string[];
};

type RequestParams = {
  base?: string;
  path?: string;
  resource?: string;
};

type RouterHandlerParam = {
  nameEvent: string;
  locationField: string;
  callback: (result?: RequestParams) => void;
};

type cardInfoType = {
  id: string;
  level: string;
  task: string;
  answer?: string | string[];
  explanation?: string;
  levelPassed?: string;
  passedWithHelp?: string;
};

type Page = {
  name: string;
  callback: CallableFunction;
};

type ElementOrCreator = HTMLElement | ElementCreator;

type LocalStCurrentInfo = {
  id: string;
  task: string;
  levelPassed: string;
  passedWithHelp: string;
};

export {
  ElementParams,
  ViewParams,
  cardInfoType,
  RequestParams,
  RouterHandlerParam,
  Page,
  ElementOrCreator,
  LocalStCurrentInfo,
};
