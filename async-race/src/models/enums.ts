enum ErrorStatusCode {
  NOT_FOUND = 404,
  TOO_MANY_REQUEST = 429,
  INTERNAL_SERVER_ERROR = 500,
}

enum EngineStatus {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}

enum Methods {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

enum TracksViewSettings {
  TRACKS_ROWS = 7,
  WINNERS_ROW = 10,
}

enum ClassListMethods {
  ADD = 'add',
  REMOVE = 'remove',
}

enum SortOrderTypes {
  SmallToLarge = 'ASC',
  LargeToSmall = 'DESC',
}

enum SortFieldTypes {
  ID = 'id',
  WIN = 'wins',
  TIME = 'time',
}

enum LocalSt {
  CURRENT_PAGE_NAME = 'currentAppPage',
  LAST_SORT = 'last-sort-by',
  ORDER_BY = 'win-table-order-by',
  TRACKS_PAGE_NUMBER = 'currentPageNumber',
}

export {
  ErrorStatusCode,
  EngineStatus,
  Methods,
  TracksViewSettings,
  ClassListMethods,
  SortOrderTypes,
  SortFieldTypes,
  LocalSt,
};
