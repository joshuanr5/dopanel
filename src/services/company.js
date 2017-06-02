import { request, config } from '../utils';

const {
  api: {
    businesses,
    categoriesList,
    paymentTypesList,
    businessPaymentType,
    businessCategories,
    businessAddress,
    businessUser,
    business,
  },
} = config;

export function query() {
  return request({
    url: businesses,
    method: 'get',
  });
}

export function create({ data }) {
  return request({
    url: businesses,
    method: 'post',
    data,
  });
}

export function getCategories() {
  return request({
    url: categoriesList,
    method: 'get',
  });
}

export function getPaymentTypes() {
  return request({
    url: paymentTypesList,
    method: 'get',
  });
}

export function addBusinessPaymentTypes({ data, params }) {
  return request({
    url: businessPaymentType,
    method: 'post',
    data,
    params,
  });
}

export function addBusinessCategories({ data, params }) {
  return request({
    url: businessCategories,
    method: 'post',
    data,
    params,
  });
}

export function addBusinessAddress({ data, params }) {
  return request({
    url: businessAddress,
    method: 'post',
    data,
    params,
  });
}

export function addBusinessUser({ data, params }) {
  return request({
    url: businessUser,
    method: 'post',
    data,
    params,
  });
}

export function editBusiness({ data, params }) {
  return request({
    url: business,
    method: 'patch',
    data,
    params,
  });
}
