import React from 'react';
import { Table, Tag } from 'antd';

const PaymentsCategoriesTable = ({
  paymentCategoryData,
}) => {
  const columns = [{
    title: 'Categorias',
    dataIndex: 'categories',
    key: 'categories',
    render: (categories) => {
      // categories = [{
      //   ...
      //   food_category: {
      //     ...
      //     display_name: 'Pollos',
      //   },
      // }, {
      //   ...
      // }];

      // problem: don read display_name
      return categories.map((category, key) => {
        console.log('plop', category.food_category.display_name);
        return (
          <Tag key={key} >{category.food_category.display_name}</Tag>
        );
      });
    },
  }, {
    title: 'Tipos de Pago',
    dataIndex: 'payment_types',
    key: 'payment_types',
    render: (payments) => (
      payments.map((payment, key) => {
        // problem: don read display_name
        console.log('payment', payment.payment_type.display_name);
        return (
          <Tag key={key} >{payment.payment_type.display_name}</Tag>
        );
      })
    ),
  }];

  return (
    <Table columns={columns} dataSource={paymentCategoryData} />
  );
};

export default PaymentsCategoriesTable;

