import React, { useContext, useState } from "react";
import { Modal, Button, Select, Input } from "antd";
import AppContext from "../../store/AppContext";
import axios from "../../config/axios";
import { v4 as uuidv4 } from "uuid";
import "./ModalAddCourse.css";

const ModalAddCourse = () => {
  const state = useContext(AppContext);
  const { Option } = Select;
  const [nameCourse, setNameCourse] = useState("");
  const [numCredits, setNumCredits] = useState("");

  const addCourse = () => {
    const newCourse = {
      id: uuidv4(),
      definitiva: 0,
      semesterId: state.semesterSelect,
      nombre: nameCourse,
      creditos: numCredits,
      notas: [],
    };
    axios.post(
      "/users/" +
        state.user.id +
        "/semesters/" +
        state.semesterSelect +
        "/courses",
      newCourse
    );
    state.addCourse(newCourse);
    state.setShowModalAddCourse(false);
  };

  return (
    <Modal
      title="Agregar materia"
      visible={state.showModalAddCourse}
      onCancel={() => state.setShowModalAddCourse(false)}
      footer={[
        <Button type="primary" key="submit" onClick={addCourse}>
          Agregar
        </Button>,
        <Button
          type="primary"
          key="back"
          onClick={() => state.setShowModalAddCourse(false)}
          danger
        >
          Cancelar
        </Button>,
      ]}
    >
      <div className="infoAddCourse">
        <div>
          <h4>Nombre de la materia</h4>
          <Input
            placeholder="Nombre"
            value={nameCourse}
            onChange={(event) => setNameCourse(event.target.value)}
          />
        </div>
        <p />
        <div>
          <h4>Numero de creditos</h4>
          <Select
            value={numCredits}
            defaultValue="1"
            style={{ width: 60 }}
            onChange={(value) => setNumCredits(value)}
          >
            <Option value="1">01</Option>
            <Option value="2">02</Option>
            <Option value="3">03</Option>
            <Option value="4">04</Option>
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddCourse;
