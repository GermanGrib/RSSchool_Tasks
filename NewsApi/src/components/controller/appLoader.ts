import { apiLink, myApiKey } from '../models/variables';
import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super(apiLink, {
      apiKey: myApiKey,
    });
  }
}

export default AppLoader;
