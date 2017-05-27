import { List, fromJS } from 'immutable';
import {
  query,
  getCategories,
  getPaymentTypes,
  create,
} from '../services/company';

export default {
  namespace: 'dopanel',
  state: {
    companies: List(),
    data_categories: {},
    data_payment_types: {},
    modalVisible: false,
    modalType: 'add', // add or edit
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const companiesResult = yield call(query);
      const categoriesResult = yield call(getCategories);
      const paymentTypesResult = yield call(getPaymentTypes);
      console.log('ads');
      if (companiesResult) {
        yield put({
          type: 'querySuccess',
          payload: {
            companies: List.of(companiesResult.data), // iniciando state
            data_categories: categoriesResult.data,
            data_payment_types: paymentTypesResult.data,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      const { business_info } = payload;
      const data = yield call(create, { data: business_info });
      if (data.success) {
        yield put({
          type: 'addCompanyState',
          payload: data.data,
        });
      }
    },
  },
  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    addCompanyState(state, { payload }) {
      const newCompany = fromJS(payload); //
      return {
        ...state,
        companies: state.companies.push(newCompany), //
      };
    },
    showModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true,
      };
    },
    closeModal(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
  },
};
