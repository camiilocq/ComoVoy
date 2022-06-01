import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Layout, Form, Input, Button, Image, message } from "antd";
import md5 from "md5";
import AppContext from "../../store/AppContext";
import axios from "../../config/axios";
import logo from "../../components/Imgs/Studying-amico.png";
import "./Login.css";

const { Header, Content } = Layout;

const Login = () => {
  const state = useContext(AppContext);
  const [correoUser, setCorreoUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const navigate = useNavigate();
  function toSignUp() {
    return navigate("/sign-up");
  }

  const toHome = () => {
    const passwordEncrypt = md5(passwordUser);
    axios
      .post("/users/login", {
        correo: correoUser,
        contrasena: passwordEncrypt,
      })
      .then((res) => {
        state.setUser(res?.data);
        axios.get("/users/" + res?.data.id + "/semesters").then((resDos) => {
          state.setSemester(resDos?.data);
          return navigate("/home");
        });
      })
      .catch((err) => {
        message.error("Credenciales incorrectas");
      });
  };

  return (
    <Layout style={{ height: "100vh", padding: " 0px 0px 0px" }}>
      <Header>
        <h1 className="nombreApp">Cómo Voy</h1>
      </Header>

      <Content
        className="site-layout-background"
        style={{
          padding: 0,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className="containerLogin">
          <div className="imagen">
            <div>
              <Image id="image" width={500} src={logo} alt="logo" />
            </div>
          </div>
          <div className="formulario">
            <h1>¡Bienvenido a Cómo Voy!</h1>
            <h3 className="textoInfo">
              Portal donde encontraras como van tus calificaciones en tiempo
              real.
            </h3>
            <hr />
            <div className="infoFormulario">
              <Form.Item
                className="inputInfoUser"
                label="Correo"
                rules={[
                  {
                    required: true,
                    message: "Escriba su correo",
                  },
                ]}
              >
                <Input
                  id="mail"
                  value={correoUser}
                  onChange={(event) => setCorreoUser(event.target.value)}
                />
              </Form.Item>
              <Form.Item
                className="inputInfoUser"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Escriba su contraseña",
                  },
                ]}
              >
                <Input.Password
                  id="password"
                  value={passwordUser}
                  onChange={(event) => setPasswordUser(event.target.value)}
                />
              </Form.Item>
              <div className="botonesLogin">
                <Button
                  id="btn-logIn"
                  type="primary"
                  htmlType="submit"
                  onClick={toHome}
                >
                  Ingresar
                </Button>
                <Button id="btn-register" type="link" onClick={toSignUp}>
                  ¿Eres nuevo? ¡Registrate!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
