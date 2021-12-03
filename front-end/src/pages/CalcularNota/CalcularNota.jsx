import React, { useContext } from "react";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AppContext from "../../store/AppContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import InfoCourse from "../../components/InfoNota/InfoNota";
import "./CalcularNota.css";

const CalcularNota = () => {
  const state = useContext(AppContext);

  const colums = [
    {
      title: "Nombre",
      dataIndex: "nombre_nota",
      key: "nombre_nota",
    },
    {
      title: "Pocentaje",
      dataIndex: "pocentaje",
      key: "pocentaje",
    },
    {
      title: "Calificación",
      dataIndex: "calificacion",
      key: "calificacion",
    },
    {
      title: "Acciones",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          size="large"
          icon={<DeleteOutlined />}
          onClick={() => deleteGrade(record)}
          danger
          ghost
        ></Button>
      ),
    },
  ];

  const deleteGrade = (record) => {
    state.deleteGrade(record.nombre_nota);
  };

  return (
    <SectionTitle
      title={"Calcular nota de: " + state.courseSelect.nombre_materia}
    >
      <InfoCourse />
      <hr />
      <Table
        size="small"
        columns={colums}
        dataSource={state.gradesSelected}
        rowKey="nombre_nota"
        pagination={{ pageSize: 4 }}
      />
    </SectionTitle>
  );
};

export default CalcularNota;
