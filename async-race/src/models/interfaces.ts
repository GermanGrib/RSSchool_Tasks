import { Methods, SortFieldTypes, SortOrderTypes } from './enums';

interface CallbackMouseFunction {
  (event: MouseEvent): void;
}

interface Pages {
  INDEX: string;
  WINNER: string;
  NOT_FOUND: string;
}

interface ICar {
  name: string;
  color: string;
  id: number | null;
}

interface IEngine {
  velocity: number;
  distance: number;
}

interface GetWinnersOptions {
  page?: number;
  limit?: number;
  sort?: SortFieldTypes | string;
  order?: SortOrderTypes | string;
}

interface CurrentStateValues {
  currentCreateInput: string;
  currentColorCreateInput: string;
  currentUpdateInput: string;
  currentColorUpdateInput: string;
}

interface RequestOptions {
  method: Methods;
  headers: {
    'Content-Type': 'application/json';
  };
  body: string;
}

export {
  CallbackMouseFunction,
  Pages,
  ICar,
  IEngine,
  GetWinnersOptions,
  CurrentStateValues,
  RequestOptions,
};
