import { message } from 'antd';
import { List, fromJS } from 'immutable';
import {
  query,
  getCategories,
  getPaymentTypes,
  create,
  addBusinessPaymentTypes,
  addBusinessCategories,
  addBusinessAddress,
  addBusinessUser,
  editBusiness,
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
        yield put({
          type: 'querySuccess',
          payload: {
            companies: companiesResult.data,
            data_categories: categoriesResult.data,
            data_payment_types: paymentTypesResult.data,
          },
        });
      }
    },
    *create({ payload }, { select, call, put }) {
      const { business_info, business_address, business_payment_types, business_categories } = payload;
      const businessInfoData = yield call(create, { data: { ...business_info, status: 'active' } });
      if (!businessInfoData.success) {
        return;
      }
      const companyId = businessInfoData.data.id;
      const businessPaymentTypesData = yield call(addBusinessPaymentTypes, { data: business_payment_types, params: { id: companyId } });
      if (!businessPaymentTypesData.success) {
        return;
      }
      const businessCategoriesData = yield call(addBusinessCategories, { data: business_categories, params: { id: companyId } });
      if (!businessCategoriesData) {
        return;
      }
      const businessAddressData = yield call(addBusinessAddress, { data: business_address, params: { id: companyId } });
      if (!businessAddressData) {
        return;
      }

      const { data_categories, data_payment_types } = yield select(({ dopanel }) => dopanel);
      const newCompany = {
        ...businessInfoData.data,
        business_payment_types: businessPaymentTypesData.data.map(businessPayment => {
          const { payment_type_id } = businessPayment;
          let dataReturned;
          for (const paymentType of data_payment_types) {
            if (payment_type_id === paymentType.id) {
              dataReturned = {
                ...businessPayment,
                payment_type: paymentType,
              };
              break;
            }
          }
          return dataReturned;
        }),
        business_categories: businessCategoriesData.data.map(businessCategory => {
          const { food_category_id } = businessCategory;
          let dataReturned;
          for (const category of data_categories) {
            if (food_category_id === category.id) {
              dataReturned = {
                ...businessCategory,
                food_category: category,
              };
              break;
            }
          }
          return dataReturned;
        }),
        business_addresses: [businessAddressData.data],
        business_users: [],
      };
      yield put({
        type: 'addCompanyState',
        payload: newCompany,
      });
    },
    *createUser({ payload }, { select, call, put }) {
      const currentCompanyId = yield select(({ dopanel }) => dopanel.currentCompanyId);
      const bussinessUserData = yield call(addBusinessUser, { data: { ...payload, status: 'active' }, params: { id: currentCompanyId } });
      if (bussinessUserData.success) {
        yield put({
          type: 'addCompanyUserState',
          payload: bussinessUserData.data,
        });
      }
    },
    *editCompany({ payload }, { select, call, put }) {
      const currentCompanyId = yield select(({ dopanel }) => dopanel.currentCompanyId);
      const businessInfoData = yield call(editBusiness, { data: { status: payload }, params: { id: currentCompanyId } });
      if (businessInfoData.success) {
        yield put({
          type: 'editCompanyState',
          payload: businessInfoData.data,
        });
      }
    },
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
      const newCompany = fromJS(payload);
      message.success('Se agregó la empresa correctamente');
      return {
        ...state,
        companies: state.companies.push(newCompany),
      };
    },
    addCompanyUserState(state, { payload }) {
      const { currentCompanyId, companies } = state;
      const indexCompany = companies.findIndex(company => company.get('id') === currentCompanyId);
      const newUser = fromJS(payload);

      message.success('Se agregó el usuario correctamente');
      return {
        ...state,
        currentCompanyId: '',
        companies: companies.updateIn([indexCompany, 'business_users'], business_users => business_users.push(newUser)),
      };
    },
    editCompanyState(state, { payload }) {
      const { currentCompanyId, companies } = state;
      const indexCompany = companies.findIndex(company => company.get('id') === currentCompanyId);
      message.success('Se modificó el estado de la empresa correctamente');
      return {
        ...state,
        currentCompanyId: '',
        companies: companies.updateIn([indexCompany], company => company.merge(payload)),
      };
    },
    editCurrentCompanyId(state, { payload }) {
      return {
        ...state,
        ...payload,
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
