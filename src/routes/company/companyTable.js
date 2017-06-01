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

const CompanyTable = ({
  companies,
  onAddUser,
  modalUserVisible,
  dispatch,
  loading,
}) => {
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
    title: 'Empresa',
    dataIndex: 'name',
  }, {
    title: 'Calificación',
    dataIndex: 'rating_score',
  }, {
    title: 'Precio de delivery',
    dataIndex: 'delivery_price',
    render: deliveryPrice => getPriceText(deliveryPrice),
  }, {
    title: 'Cantidad de Usuarios',
    dataIndex: 'business_users',
    render: (users) => {
      return `${users.length} ${users.length === 1 ? 'usuario' : 'usuarios'}`;
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
    render: (id) => {
      // modalUserVisible
      return (
        <div>
          <a onClick={onAddUser.bind(null, id)}>Crear usuario</a>
        </div>
      );
    },
  }];

  const propsModalUserCreate = {
    visible: modalUserVisible,
    title: 'Crear usuario',
    closable: false,
    maskClosable: false,
    okText: 'Crear',
    cancelText: 'Cancelar',
    onCancel() {
      dispatch({
        type: 'dopanel/closeUserModal',
      });
    },
    onOk(payload) {
      dispatch({
        type: 'dopanel/createUser',
        payload,
      });
      dispatch({
        type: 'dopanel/closeUserModal',
      });
      console.log('kakakaka')
      //TODO: PROBLEM HERE
    },
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
            dataSource={JSON.stringify(companies) === JSON.stringify({}) ? [] : companies}
            loading={loading}
            locale={tableLocaleText}
            scroll={{ x: 680 }}
            expandedRowRender={expandedRowRender}
          />
        </Col>
      </Row>
      {!modalUserVisible || <ModalCreateUser {...propsModalUserCreate} />}
    </div>
  );
  // TODO: modalUserVisible does not appear
};

export default CompanyTable;
