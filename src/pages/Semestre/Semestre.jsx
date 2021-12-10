import React, { useContext } from "react";
import { Select, Table, Button, Space } from "antd";
import { CalculatorOutlined, DeleteOutlined } from "@ant-design/icons";
import AppContext from "../../store/AppContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ModalAddSemester from "../../components/ModalAddSemester/ModalAddSemester";
import ModalAddCourse from "../../components/ModalAddCourse/ModalAddCourse";
import ModalPromedioSemestre from "../../components/ModalPromedioSemestre/ModalPromedioSemestre";
import axios from "../../config/axios";
import "./Semestre.css";

const Semestre = () => {
  const state = useContext(AppContext);
  const { Option } = Select;

  const colums = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Creditos",
      dataIndex: "creditos",
      key: "creditos",
    },
    {
      title: "Acciones",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="large"
            icon={<CalculatorOutlined />}
            onClick={() => calculateGrade(record)}
          ></Button>
          <Button
            type="primary"
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => deleteCourse(record)}
            danger
            ghost
          ></Button>
        </Space>
      ),
    },
  ];

  const calculateGrade = (record) => {
    axios
      .get(
        "/users/" +
          state.user.id +
          "/semesters/" +
          state.semesterSelect +
          "/courses/" +
          record.id
      )
      .then((res) => {
        state.setCourseSelect(res.data);
        state.setGradeSelected(res.data.notas);
      });
    state.setSelectionPage(4);
  };

  const pruebita = (value) => {
    //state.setPromedioPonderado(state.calcularPromedioPonderado());
    state.setSemesterSelect(value);
    axios
      .get("/users/" + state.user.id + "/semesters/" + value + "/courses")
      .then((res) => {
        state.setCousers(res?.data);
      });
  };

  const deleteCourse = (record) => {
    state.deleteCourse(record.id);
  };

  return (
    <SectionTitle title="Información semestres">
      <div className="optionsChoose">
        <div className="semesterChoose">
          <h3>Escoger semestre</h3>
          <Select
            value={state.semesterSelect}
            style={{ width: 120 }}
            onSelect={(value) => pruebita(value)}
          >
            {state.semesters.map((semester) => (
              <Option value={semester.id} key={semester.id}>
                {semester.semestre}
              </Option>
            ))}
          </Select>
        </div>
        <div className="botones">
          <Button onClick={() => state.setShowModalPromedioSemestre(true)}>
            Ver promedio
          </Button>
          <Button onClick={() => state.setShowModalAddSemester(true)}>
            Agregar semestre
          </Button>
          <Button onClick={() => state.setShowModalAddCourse(true)}>
            Agregar materia
          </Button>
        </div>
      </div>
      <hr />
      <div className="semesterTable">
        <h3>Materias</h3>
        <Table
          size="small"
          columns={colums}
          dataSource={state.courses}
          rowKey="id"
          pagination={{ pageSize: 3 }}
        ></Table>
      </div>
      <ModalAddSemester />
      <ModalAddCourse />
      <ModalPromedioSemestre />
    </SectionTitle>
  );
};

export default Semestre;
