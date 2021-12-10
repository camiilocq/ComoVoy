import React from "react";
import { Alert } from "antd";

const Alerta = ({ tipo, mensaje }) => {
  return <Alert message={mensaje} type={tipo} showIcon />;
};

export default Alerta;
