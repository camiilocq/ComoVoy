import React, { useContext } from "react";
import { Layout } from "antd";
import MenuApp from "../../components/ManuApp/MenuApp";
import TabHeader from "../../components/TabHeader/TabHeader";
import Semestre from "../Semestre/Semestre";
import Reporte from "../../pages/Reporte/Reporte";
import AppContext from "../../store/AppContext";
import "./Home.css";

const Home = () => {
  const { Header, Sider, Content } = Layout;
  const state = useContext(AppContext);

  return (
    <Layout style={{ height: "100vh", padding: " 0px 0px 0px" }}>
      <Header
        className="header"
        style={{
          backgroundColor: "#020B16",
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
          <MenuApp />
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
            <div className="containerDef">
              {state.selectionPage === 1 ? <Semestre /> : <Reporte />}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
