import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Layout, Form, Input, Button, Checkbox } from "antd";
import { v4 as uuidv4 } from "uuid";
import md5 from "md5";
import ModalTerminosCondiciones from "../../components/ModalTerminosCondiciones/ModalTerminosCondiciones";
import AppContext from "../../store/AppContext";
import axios from "../../config/axios";
import "./SignUp.css";

const { Header, Content } = Layout;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} es requerrido!",
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: "${label} no es un email valido!",
  },
  password: {
    // eslint-disable-next-line no-template-curly-in-string
    range: "${label} debe contener entre ${min} y ${max} caracteres",
  },
};

const SignUp = () => {
  const state = useContext(AppContext);
  const navigate = useNavigate();

  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [nombreUser, setNombreUser] = useState("");
  const [correoUser, setCorreoUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [instirucionUser, setInstitucionUser] = useState("");

  function toLogin() {
    const nuevoUser = {
      id: uuidv4(),
      promedioPonderado: 0,
      nombre: nombreUser,
      contrasena: md5(passwordUser),
      institucion: instirucionUser,
      correo: correoUser,
    };
    axios.post("/users", nuevoUser);
    return navigate("/");
  }

  function onChange(e) {
    setTerminosAceptados(e);
  }

  return (
    <Layout style={{ height: "100vh", padding: " 0px 0px 0px" }}>
      <Header>
        <h1 className="nombreApp">Cómo Voy</h1>
      </Header>
      <Layout>
        <Content
          className="site-layout-background"
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div className="data">
            <Form
              className="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              autoComplete="on"
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
                label="Nombre"
                rules={[{ required: true }]}
              >
                <Input
                  id="name"
                  value={nombreUser}
                  onChange={(event) => setNombreUser(event.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Correo"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  id="mail"
                  value={correoUser}
                  onChange={(event) => setCorreoUser(event.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu contraseña!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password id="password" />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Por favor confirma tu contraseña!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las contraseñas no coinciden!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  id="confirmPSW"
                  value={passwordUser}
                  onChange={(event) => setPasswordUser(event.target.value)}
                />
              </Form.Item>
              <Form.Item name={["user", "institution"]} label="Institucion">
                <Input
                  id="institution"
                  value={instirucionUser}
                  onChange={(event) => setInstitucionUser(event.target.value)}
                />
              </Form.Item>
            </Form>
            <div className="terminosCondiciones">
              <Button
                type="primary"
                onClick={() => state.setModalTerminosCondiciones(true)}
              >
                Ver términos y condiciones
              </Button>
              <Checkbox id="conditions" onChange={onChange}>
                He leído y acepto los términos y condiciones.
              </Checkbox>
              <Button
                id="register"
                type="primary"
                htmlType="submit"
                disabled={!terminosAceptados}
                onClick={toLogin}
              >
                Registrarse
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
      <ModalTerminosCondiciones />
    </Layout>
  );
};

export default SignUp;
