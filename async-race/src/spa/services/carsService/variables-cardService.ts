const MAIN_URL = 'http://127.0.0.1:3000';
const GARAGE_SUFFIX = '/garage';
const ENGINE_SUFFIX = '/engine';
const WINNERS_SUFFIX = '/winners';
const CANT_FIND_CAR_IN_GARAGE = `I can't find this car in the garage`;
const CANT_FIND_CAR_IN_WINNER = `I can't find this car in the winner list`;
const CANT_DELETE_CAR_FROM_GARAGE = `This car does not exist in our garage`;
const UNEXPECTED_ERROR = 'Unexpected error';
const CANNOT_DRIVE_IF_ALREADY_RUN = `Drive already in progress. You can't run drive for the same car twice while it's not stopped`;
const ENGINE_WAS_BROKEN = `Car has been stopped suddenly. It's engine was broken down.`;
const CANT_DUPLICATE_ID = `Error: Insert failed, duplicate id`;

export {
  MAIN_URL,
  ENGINE_SUFFIX,
  GARAGE_SUFFIX,
  WINNERS_SUFFIX,
  CANT_FIND_CAR_IN_GARAGE,
  CANT_FIND_CAR_IN_WINNER,
  CANT_DUPLICATE_ID,
  CANT_DELETE_CAR_FROM_GARAGE,
  CANNOT_DRIVE_IF_ALREADY_RUN,
  ENGINE_WAS_BROKEN,
  UNEXPECTED_ERROR,
};
