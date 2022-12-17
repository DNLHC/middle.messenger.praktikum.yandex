import { querifyData } from 'src/utils/querify-data';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  data?: Record<string, unknown>;
  method: Methods;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
};

type MethodOptions = Omit<Options, 'method'>;

export class HTTPTransport {
  get(url: string, options: MethodOptions = {}) {
    const urlWithQueries = `${url}${querifyData(options.data)}`;
    return this.fetch(urlWithQueries, { ...options, method: Methods.GET });
  }

  post(url: string, options: MethodOptions = {}) {
    return this.fetch(url, { ...options, method: Methods.POST });
  }

  put(url: string, options: MethodOptions = {}) {
    return this.fetch(url, { ...options, method: Methods.PUT });
  }

  delete(url: string, options: MethodOptions = {}) {
    return this.fetch(url, { ...options, method: Methods.DELETE });
  }

  fetch(url: string, options: Options) {
    return this._fetchWithRetry(url, options);
  }

  private _fetchWithRetry(url: string, options: Options): Promise<unknown> {
    const { retries = 1 } = options;

    const onError = () => {
      const triesLeft = retries - 1;
      if (!triesLeft) {
        throw new Error('Failed to request');
      }

      return this._fetchWithRetry(url, { ...options, retries: triesLeft });
    };

    // eslint-disable-next-line promise/prefer-await-to-then
    return this._request(url, options).catch(onError);
  }

  private _request(url: string, options: Options) {
    const {
      method = Methods.GET,
      data,
      headers = {},
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
