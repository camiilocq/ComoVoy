import React, { useContext, useState } from "react";
import { Modal, Button, DatePicker, Select } from "antd";
import AppContext from "../../store/AppContext";
import "./ModalAddSemester.css";

const ModalAddSemester = () => {
  const state = useContext(AppContext);
  const { Option } = Select;
  const [year, setYear] = useState("");
  const [semesterChoose, setSemesterChoose] = useState("01");

  const addSemester = () => {
    const date = year + "-" + semesterChoose;
    const newSemester = {
      id_mongo: date,
      nombre_semestre: date,
      promedio: 0,
      id_mongo_user: "u1",
    };
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
            defaultValue="01"
            style={{ width: 60 }}
            onChange={(value) => setSemesterChoose(value)}
          >
            <Option value="01">01</Option>
            <Option value="02">02</Option>
          </Select>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddSemester;
