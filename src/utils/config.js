export default {
  baseURL: 'http://192.168.1.29:3000/api',
  openPages: ['/login'],
  apiPrefix: '/api',
  api: {
    // dopanel model
    businesses: '/business/\\?filter={"include":["business_addresses",{"business_payment_types":"payment_type"},{"business_categories":"food_category"},"business_users"]}',
    categoriesList: '/food_category',
    paymentTypesList: '/payment_type',
    businessCategories: '/business/:id/business_categories',
    businessPaymentType: '/business/:id/business_payment_types',
    businessAddress: '/business/:id/business_addresses',
    businessUser: '/business/:id/business_users',
    business: '/business/:id',

    // customers model
    customers: '/customer/\\?filter={"include":["customer_addresses"]}',
  },
};
