import React from "react";
import { Button } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./TabHeader.css";

const TabHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="tabHeader">
      <div>Nombre User</div>
      <h1 className="nombreLogo">Como Voy</h1>
      <div>
        <Button
          type="primary"
          shape="circle"
          icon={<ImportOutlined />}
          size="large"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default TabHeader;
