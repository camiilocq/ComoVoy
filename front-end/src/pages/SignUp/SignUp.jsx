import React, {useState} from "react";
import { Layout } from 'antd';
import { useNavigate } from 'react-router';
import { Form, Input, Button, Checkbox } from 'antd';
import { Modal } from 'antd';
import { Typography } from "antd";

import './SignUp.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const validateMessages = {
  required: '${label} es requerrido!',
  types: {
    email: '${label} no es un email valido!',
  },
  password: {
    range: '${label} debe contener entre ${min} y ${max} caracteres',
  },
};


const SignUp = () => {
  const navigate = useNavigate();
   function toLogin(){
    return(
      //Aquí iria agregar el usuario a la BD
      navigate('/')
    )
   }

   const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Header>
        <div className="title">
          <Title level={1}>Cómo Voy</Title>
        </div>
        
      </Header>
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
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña!',},]} hasFeedback >
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
                    message: 'Por favor confirma tu contraseña!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Las contraseñas no coinciden!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name={['user', 'institution']} label="Institucion" >
                <Input />
              </Form.Item>
              <Form.Item>
              <Button type="primary" onClick={showModal}>
                  Ver términos y condiciones
                </Button>
                <Modal title="Términos y Condiciones de Uso" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <h5>INFORMACIÓN RELEVANTE</h5>
                  <p> Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio,
                     que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. 
                     El uso de nuestros servicios, así como el uso de nuestros productos implicará que usted 
                     ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todos los
                     productos que son ofrecidos por nuestro sitio web pudieran ser creadas, cobradas, enviadas
                     o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios 
                     Términos y Condiciones. En algunos casos, para adquirir un producto, será necesario el
                     registro por parte del usuario, con ingreso de datos personales fidedignos y definición
                     de una contraseña. El usuario puede elegir y cambiar la clave para su acceso de 
                     administración de la cuenta en cualquier momento, en caso de que se haya registrado y 
                     que sea necesario para la compra de alguno de nuestros productos. 
                     github.com/camiilocq/ComoVoy no asume la responsabilidad en caso de que entregue dicha
                     clave a terceros.</p>
                    <h5>LICENCIA</h5>
                    <p>Cómo Voy  a través de su sitio web concede una licencia para que los usuarios utilicen  
                      los productos que son ofrecidos en este sitio web de acuerdo a los Términos y Condiciones 
                      que se describen en este documento. 
                    </p>
                    <h5>USO NO AUTORIZADO</h5>
                    <p>En caso de que aplique (para venta de software, templetes, u otro producto de diseño 
                      y programación) usted no puede colocar uno de nuestros productos, modificado o sin 
                      modificar, en un CD, sitio web o ningún otro medio y ofrecerlos para la redistribución 
                      o la reventa de ningún tipo.</p>
                    <h5>PROPIEDAD</h5>
                    <p>Usted no puede declarar propiedad intelectual o exclusiva a ninguno de nuestros productos, 
                      modificado o sin modificar. Todos los productos son propiedad de los proveedores del contenido. 
                      En caso de que no se especifique lo contrario, nuestros productos se proporcionan sin ningún 
                      tipo de garantía, expresa o implícita. En ningún esta compañía será responsables de ningún 
                      daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o 
                      consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros 
                      productos.</p>
                </Modal>
              </Form.Item>
              <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Debes aceptar los términos y condiciones')),
                },
              ]}
              > <Checkbox>
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
