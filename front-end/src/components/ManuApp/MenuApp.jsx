import React from "react";
import { Menu } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import "./MenuApp.css";

const MenuApp = ({ cambiarPantalla }) => {
  const cambiarVentana = (ventana) => {
    cambiarPantalla(ventana);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0, backgroundColor: "#0C262A" }}
    >
      <Menu.Item
        className="menuApp"
        key="1"
        icon={<DesktopOutlined />}
        onClick={() => cambiarVentana(1)}
      >
        Reportes
      </Menu.Item>
      <Menu.Item
        className="menuApp"
        key="2"
        icon={<DesktopOutlined />}
        onClick={() => cambiarVentana(2)}
      >
        Nota materia
      </Menu.Item>
      <Menu.Item
        className="menuApp"
        key="3"
        icon={<DesktopOutlined />}
        onClick={() => cambiarVentana(3)}
      >
        Promedio semestre
      </Menu.Item>
    </Menu>
  );
};

export default MenuApp;
