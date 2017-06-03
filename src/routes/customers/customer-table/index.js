import React from 'react';
import { Table } from 'antd';

import './index.less';

const CustomerTable = ({
  customers,
}) => {
  const customerColumns = [{
    title: 'Nombre completo',
    render: (_, record) => (`${record.first_name} ${record.last_name}`),
  }, {
    title: 'Nro. Celular',
    dataIndex: 'phone_number',
  }, {
    title: 'Correo electrónico',
    dataIndex: 'email',
  }, {
    title: 'Direccion',
    dataIndex: 'customer_addresses',
    render: (addresses) => {
      const address = addresses[0];
      return address.address_name;
    },
  }];
  return (
    <Table
      rowKey={record => record.id}
      dataSource={customers}
      columns={customerColumns}
      pagination={false}
      size="small"
      scroll={{ x: 630 }}
    />
  );
};

export default CustomerTable;
