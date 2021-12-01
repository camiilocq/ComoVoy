import React from "react";
import { useNavigate } from "react-router";
import { Layout } from "antd";

import { Typography } from "antd";

import { Carousel } from "antd";
import { Row, Col } from "antd";
import { Form, Input, Button, Checkbox } from "antd";

import { GithubOutlined } from "@ant-design/icons";

import "./Login.css";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const contentStyle = {
  height: "100%",
  with: "400px",
  color: "#fff",
  lineHeight: "400px",
  textAlign: "center",
  background: "#364d79",
};

const Login = () => {
  const navigate = useNavigate();
  function toSignUp() {
    return navigate("/sign-Up");
  }

  function toHome() {
    return navigate("/home");
  }

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
              <Title level={2}>¡Bienvenido a Cómo Voy!</Title>
              <Title level={5}>
                Portal donde encontraras como van tus calificaciones en tiempo
                real.
              </Title>
              <div className="sigIn">
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
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
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Form.Item
                      label="¿Eres nuevo? ¡Registrate!"
                      name="sign-up"
                      onClick={toSignUp}
                    />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={toHome}>
                      INGRESAR
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
            Final project of the Advanced Web Programming course, the project
            was worked during the semester 2021-2. Its purpose is to keep track
            and be able to visualize in real time the grades of both a course
            and its entire academic period (court, semester, period, etc.) has
            Mongo as database engine.
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
