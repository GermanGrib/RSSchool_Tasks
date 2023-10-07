import { CallbackFunction } from '../../../../models/interfaces';
import { RouterHandlerParam } from '../../../../models/types';
import DefaultRouterHandler from '../default-router-handler';

export default class HashRouterHandler extends DefaultRouterHandler {
  constructor(callbackRouter: CallbackFunction) {
    const handlerParams: RouterHandlerParam = {
      nameEvent: 'hashchange',
      locationField: 'hash',
      callback: callbackRouter,
    };
    super(handlerParams);
  }
}
