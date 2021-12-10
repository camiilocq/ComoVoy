import React from "react";
import { Column } from "@ant-design/charts";
//import AppContext from "../../store/AppContext";

const GraficaMaterias = ({ datos }) => {
  //const state = useContext(AppContext);
  const config = {
    data: datos,
    xField: "nombreMateria",
    yField: "definitivaMateria",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
    height: 350,
  };

  return <Column {...config} />;
};

export default GraficaMaterias;
