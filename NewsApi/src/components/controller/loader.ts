import { CallbackFunction, HttpErrorCode } from '../models/types';
import { LoaderOptions } from '../models/interfaces';

class Loader {
  constructor(private baseLink: string, private options: LoaderOptions) {}

  public getResp<T>(
    { endpoint, options = {} }: { endpoint: string; options?: LoaderOptions },
    callback: CallbackFunction<T> = (): void => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load<T>('GET', endpoint, callback, options);
  }

  private errorHandler = (res: Response): Response => {
    if (!res.ok) {
      if (res.status === HttpErrorCode.Unauthorized || res.status === HttpErrorCode.NotFound) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  };

  private makeUrl(options: LoaderOptions, endpoint: string): string {
    const urlOptions: LoaderOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(method: string, endpoint: string, callback: CallbackFunction<T>, options: LoaderOptions = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
