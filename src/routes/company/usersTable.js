import React from 'react';
import { Table, Badge } from 'antd';

const tableLocaleText = {
  emptyText: <span>Aún no hay Usuarios</span>,
};

const UsersTable = ({
  usersData,
}) => {
  const columns = [{
    title: 'Tipo',
    dataIndex: 'role',
    key: 'role',
  }, {
    title: 'Nombre',
    key: 'name',
    render: (_, data) => {
      return (<span>{`${data.first_name} ${data.last_name}`}</span>);
    },
  }, {
    title: 'Correo Electrónico',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let mesagge = '';
      if (status === 'active') {
        mesagge = 'success';
      } else {
        mesagge = 'default';
      }
      return (
        <Badge status={mesagge} text={status === 'active' ? 'Activo' : 'Inactivo'} />
      );
    },
  }];
  return (
    <Table
      columns={columns}
      dataSource={usersData}
      locale={tableLocaleText}
      bordered
      pagination={false}
      size="small"
    />
  );
};

export default UsersTable;
