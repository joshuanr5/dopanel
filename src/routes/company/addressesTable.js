import React from 'react';
import { Table } from 'antd';

import WorkingTimeTable from './workingTimeTable';

const AddressesTable = ({
  addressesData,
}) => {
  const columns = [{
    title: 'Información de los locales',
    children: [{
      title: 'Alias',
      dataIndex: 'business_alias',
      key: 'business_alias',
    }, {
      title: 'Dirección',
      dataIndex: 'address_name',
      key: 'address_name',
    }, {
      title: 'Horarios',
      dataIndex: 'working_time',
      key: 'working_time',
      render: (days) => {
        const expandedRowRender = () => {
          return <WorkingTimeTable workingTimeData={days} />;
        };
        const wtColumns = [{
          title: '',
          dataIndex: 'working_time_details',
          key: 'working_time_details',
        }];

        const dataSource = [{
          key: 'asdasd',
          working_time_details: 'Detalles',
        }];


        return (
          <Table
            rowKey={record => record.key}
            columns={wtColumns}
            dataSource={dataSource}
            expandedRowRender={expandedRowRender}
            bordered={false}
            pagination={false}
            showHeader={false}
          />
        );
      },
    }],
  }];
  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={addressesData}
      pagination={false}
      bordered
      size="small"
    />
  );
};

export default AddressesTable;
