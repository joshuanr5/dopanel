import React from 'react';
import { Table, Row, Col, Badge } from 'antd';
import { format as currencyFormat } from 'currency-formatter';

import PaymentsCategoriesTable from './paymentsCategoriesTable';
import AddressesTable from './addressesTable';
import UsersTable from './usersTable';
import ModalCreateUser from './modalCreateUser';
import styles from './companyTable.less';


function getPriceText(productPesentations = '') {
  let text = currencyFormat(productPesentations, { code: 'PEN' });

  if (productPesentations.length > 1) {
    text = `${text} - ${
      currencyFormat(productPesentations[productPesentations.length - 1].value, { code: 'PEN' })
      }`;
  }

  return text;
}
const tableLocaleText = {
  emptyText: <span>Aún no hay Compañias</span>,
};

const CompanyTable = ({ companies, onAddUser, modalUserVisible, loading }) => {
  const expandedRowRender = (currentCompany) => {
    const currentId = currentCompany.id;
    const paymentCategoryData = [{
      key: currentId,
      categories: currentCompany.business_categories,
      payment_types: currentCompany.business_payment_types,
    }];

    const addressesData = currentCompany.business_addresses;
    const usersData = currentCompany.business_users;

    return (
      <div>
        <PaymentsCategoriesTable paymentCategoryData={paymentCategoryData} />
        <br />
        <AddressesTable addressesData={addressesData} />
        <br />
        <UsersTable usersData={usersData} />
      </div>
    );
  };

  const columns = [{
    title: 'Nombre',
    dataIndex: 'name',
  }, {
    title: 'Calificación',
    dataIndex: 'rating_score',
  }, {
    title: 'Precio de delivery',
    dataIndex: 'delivery_price',
    render: deliveryPrice => getPriceText(deliveryPrice),
  }, {
    title: 'Tiempo máximo',
    dataIndex: 'max_time_in_delivery',
    render: (timeDelivery) => {
      return timeDelivery === 1 ? `${timeDelivery} minuto` : `${timeDelivery} minutos`;
    },
  }, {
    title: 'Estado',
    dataIndex: 'status',
    render: (text) => {
      let status = '';
      if (text === 'active') {
        status = 'success';
      } else {
        status = 'default';
      }
      return (
        <Badge status={status} text={text === 'active' ? 'Activo' : 'Inactivo'} />
      );
    },
  }, {
    title: 'Opciones',
    dataIndex: 'id',
    render: (id, record) => {
      if (record.business_users.length > 0) {
        return <span>Usuario creado</span>;
      }
      // modalUserVisible
      return <a onClick={onAddUser}>Crear usuario</a>;
    },
  }];

  const propsModalUserCreate = {
    visible: modalUserVisible,
    title: 'Crear usuario',
  };
  console.log(!modalUserVisible || 'hola');
  return (
    <div>
      <Row type="flex" justify="center">
        <Col span={21}>
          <Table
            size="small"
            rowKey={record => record.id}
            className={styles.table}
            columns={columns}
            pagination={false}
            dataSource={companies}
            loading={loading}
            locale={tableLocaleText}
            scroll={{ x: 680 }}
            expandedRowRender={expandedRowRender}
          />
        </Col>
      </Row>
      <Row>
        {!modalUserVisible || <ModalCreateUser {...propsModalUserCreate} />}
      </Row>
    </div>
  );
  // TODO: modalUserVisible does not appear
};

export default CompanyTable;
