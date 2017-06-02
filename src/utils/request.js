import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { baseURL } from './config';

axios.defaults.baseURL = baseURL;

const fetch = (options) => {
  const {
    method = 'get',
    data = {},
    params = {},
  } = options;
  let { url } = options;
  const cloneData = cloneDeep(data);

  try {
    let domin = '';
    // if url comes with schema `http://...`then
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(params);

    // delete param attributes only when data is object
    if (!Array.isArray(cloneData)) {
      for (const item of match) {
        if (item instanceof Object && item.name in cloneData) {
          // removes param attributes from payload
          delete cloneData[item.name];
        }
      }
    }

    url = domin + url;
  } catch (e) {
    message.error(e.message);
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        data: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

export default options => fetch(options).then((response) => {
  const { statusText, status } = response;
  const { data } = response;
  return {
    success: true,
    status,
    message: statusText,
    data,
  };
}).catch((error) => {
  const { response } = error;
  let msg;
  let status;
  let otherData = {};
  if (response) {
    const { data, statusText } = response;
    otherData = data;
    status = response.status;
    msg = data.message || statusText;
  } else {
    status = 600;
    msg = 'Network Error';
  }

  return {
    success: false,
    status,
    message: msg,
    data: otherData,
  };
});
