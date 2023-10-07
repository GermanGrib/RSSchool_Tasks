import { Methods } from '../../models/enums';
import { RequestOptions } from '../../models/interfaces';

function createRequestOptions(
  method: Methods,
  element: unknown
): RequestOptions {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(element),
  };
}

export { createRequestOptions };
