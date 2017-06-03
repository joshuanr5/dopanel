import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import CustomerTable from './customer-table';

const CustomerPage = ({
  loading,
  customer,
}) => {
  const customerTableProps = {
    loading,
    customers: customer.customers.toJS(),
  };
  return (
    <Row type="flex" justify="center">
      <Col span={19}>
        <CustomerTable {...customerTableProps} />
      </Col>
    </Row>
  );
};

export default connect(({ customer, loading }) => ({ customer, loading: loading.models.customer }))(CustomerPage);
