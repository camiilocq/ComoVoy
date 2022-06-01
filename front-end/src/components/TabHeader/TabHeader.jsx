import React, { useContext, useState } from "react";
import { Modal, Button, Input } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AppContext from "../../store/AppContext";
import axios from "../../config/axios";
import "./TabHeader.css";

const TabHeader = () => {
  const state = useContext(AppContext);

  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState("");

  const handleOpen = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };
  const handleUpdate = async () => {
    const oldUser = state.user;
    const newUser = { ...oldUser, nombre: newName };
    state.setUser(newUser);
    await axios.put(`/users/${oldUser.id}`, newUser);
    setNewName("");
    setVisible(false);
  };
  const handleDelete = async () => {
    setNewName("");
    setVisible(false);
    await axios.delete(`/users/${state.user.id}`);
    salirDeHome();
  };

  const navigate = useNavigate();

  const salirDeHome = () => {
    state.setUser({});
    state.setSemester([]);
    state.setCousers([]);
    state.setSemesterSelect("");
    state.setCourseSelect({});
    state.setGradeSelected([]);
    navigate("/");
  };

  return (
    <div className="tabHeader">
      <Button id="btn-user" type="link" onClick={handleOpen}>
        {state.user?.nombre}
      </Button>
      <Modal
        title="Update Data"
        visible={visible}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button
            id="update"
            key="submit"
            type="primary"
            onClick={handleUpdate}
          >
            Update User
          </Button>,
          <Button id="delete" type="danger" key="delete" onClick={handleDelete}>
            Delete User
          </Button>,
        ]}
      >
        <Input
          id="newName"
          placeholder="New Name"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </Modal>
      <h1 className="nombreLogo">Cómo Voy</h1>
      <div>
        <Button
          type="primary"
          shape="circle"
          icon={<ImportOutlined />}
          size="large"
          onClick={salirDeHome}
        />
      </div>
    </div>
  );
};

export default TabHeader;
