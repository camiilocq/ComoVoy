import React, { useContext, useState } from "react";
import { Modal, Button, DatePicker, Select } from "antd";
import AppContext from "../../store/AppContext";
import axios from "../../config/axios";
import { v4 as uuidv4 } from "uuid";
import "./ModalAddSemester.css";

const ModalAddSemester = () => {
  const state = useContext(AppContext);
  const { Option } = Select;
  const [year, setYear] = useState("");
  const [semesterChoose, setSemesterChoose] = useState("1");

  const addSemester = () => {
    const date = year + "-" + semesterChoose;
    const newSemester = {
      id: uuidv4(),
      semestre: date,
      promedio: 0,
      userId: state.user.id,
    };
    axios.post("/users/" + state.user.id + "/semesters", newSemester);
    state.addSemester(newSemester);
    state.setShowModalAddSemester(false);
  };

  return (
    <Modal
      title="Agregar semestre"
      visible={state.showModalAddSemester}
      onCancel={() => state.setShowModalAddSemester(false)}
      footer={[
        <Button type="primary" key="submit" onClick={addSemester}>
          Agregar
        </Button>,
        <Button
          type="primary"
          key="back"
          onClick={() => state.setShowModalAddSemester(false)}
          danger
        >
          Cancelar
        </Button>,
      ]}
    >
      <div className="infoAddSemester">
        <div>Perido del semestre</div>
        <div className="chooseSemester">
          <DatePicker
            onChange={(date, dateString) => setYear(dateString)}
            picker="year"
            //format={yearFormat}
          />
          <Select
            value={semesterChoose}
            defaultValue="1"
            style={{ width: 60 }}
            onChange={(value) => setSemesterChoose(value)}
          >
            <Option value="1">01</Option>
            <Option value="2">02</Option>
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddSemester;
