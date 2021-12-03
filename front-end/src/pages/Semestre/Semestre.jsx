import React, { useContext } from "react";
import { Select, Table, Button } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import AppContext from "../../store/AppContext";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ModalAddSemester from "../../components/ModalAddSemester/ModalAddSemester";
import ModalAddCourse from "../../components/ModalAddCourse/ModalAddCourse";
import "./Semestre.css";

const Semestre = () => {
  const { Option } = Select;
  const state = useContext(AppContext);

  const colums = [
    {
      title: "Nombre",
      dataIndex: "nombre_materia",
      key: "nombre_materia",
    },
    {
      title: "Creditos",
      dataIndex: "num_creditos",
      key: "num_creditos",
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

  return (
    <SectionTitle title="Información semestres">
      <div className="optionsChoose">
        <div className="semesterChoose">
          <h3>Escoger semestre</h3>
          <Select
            value={state.semesterSelect}
            //defaultValue={state.semesters[0].nombre_semestre}
            style={{ width: 120 }}
            onChange={(value) => state.setSemesterSelect(value)}
          >
            {state.semesters.map((semester) => (
              <Option value={semester.id_mongo} key={semester.id_mongo}>
                {semester.nombre_semestre}
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
          dataSource={state.filterCoursesBySemester(state.semesterSelect)}
          rowKey="id_mongo"
          pagination={{ pageSize: 3 }}
        ></Table>
      </div>
      <ModalAddSemester />
      <ModalAddCourse />
    </SectionTitle>
  );
};

export default Semestre;
