import { AxiosResponse } from 'axios';

export function MockAxiosResponse<T>(data: T) {
  const mockResponse: AxiosResponse<T> = {
    data,
    headers: {},
    config: { url: 'http://localhost:3000/mockUrl' },
    status: 200,
    statusText: 'OK',
  };
  return mockResponse;
}
