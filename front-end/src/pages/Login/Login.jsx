import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Layout } from "antd";

import { Typography } from "antd";
import { Row, Col } from "antd";
import { Form, Input, Button } from "antd";
import { Image } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import AppContext from "../../store/AppContext";
import axios from "../../config/axios";

import "./Login.css";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const Login = () => {
  const state = useContext(AppContext);

  const navigate = useNavigate();
  function toSignUp() {
    return navigate("/sign-Up");
  }

  useEffect(() => {
    axios.get("/users/61a67cb304b864a315af9cbe").then((res) => {
      state.setUser(res?.data);
    });
  }, []);

  const toHome = async () => {
    //Aquí iria la autentificación para ingresar al login

    await axios.get("/users/" + state.user._id + "/semesters").then((res) => {
      state.setSemester(res?.data);
    });

    return navigate("/home");
  };

  return (
    <Layout className="Contener">
      <div className="Banner">
        <Header>
          <Title level={1}>Cómo Voy</Title>
        </Header>
      </div>
      <Content className="general">
        <Row>
          <Col span={12}>
            <div className="images">
              <Image src="" />
            </div>
          </Col>
          <Col span={12}>
            <div className="data">
              <Title level={2}>¡Bienvenido a Cómo Voy!</Title>
              <Title level={5}>
                Portal donde encontraras como van tus calificaciones en tiempo
                real.
              </Title>
              <div className="sigIn">
                <Form
                  //name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    //name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    //name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Form.Item
                      label="¿Eres nuevo? ¡Registrate!"
                      //name="sign-up"
                      onClick={toSignUp}
                    />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={toHome}>
                      Ingresar
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
      <Footer className="information">
        <Row>
          <Col span={13}>
            Proyecto final de la asignatura de Programación Web Avanzada, el
            proyecto fue trabajado durante el semestre 2021-2. Su objetivo es
            llevar un control y poder visualizar en tiempo real las
            calificaciones tanto de un curso como de todo su periodo académico
            (tribunal, semestre, periodo, etc.) tiene Mongo como motor de base
            de datos.
          </Col>
          <Col span={1} />
          <Col span={5}>
            <Col>
              <Row span={6}>Desarrolladores:</Row>
              <Row span={6}>Juan David Vera</Row>
              <Row span={6}>Juan Sebastian Puerta</Row>
              <Row span={6}>
                <a href="https://camiilocq.github.io">Juan Camilo Castillo</a>
              </Row>
            </Col>
          </Col>
          <Col span={1} />
          <Col span={3}>
            <Row>
              <GithubOutlined />
              <a href="https://github.com/camiilocq/ComoVoy">Github</a>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default Login;
