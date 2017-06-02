import React from 'react';
import { Table, Row, Col } from 'antd';
import { format as currencyFormat } from 'currency-formatter';

import PaymentsCategoriesTable from './paymentsCategoriesTable';
import AddressesTable from './addressesTable';
import UsersTable from './usersTable';
import ModalCreateUser from './modalCreateUser';
import EditableCellSelect from './editableCellSelect';
import styles from './index.less';

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
  onEditStatus,
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
    render: (text) => (text === undefined ? '0 / 5' : text),
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
    render: (text, record) => {
      const saveStatus = (newStatus) => {
        dispatch({
          type: 'dopanel/editCompany',
          payload: newStatus,
        });
      };
      return (
        <EditableCellSelect
          value={text}
          onAddUser={onEditStatus.bind(null, record.id)}
          saveStatus={saveStatus}
          options={[
            { name: 'active', display_name: 'Activo' },
            { name: 'inactive', display_name: 'Inactivo' },
          ]}
        />
      );
    },
  }, {
    title: 'Opciones',
    dataIndex: 'id',
    render: (id) => {
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
    },
  };

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
            scroll={{ x: 690 }}
            expandedRowRender={expandedRowRender}
          />
        </Col>
      </Row>
      {!modalUserVisible || <ModalCreateUser {...propsModalUserCreate} />}
    </div>
  );
};

export default CompanyTable;
