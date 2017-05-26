import { request, config } from '../utils';

const {
  api: {
    businesses,
  categoriesList,
  paymentTypesList,
  },
} = config;

export async function query() {
  return request({
    url: businesses,
    method: 'get',
  });
}

export async function create({ data }) {
  return request({
    url: businesses,
    method: 'post',
    data,
  });
}

export async function getCategories() {
  return request({
    url: categoriesList,
    method: 'get',
  });
}

export async function getPaymentTypes() {
  return request({
    url: paymentTypesList,
    method: 'get',
  })
}
