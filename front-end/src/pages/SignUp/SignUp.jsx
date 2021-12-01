import React from "react";
import { Layout } from 'antd';
import { useNavigate } from 'react-router';
import { Form, Input, Button, Checkbox } from 'antd';

import './SignUp.css';

const { Header, Content } = Layout;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
  password: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const SignUp = () => {
  const navigate = useNavigate();
   function toLogin(){

    return(
      navigate('/')
    )
   }

  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>
          <div className="data">
            <Form className="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                autoComplete="on"
                validateMessages={validateMessages}>
              <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name={['user', 'email']} label="Correo" rules={[{ required: true, type: 'email' }]} >
                <Input />
              </Form.Item>
              <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!',},]} hasFeedback >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name={['user', 'institution']} label="Institucion" >
                <Input />
              </Form.Item>
              <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              >
                <Checkbox>
                  He leído y acepto los términos y condiciones.
                </Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" onClick={toLogin}>
                    Registrarse
                  </Button>
                </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
};

export default SignUp;
