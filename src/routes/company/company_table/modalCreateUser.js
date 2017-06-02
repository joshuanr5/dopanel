import React from 'react';
import { Form, Modal, Input, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const message = 'Por favor, no deje el campo vacío';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class ModalCreateUser extends React.Component {
  state = {
    confirmDirty: false,
  };

  onOkData = () => {
    const { form } = this.props;
    form.validateFields((error, fieldsValue) => {
      if (error) {
        return;
      }
      const { confirm, ...data } = fieldsValue;
      this.props.onOk(data);
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value,
    });
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('La contraseña no concuerda');
    } else {
      callback();
    }
  }

  render = () => {
    const { form, ...modalProps } = this.props;
    return (
      <Modal {...modalProps} onOk={this.onOkData}>
        <Form >
          <FormItem label="Rol" {...formItemLayout}>
            {
              form.getFieldDecorator('role', {
                rules: [{
                  required: true,
                  message,
                }],
              })(
                <RadioGroup >
                  <Radio value="admi" checked >Administrador</Radio>
                </RadioGroup>
                )
            }
          </FormItem>
          <FormItem label="Nombres" {...formItemLayout}>
            {
              form.getFieldDecorator('first_name', {
                rules: [{
                  required: true,
                  message,
                }],
              })(<Input />)
            }
          </FormItem>
          <FormItem label="Apellidos" {...formItemLayout}>
            {
              form.getFieldDecorator('last_name', {
                rules: [{
                  required: true,
                  message,
                }],
              })(<Input />)
            }
          </FormItem>
          <FormItem label="Correo electrónico" {...formItemLayout}>
            {
              form.getFieldDecorator('email', {
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
          <FormItem label="Contraseña" {...formItemLayout}>
            {
              form.getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message,
                  },
                  {
                    validator: this.checkConfirm,
                  },
                ],
              })(<Input type="password" />)
            }
          </FormItem>
          <FormItem label="Confirmar contraseña" {...formItemLayout}>
            {
              form.getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message,
                  },
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)
            }
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ModalCreateUser);
