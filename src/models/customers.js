import { List, fromJS } from 'immutable';

import {
  query,
} from '../services/customer';

export default {
  namespace: 'customer',
  state: {
    customers: new List(),
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const dataResult = yield call(query);
      if (dataResult.success) {
        yield put({
          type: 'querySuccess',
          payload: dataResult.data,
        });
      }
    },
  },
  reducers: {
    querySuccess(state, { payload }) {
      const data = fromJS(payload);
      return {
        ...state,
        customers: data,
      };
    },
  },
};
