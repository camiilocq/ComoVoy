import React from "react";
import { useNavigate } from 'react-router';
import { Layout } from 'antd';
import { Input } from 'antd';
import { Typography } from 'antd';
import { Button } from 'antd';
import { Carousel } from 'antd';
import { Row, Col } from 'antd';

import './Login.css';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const contentStyle = {
  height: '100%',
  with: '400px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
};



const Login = () => {
  const navigate = useNavigate();
  function toSignUp(){
      return(
        navigate('/sign-Up')
      )
  }

  function toHome(){
    return(
      navigate('/home')
    )
}
  return(
    <Layout className="Contener">
    <Header>crear un banner</Header>
    <Content className="general">
    <Row>
      <Col span={12}>
        <div className="images">
          <Carousel effect="fade">
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
          </Carousel>
        </div>
      </Col>
      <Col span={12}>
        <div className="data">
          <Title level={2}>¡Bienvenido a Como Voy!</Title>
          <Title level={5}>Portal donde encontraras como van tus 
          calificaciones en tiempo real.</Title>
          <div className="sigIn">
            <p>Correo electronico</p>
            <Input placeholder="Correo electronico" />
            <p>Contraseña</p>
            <Input.Password placeholder="Contraseña" />
            <Button type="link" onClick={toSignUp}>Eres nuevo, ¡Registrate!</Button>
            <Button type="primary" onClick={toHome}>Ingresar</Button>
          </div>
        </div>
      </Col>
    </Row>
    </Content>
    <Footer className="information">info</Footer>
  </Layout>
  );

 
  
    
};

export default Login;
