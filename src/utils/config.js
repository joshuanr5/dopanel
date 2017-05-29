export default {
  baseURL: 'http://192.168.1.26:3000/api',
  openPages: ['/login'],
  apiPrefix: '/api',
  api: {
    businesses: '/business',
    categoriesList: '/food_category',
    paymentTypesList: '/payment_type',
    businessCategories: '/business/:id/business_categories',
    businessPaymentType: '/business/:id/business_payment_types',
    businessAddress: '/business/:id/business_addresses',
  },
};
