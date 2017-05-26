import React from 'react';
import { Table, Row, Col, Badge } from 'antd';
import { format as currencyFormat } from 'currency-formatter';

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

const CompanyTable = ({ companies, loading }) => {
  const tableLocaleText = {
    emptyText: <span>Aún no hay Compañias</span>,
  };

  const columns = [{
    title: 'Nombre',
    dataIndex: 'name',
    rowKey: 'name',
  }, {
    title: 'Calificación',
    dataIndex: 'rating_score',
    rowKey: 'rating_score',
  }, {
    title: 'Precio de delivery',
    dataIndex: 'delivery_price',
    rowKey: 'delivery_price',
    render: deliveryPrice => getPriceText(deliveryPrice),
  }, {
    title: 'Tiempo máximo',
    dataIndex: 'max_time_in_delivery',
    rowKey: 'max_time_in_delivery',
    render: (timeDelivery) => {
      return timeDelivery === 1 ? `${timeDelivery} minuto` : `${timeDelivery} minutos`;
    },
  }, {
    title: 'Estado',
    dataIndex: 'status',
    rowKey: 'status',
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
  }];
  return (
    <Row type="flex" justify="center">
      <Col span={21}>
        <Table
          rowKey={record => record.id}
          className={styles.table}
          columns={columns}
          pagination={false}
          dataSource={companies}
          loading={loading}
          bordered
          locale={tableLocaleText}
          scroll={{ x: 567 }}
        />
      </Col>
    </Row>
  );
};

export default CompanyTable;
