import { request, config } from '../utils';

const {
  api: {
    customers,
  },
} = config;

export function query() {
  return request({
    url: customers,
    method: 'get',
  });
}
