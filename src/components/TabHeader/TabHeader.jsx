import React, { useContext } from "react";
import { Button } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AppContext from "../../store/AppContext";
import "./TabHeader.css";

const TabHeader = () => {
  const state = useContext(AppContext);
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
      <div>{state.user?.nombre}</div>
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
