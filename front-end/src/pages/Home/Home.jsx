import React, { useState } from "react";
import { Layout } from "antd";
import MenuApp from "../../components/ManuApp/MenuApp";
import TabHeader from "../../components/TabHeader/TabHeader";
import NotaMateria from "../../pages/NotaMateria/NotaMateria";
import PromedioSemestre from "../../pages/PromedioSemestre/PromedioSemestre";
import Reporte from "../../pages/Reporte/Reporte";

const Home = () => {
  const { Header, Sider, Content } = Layout;
  const [seleccion, setSeleccion] = useState(1);

  const cambiarPantalla = (pantalla) => {
    setSeleccion(pantalla);
  };

  return (
    <Layout style={{ height: "100vh", padding: " 0px 0px 0px" }}>
      <Header
        className="header"
        style={{
          backgroundColor: "#07171C",
          padding: "0 24px",
          boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px",
        }}
      >
        <TabHeader />
      </Header>
      <Layout style={{ height: "100vh", padding: 0 }}>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px" }}
        >
          <MenuApp cambiarPantalla={cambiarPantalla} />
        </Sider>
        <Layout style={{ padding: "0" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
            }}
          >
            {seleccion === 1 ? (
              <Reporte />
            ) : seleccion === 2 ? (
              <NotaMateria />
            ) : (
              <PromedioSemestre />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
