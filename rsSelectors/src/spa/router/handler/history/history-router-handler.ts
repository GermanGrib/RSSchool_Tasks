import { CallbackFunction } from '../../../../models/interfaces';
import { RouterHandlerParam } from '../../../../models/types';
import DefaultRouterHandler from '../default-router-handler';

export default class HistoryRouterHandler extends DefaultRouterHandler {
  constructor(callbackRouter: CallbackFunction) {
    const handlerParams: RouterHandlerParam = {
      nameEvent: 'popstate',
      locationField: 'pathname',
      callback: callbackRouter,
    };
    super(handlerParams);
    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.navigate('');
    });
  }

}
