import { RouterHandlerParam, RequestParams } from '../../../models/types';

export default class DefaultRouterHandler {
  params: RouterHandlerParam;

  constructor(params: RouterHandlerParam) {
    this.params = params;
  }

  disable(): void {
    window.removeEventListener(this.params.nameEvent, this.params.callback as EventListener);
  }

  navigate(url: string): void {
    const urlString = url || (window.location[this.params.locationField as keyof Location]?.toString() || '').slice(1);
    const path = urlString.split('/');
    const result: RequestParams = {};
    [result.base = '', result.path = '', result.resource = ''] = path;

    this.params.callback(result);
  }
}
