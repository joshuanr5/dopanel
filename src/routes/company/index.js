import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';

import CompanyTable from './company_table';
import ModalCompany from './modalCompany';

const Dopanel = ({
  dispatch,
  dopanel,
  loading,
}) => {
  const { companies, modalVisible, modalType, data_categories, data_payment_types, modalUserVisible } = dopanel;
  const titleType = modalType === 'add' ? 'Agregar' : 'Editar';
  const modalCompanyProps = {
    title: `${titleType} compañía`,
    visible: modalVisible,
    okText: titleType,
    wrapClassName: 'vertical-center-modal',
    cancelText: 'Cancelar',
    categories: data_categories,
    paymentTypes: data_payment_types,
    closable: false,
    maskClosable: false,
    onCancel() {
      dispatch({
        type: 'dopanel/closeModal',
      });
    },
    onOk(payload) {
      dispatch({
        type: 'dopanel/create',
        payload,
      });
      dispatch({
        type: 'dopanel/closeModal',
      });
    },
  };

  const propCompanyTable = {
    loading,
    companies: companies.toJS(),
    onAddUser(id) {
      dispatch({
        type: 'dopanel/showUserModal',
        payload: {
          currentCompanyId: id,
        },
      });
    },
    onEditStatus(id) {
      dispatch({
        type: 'dopanel/editCurrentCompanyId',
        payload: {
          currentCompanyId: id,
        },
      });
    },
    modalUserVisible,
    dispatch,
  };

  const handleAddClick = () => {
    dispatch({
      type: 'dopanel/showModal',
      payload: {
        modalType: 'add',
      },
    });
  };

  return (
    <div>
      <Row >
        <Col offset={2}>
          <Button type="primary" icon="plus" onClick={handleAddClick}>Agregar</Button>
        </Col>
      </Row>
      <br />
      <CompanyTable {...propCompanyTable} />
      {!modalVisible || <ModalCompany company={null} {...modalCompanyProps} />}
    </div>
  );
};

export default connect(({ dopanel, loading }) => ({ dopanel, loading: loading.models.dopanel }))(Dopanel);
