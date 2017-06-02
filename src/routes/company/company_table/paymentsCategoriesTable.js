import React from 'react';
import { Table, Tag } from 'antd';

const PaymentsCategoriesTable = ({
  paymentCategoryData,
}) => {
  const columns = [{
    title: 'Categorias',
    dataIndex: 'categories',
    key: 'categories',
    render: (categories) => (
      categories.map((category, key) => (
        <Tag color="blue" key={key} >{category.food_category.display_name}</Tag>
      ))
    ),
  }, {
    title: 'Tipos de Pago',
    dataIndex: 'payment_types',
    key: 'payment_types',
    render: (payments) => (
      payments.map((payment, key) => (
        <Tag color="blue" key={key} >{payment.payment_type.display_name}</Tag>
      ))
    ),
  }];

  return (
    <Table
      rowKey={record => record.key}
      columns={columns}
      dataSource={paymentCategoryData}
      pagination={false}
      bordered
      size="small"
    />
  );
};

export default PaymentsCategoriesTable;

