import React, { useContext } from "react";
import { Menu } from "antd";
import {
  InfoCircleOutlined,
  FileDoneOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import AppContext from "../../store/AppContext";
import "./MenuApp.css";

const MenuApp = () => {
  const state = useContext(AppContext);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0, backgroundColor: "#073440" }}
    >
      <Menu.Item
        className="menuApp"
        key="1"
        icon={<FileDoneOutlined />}
        onClick={() => state.setSelectionPage(1)}
      >
        Semestres
      </Menu.Item>
      <Menu.Item
        className="menuApp"
        key="2"
        icon={<BarChartOutlined />}
        onClick={() => state.setSelectionPage(2)}
      >
        Reportes
      </Menu.Item>
      <Menu.Item
        className="menuApp"
        key="3"
        icon={<InfoCircleOutlined />}
        onClick={() => state.setSelectionPage(3)}
      >
        Más información
      </Menu.Item>
    </Menu>
  );
};

export default MenuApp;
