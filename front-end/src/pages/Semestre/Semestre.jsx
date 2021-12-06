import React, { useContext } from "react";
import { Select, Table, Button } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import AppContext from "../../store/AppContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ModalAddSemester from "../../components/ModalAddSemester/ModalAddSemester";
import ModalAddCourse from "../../components/ModalAddCourse/ModalAddCourse";
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
        <Button
          type="primary"
          size="large"
          icon={<CalculatorOutlined />}
          onClick={() => calculateGrade(record)}
        ></Button>
      ),
    },
  ];

  const calculateGrade = (record) => {
    state.setCourseSelect(record);
    state.setGradeSelected(record.notas);
    state.setSelectionPage(3);
  };

  const calcularPromedioSemestre = () => {
    state.calcularPromedioSemestre();
  };

  const pruebita = (value) => {
    state.setSemesterSelect(value);
    axios
      .get("/users/" + state.user._id + "/semesters/" + value + "/courses")
      .then((res) => {
        state.setCousers(res?.data);
      });
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
              <Option value={semester._id} key={semester._id}>
                {semester.semestre}
              </Option>
            ))}
          </Select>
        </div>
        <div className="botones">
          <Button onClick={calcularPromedioSemestre}>Ver promedio</Button>
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
          rowKey="_id"
          pagination={{ pageSize: 3 }}
        ></Table>
      </div>
      <ModalAddSemester />
      <ModalAddCourse />
    </SectionTitle>
  );
};

export default Semestre;
