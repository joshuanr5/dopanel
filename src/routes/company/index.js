import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';

import CompanyTable from './companyTable';
import ModalCompany from './modalCompany';

const Dopanel = ({ dispatch, dopanel, loading }) => {
  console.log('dopanel->', dopanel);
  const { companies, modalVisible, modalType, data_categories, data_payment_types } = dopanel;

  const titleType = modalType === 'add' ? 'Agregar' : 'Editar';
  const modalCompanyProps = {
    title: `${titleType} compañía`,
    visible: modalVisible,
    okText: titleType,
    wrapClassName: 'vertical-center-modal',
    cancelText: 'Cancelar',
    categories: data_categories,
    paymentTypes: data_payment_types,
    onCancel() {
      dispatch({
        type: 'dopanel/closeModal',
      });
    },
    onOk() {
      dispatch({
        type: 'dopanel/closeModal',
      });
    },
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
      <CompanyTable loading={loading} companies={companies} />
      {!modalVisible || <ModalCompany company={null} {...modalCompanyProps} />}
    </div>
  );
};

export default connect(({ dopanel, loading }) => ({ dopanel, loading: loading.models.dopanel }))(Dopanel);
