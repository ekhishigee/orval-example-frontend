import env from '@/env';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = env.VITE_BACKEND_BASE_URL;

export const AXIOS_INSTANCE = Axios.create({ baseURL });

export const customBackendInstance = <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    (response: AxiosResponse<T>) => response.data
  );

  // @ts-expect-error Property 'cancel' does not exist on type 'Promise<any>'
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
};

export default customBackendInstance;

export type ErrorType<Error> = AxiosError<Error>
