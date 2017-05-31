import { List, fromJS } from 'immutable';
import {
  query,
  getCategories,
  getPaymentTypes,
  create,
  addBussinessPaymentTypes,
  addBussinessCategories,
  addBussinessAddress,
  addBussinessUser,
} from '../services/company';

export default {
  namespace: 'dopanel',
  state: {
    companies: new List(),
    data_categories: {},
    data_payment_types: {},
    modalUserVisible: false,
    modalVisible: false,
    modalType: 'add', // add or edit
    currentCompanyId: '',
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
      if (companiesResult) {
        console.log('data fetched -> ', companiesResult.data);
        yield put({
          type: 'querySuccess',
          payload: {
            companies: companiesResult.data, // initial state
            data_categories: categoriesResult.data,
            data_payment_types: paymentTypesResult.data,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      const { business_info, business_address, business_payment_types, business_categories } = payload;
      const businessInfoData = yield call(create, { data: { ...business_info, status: 'active' } });
      if (!businessInfoData.success) {
        return;
      }
      const companyId = businessInfoData.data.id;
      const businessPaymentTypesData = yield call(addBussinessPaymentTypes, { data: business_payment_types, params: { id: companyId } });
      if (!businessPaymentTypesData.success) {
        return;
      }
      const businessCategoriesData = yield call(addBussinessCategories, { data: business_categories, params: { id: companyId } });
      if (!businessCategoriesData) {
        return;
      }
      const businessAddressData = yield call(addBussinessAddress, { data: business_address, params: { id: companyId } });
      if (!businessAddressData) {
        return;
      }
      yield put({
        type: 'addCompanyState',
        payload: businessInfoData.data, // this only saves the company info, it's not necesarry to save all the company data by now
      });
    },
  },
  *createUser({ payload }, { select, call, put }) {
    console.log('asdasdasdasda');
    const currentCompanyId = yield select(({ dopanel }) => dopanel.currentCompanyId);
    const bussinessUserData = yield call(addBussinessUser, { data: { ...payload, status: 'active' }, params: { id: currentCompanyId } });
    console.log('return',bussinessUserData.success);
    if (bussinessUserData.success) {
      yield put({
        type: 'addCompanyUserState',
        payload: bussinessUserData.data,
      });
    }
  },
  reducers: {
    querySuccess(state, { payload }) {
      const { companies } = payload;
      return {
        ...state,
        ...payload,
        companies: fromJS(companies),
      };
    },
    addCompanyState(state, { payload }) {
      const newCompany = fromJS(payload); // payload must containt only information of the company
      return {
        ...state,
        companies: state.companies.push(newCompany), // maybe there are problemas here
      };
    },
    addCompanyUserState(state, { payload }) {
      const { currentCompanyId, companies } = state;
      const indexCompany = companies.findIndex(company => company.get('id') === currentCompanyId);
      const newUser = fromJS(payload);

      return {
        ...state,
        currentCompanyId: '',
        companies: companies.updateIn([indexCompany, 'business_users'], business_users => business_users.push(newUser)),
      };
    },
    showUserModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalUserVisible: true,
      };
    },
    closeUserModal(state) {
      return {
        ...state,
        modalUserVisible: false,
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
