import { EngineStatus, ErrorStatusCode, Methods } from '../../../models/enums';
import { GetWinnersOptions, ICar, IEngine } from '../../../models/interfaces';
import { PositiveNumber, WinnersData } from '../../../models/types';
import { createRequestOptions } from '../variables-services';
import {
  CANNOT_DRIVE_IF_ALREADY_RUN,
  CANT_DELETE_CAR_FROM_GARAGE,
  CANT_DUPLICATE_ID,
  CANT_FIND_CAR_IN_GARAGE,
  CANT_FIND_CAR_IN_WINNER,
  ENGINE_SUFFIX,
  ENGINE_WAS_BROKEN,
  GARAGE_SUFFIX,
  MAIN_URL,
  UNEXPECTED_ERROR,
  WINNERS_SUFFIX,
} from './variables-cardService';

class CarService {
  url: string;

  constructor() {
    this.url = MAIN_URL;
  }

  async createCar(carParams: ICar): Promise<ICar> {
    const requestOptions = createRequestOptions(Methods.POST, carParams);
    const response: Response = await fetch(
      `${this.url}${GARAGE_SUFFIX}`,
      requestOptions
    );

    if (response.ok) {
      return carParams;
    }
    throw new Error(`${UNEXPECTED_ERROR}`);
  }

  async updateCar(carID: PositiveNumber, carParams: ICar): Promise<Response> {
    const requestOptions = createRequestOptions(Methods.PUT, carParams);
    const response: Response = await fetch(
      `${this.url}${GARAGE_SUFFIX}/${carID}`,
      requestOptions
    );

    if (response.ok) {
      return response;
    }
    if (response.status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(
        `${ErrorStatusCode.NOT_FOUND} ${CANT_FIND_CAR_IN_GARAGE}`
      );
    } else {
      throw new Error(`${UNEXPECTED_ERROR}`);
    }
  }

  async deleteCarByID(carID: PositiveNumber): Promise<Response> {
    const response: Response = await fetch(
      `${this.url}${GARAGE_SUFFIX}/${carID}`,
      { method: Methods.DELETE }
    );

    if (response.ok) {
      return response;
    }
    if (response.status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(
        `${ErrorStatusCode.NOT_FOUND} ${CANT_DELETE_CAR_FROM_GARAGE}`
      );
    } else {
      throw new Error(`${UNEXPECTED_ERROR}`);
    }
  }

  async getCars(options?: GetWinnersOptions): Promise<ICar[]> {
    let path = GARAGE_SUFFIX;

    if (options) {
      if (options.page !== undefined) {
        path += `?_page=${options.page}`;
      }

      if (options.limit !== undefined) {
        path += `&_limit=${options.limit}`;
      }
    }

    const response: Response = await fetch(`${this.url}${path}`);

    if (response.ok) {
      const carsData = await response.json();

      return carsData;
    }
    throw new Error(`${UNEXPECTED_ERROR}`);
  }

  async getCarById(carID: PositiveNumber): Promise<ICar> {
    const response: Response = await fetch(
      `${this.url}${GARAGE_SUFFIX}/${carID}`
    );

    if (response.ok) {
      const carsData = await response.json();
      return carsData;
    }
    if (response.status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(
        `${ErrorStatusCode.NOT_FOUND} ${CANT_FIND_CAR_IN_GARAGE}`
      );
    } else {
      throw new Error(`${UNEXPECTED_ERROR}`);
    }
  }

  async setEngineStatusReturnData(
    carID: PositiveNumber,
    status: EngineStatus.Started | EngineStatus.Stopped
  ): Promise<IEngine> {
    const requestOptions = { method: Methods.PATCH };
    const response: Response = await fetch(
      `${this.url}${ENGINE_SUFFIX}?id=${carID}&status=${status}`,
      requestOptions
    );

    if (response.ok) {
      const engineData = await response.json();
      return engineData;
    }
    if (response.status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(`${response.status} ${CANT_FIND_CAR_IN_GARAGE}`);
    } else {
      throw new Error(`${response.status} ${UNEXPECTED_ERROR}`);
    }
  }

  async startDriveReturnStatus(
    carID: PositiveNumber
  ): Promise<{ success: boolean }> {
    const requestOptions = { method: Methods.PATCH };
    const response: Response = await fetch(
      `${this.url}${ENGINE_SUFFIX}?id=${carID}&status=${EngineStatus.Drive}`,
      requestOptions
    );
    const { status } = response;

    if (response.ok) {
      const engineData = await response.json();
      return engineData;
    }
    if (status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(`${status} ${CANT_FIND_CAR_IN_GARAGE}`);
    } else if (status === ErrorStatusCode.TOO_MANY_REQUEST) {
      throw new Error(`${status} ${CANNOT_DRIVE_IF_ALREADY_RUN}`);
    } else if (status === ErrorStatusCode.INTERNAL_SERVER_ERROR) {
      throw new Error(`${status} ${ENGINE_WAS_BROKEN}`);
    } else {
      throw new Error(`${UNEXPECTED_ERROR}`);
    }
  }

  async getWinners(options?: GetWinnersOptions): Promise<WinnersData[]> {
    let path = WINNERS_SUFFIX;

    if (options) {
      if (options.page !== undefined) {
        path += `?_page=${options.page}`;
      }

      if (options.limit !== undefined) {
        path += `&_limit=${options.limit}`;
      }

      if (options.sort !== undefined) {
        path += `&_sort=${options.sort}`;
      }

      if (options.order !== undefined) {
        path += `&_order=${options.order}`;
      }
    }

    const response = await fetch(`${this.url}${path}`);

    if (response.ok) {
      const winnersData = await response.json();
      return winnersData;
    }
    throw new Error(`${UNEXPECTED_ERROR}`);
  }

  async getWinnerByID(carID: PositiveNumber): Promise<WinnersData> {
    const response = await fetch(`${this.url}${WINNERS_SUFFIX}/${carID}`);
    const { status } = response;

    if (response.ok) {
      const winnerData = await response.json();

      return winnerData;
    }
    if (status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(`${status} ${CANT_FIND_CAR_IN_GARAGE}`);
    } else {
      throw new Error(`${UNEXPECTED_ERROR}`);
    }
  }

  async createWinner(carParams: WinnersData): Promise<Response> {
    const requestOptions = createRequestOptions(Methods.POST, carParams);
    const response = await fetch(
      `${this.url}${WINNERS_SUFFIX}`,
      requestOptions
    );

    if (response.ok) {
      return response;
    }
    if (response.status === ErrorStatusCode.INTERNAL_SERVER_ERROR) {
      throw new Error(
        `${ErrorStatusCode.INTERNAL_SERVER_ERROR} ${CANT_DUPLICATE_ID}`
      );
    } else {
      throw new Error(`${response.status} ${UNEXPECTED_ERROR}`);
    }
  }

  async deleteWinnerByID(carID: PositiveNumber): Promise<Response> {
    const response: Response = await fetch(
      `${this.url}${WINNERS_SUFFIX}/${carID}`,
      { method: Methods.DELETE }
    );

    if (response.ok) {
      return response;
    }
    if (response.status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(
        `${ErrorStatusCode.NOT_FOUND} ${CANT_FIND_CAR_IN_WINNER}`
      );
    } else {
      throw new Error(`${UNEXPECTED_ERROR}`);
    }
  }

  async updateWinnerByID(
    carID: PositiveNumber,
    data: WinnersData
  ): Promise<Response> {
    const requestOptions = createRequestOptions(Methods.PUT, data);
    const response = await fetch(
      `${this.url}${WINNERS_SUFFIX}/${carID}`,
      requestOptions
    );
    const { status } = response;

    if (response.ok) {
      return response;
    }
    if (status === ErrorStatusCode.NOT_FOUND) {
      throw new Error(`${status} ${CANT_FIND_CAR_IN_WINNER}`);
    } else {
      throw new Error(`${UNEXPECTED_ERROR}`);
    }
  }
}

const singletonCarService = new CarService();

export default singletonCarService;
