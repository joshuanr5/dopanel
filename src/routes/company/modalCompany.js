import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Checkbox, Row, Col } from 'antd';

import TimePicker from '../../components/time_picker';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const daysValues = {
  MO: 'Lunes',
  TU: 'Martes',
  WE: 'Miercoles',
  TH: 'Jueves',
  FR: 'Viernes',
  SA: 'Sabado',
  SU: 'Domingo',
};

const ModalCompany = ({
  company = {},
  paymentTypes,
  ...props,
  form: {
    getFieldValue,
    getFieldDecorator,
    validateFields,
  },
 }) => {
  const onOkData = () => {
    validateFields((error, fieldsValue) => {
      if (error) {
        return;
      }
      const { lat, lng, address_name, workingDays, working_time, business_categories, payments, ..._fieldsValue } = fieldsValue;
      const data = {
        business_info: _fieldsValue,
        business_categories,
        payments,
        working_time: getWorkingTime(workingDays, working_time),
        business_addresses: {
          address_name,
          coordinates: {
            lat,
            lng,
          },
        },
      };

      console.log('datos ->', data);
      props.onOk();
    });
  };

  const getWorkingTime = (workingDays, workingHours) => {
    const workingTime = [];
    for (const days of workingDays) {
      workingTime.push({
        day_code: days,
        day_name: daysValues[days],
        working_hours: workingHours,
      });
    }
    return workingTime;
  };

  const checkTime = (rule, value, cb) => {
    const { start, end } = getFieldValue('working_time');
    if (start === '' || end === '') {
      cb('Por favor, seleccione todos los campos');
    } else if (start >= end) {
      cb('startTime tiene que ser menor que endTime');
    } else {
      cb();
    }
  };
  return (
    <Modal {...props} onOk={onOkData} >
      <Form >
        <FormItem label="Nombre" {...formItemLayout}>
          {
            getFieldDecorator('name', {
              initialValue: 'Habla Causa 2',
              rules: [
                {
                  required: true,
                  message: 'Por favor, ingrese el nombre del negocio',
                },
                {
                  max: 50,
                  whitespace: true,
                  message: 'El nombre debe contener caracteres válidos menores a 50',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Descripción" {...formItemLayout}>
          {
            getFieldDecorator('description', {
              initialValue: 'Polleria para pollos',
              rules: [
                {
                  max: 140,
                  message: 'La descripción no puede ser de más de 140 caracteres',
                },
                {
                  whitespace: true,
                  message: 'Por favor, ingrese caracteres válidos',
                },
              ],
            })(<Input type="textarea" />)
          }
        </FormItem>
        <FormItem label="Página de Facebook" {...formItemLayout}>
          {
            getFieldDecorator('facebook_id', {
              initialValue: 'habla_causa',
              rules: [
                {
                  max: 50,
                  message: 'El link de la página no debe superar la cantidad permitida de caracteres',
                },
                {
                  whitespace: true,
                  message: 'Por favor, ingrese caracteres válidos',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          labelCol={{
            span: 8,
          }}
          label={(
            <span>
              Pedido mínimo&nbsp;<strong>(S/)</strong>
            </span>
          )}
        >
          {
            getFieldDecorator('min_order_price', {
              initialValue: 10,
              rules: [
                {
                  required: true,
                  message: 'Por favor, ingrese un monto',
                },
              ],
            })(<InputNumber min={0} max={50} />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          labelCol={{
            span: 8,
          }}
          label={(
            <span>
              Costo de delivery&nbsp;<strong>(S/)</strong>
            </span>
          )}
        >
          {
            getFieldDecorator('delivery_price', {
              initialValue: 10,
              rules: [
                {
                  required: true,
                  message: 'Por favor, ingrese un monto',
                },
              ],
            })(<InputNumber min={0} max={50} />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          labelCol={{
            span: 8,
          }}
          label={(
            <span>
              Tiempo en delivery&nbsp;<strong>(min)</strong>
            </span>
          )}
        >
          {
            getFieldDecorator('max_time_in_delivery', {
              initialValue: 10,
              rules: [
                {
                  required: true,
                  message: 'Por favor, ingrese una cantidad numérica',
                },
              ],
            })(<InputNumber min={0} max={500} />)
          }
        </FormItem>
        <FormItem label="Logo" {...formItemLayout}>
          {
            getFieldDecorator('url_logo', {
              initialValue: 'http://unsplash.it/140',
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Portada" {...formItemLayout}>
          {
            getFieldDecorator('url_cover', {
              initialValue: 'http://unsplash.it/140/70',
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Categorias" {...formItemLayout}>
          {
            getFieldDecorator('business_categories', {
              rules: [
                {
                  required: true,
                  message: 'Por favor, seleccione al menos una categoría',
                },
              ],
            })(<Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Seleccione una o más categorias"
            >
              {
                props.categories.map(category => (
                  <Option key={category.code}>{category.display_name}</Option>
                ))
              }
            </Select>)
          }
        </FormItem>
        <FormItem label="Forma de pago" {...formItemLayout}>
          {
            getFieldDecorator('payments', {
              rules: [
                {
                  required: true,
                  message: 'Por favor, elija un medio de pago',
                },
              ],
            })(
              <CheckboxGroup
                options={paymentTypes.map((payment) => {
                  return {
                    label: payment.display_name,
                    value: payment.id,
                  };
                })}
              />
              )
          }
        </FormItem>
        <FormItem label="Latitud" {...formItemLayout}>
          {
            getFieldDecorator('lat', {
              initialValue: '12',
              rules: [{
                required: true,
                message: 'ingrese lat', //TODO: CHANGE MESSAGE
              }],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Longitud" {...formItemLayout}>
          {
            getFieldDecorator('lng', {
              initialValue: '12',
              rules: [{
                required: true,
                message: 'ingrese lng', //TODO: CHANGE MESSAGE
              }],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="Dirección" {...formItemLayout}>
          {
            getFieldDecorator('address_name', {
              initialValue: '12',
              rules: [{
                required: true,
                message: 'Ingrese address', //TODO: CHANGE MESSAGE
              }],
            })(<Input />)
          }
        </FormItem>
        <Form.Item label="Horario de atención" wrapperCol={{ span: 16 }} labelCol={{ span: 8 }}>
          {
            getFieldDecorator('working_time', {

              rules: [{
                validator: checkTime,
              }, {
                required: true,
              }],
            })(<TimePicker />)
          }
        </Form.Item>
        <Form.Item label="Dias de atención">
          <Row>
            <Col >
              {
                getFieldDecorator('workingDays', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, elija un dia',
                    },
                  ],
                })(<CheckboxGroup
                  options={[
                    { label: 'Lun', value: 'MO' },
                    { label: 'Mar', value: 'TU' },
                    { label: 'Mie', value: 'WE' },
                    { label: 'Jue', value: 'TH' },
                    { label: 'Vie', value: 'FR' },
                    { label: 'Sab', value: 'SA' },
                    { label: 'Dom', value: 'SU' },
                  ]}
                />)
              }
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModalCompany);

        // <FormItem label="Efectivo" {...formItemLayout}>
        //   {
        //     getFieldDecorator('cash', {
        //       initialValue: true,
        //       valuePropName: 'checked',
        //     })(<Checkbox />)
        //   }
        // </FormItem>
        // <FormItem label="Visa" {...formItemLayout}>
        //   {
        //     getFieldDecorator('visa', {
        //       valuePropName: 'checked',
        //     })(<Checkbox />)
        //   }
        // </FormItem>
        // <FormItem label="Mastercard" {...formItemLayout}>
        //   {
        //     getFieldDecorator('mastercard', {
        //       valuePropName: 'checked',
        //     })(<Checkbox />)
        //   }
        // </FormItem>
        // <FormItem label="Diners Club " {...formItemLayout}>
        //   {
        //     getFieldDecorator('diners-club', {
        //       valuePropName: 'checked',
        //     })(<Checkbox />)
        //   }
        // </FormItem>
