type NewsItem = {
  source: {
    id: string | number;
    name: string;
  };
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  author?: string;
};

type CallbackFunction<T> = (data: T) => void;

enum HttpErrorCode {
  Unauthorized = 401,
  NotFound = 404,
}

export { CallbackFunction, HttpErrorCode, NewsItem };
