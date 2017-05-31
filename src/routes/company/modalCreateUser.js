import React from 'react';
import { Form, Modal, Input, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const message = 'Por favor, no deje el campo vacío';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const ModalCreateUser = ({
  ...props,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) => {
  const onOkData = () => {
    console.log('asd')
    validateFields((error, fieldsValue) => {
      if (error) {
        return;
      }
      props.onOk(fieldsValue);
    });
  };
  return (
    <Modal {...props} onOk={onOkData}>
      <Form >
        <FormItem label="Rol" {...formItemLayout}>
          {
            getFieldDecorator('role', {
              rules: [{
                required: true,
                message,
              }],
            })(
              <RadioGroup>
                <Radio value="admi">Administrador</Radio>
              </RadioGroup>
              )
          }
        </FormItem>
        <FormItem label="Nombres" {...formItemLayout}>
          {
            getFieldDecorator('first_name', {
              rules: [{
                required: true,
                message,
              }],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Apellidos" {...formItemLayout}>
          {
            getFieldDecorator('last_name', {
              rules: [{
                required: true,
                message,
              }],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Correo electrónico" {...formItemLayout}>
          {
            getFieldDecorator('email', {
              rules: [{
                required: true,
                message,
              }, {
                type: 'email',
                message: 'Ingrese un correo electrónico válido',
              }],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Constraseña" {...formItemLayout}>
          {
            getFieldDecorator('password', {
              rules: [{
                required: true,
                message,
              }],
            })(<Input type="password" />)
          }
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModalCreateUser);
