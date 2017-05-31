import React from 'react';
import { Form, Modal } from 'antd';

const ModalCreateUser = ({
  ...props,
}) => {
  console.log(props);
  return (
    <Modal {...props}>
      <Form>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModalCreateUser);
