interface CallbackMouseFunction {
  (event: MouseEvent): void;
}

interface CallbackFunction {
  (): void;
}

interface Route {
  path: string;
  callback: (resource: string) => void;
}

interface Pages {
  INDEX: string;
  PRODUCT: string;
  NOT_FOUND: string;
}

export { CallbackMouseFunction, CallbackFunction, Pages, Route };
