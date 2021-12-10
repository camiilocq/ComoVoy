import React, { useContext, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import GraficaSemestres from "../../components/GraficaSemestres/GraficaSemestres";
import GraficaMaterias from "../../components/GraficaMaterias/GraficaMaterias";
import AppContext from "../../store/AppContext";
import axios from "../../config/axios";
import "./Reporte.css";

const Reporte = () => {
  const state = useContext(AppContext);

  useEffect(() => {
    axios.get("/users/" + state.user.id + "/semesters").then((res) => {
      state.setSemester(res?.data);
    });
  }, []);

  return (
    <SectionTitle title="Resportes">
      <div>
        Tu promedio ponderado es de: {state.calcularPromedioPonderado()}
      </div>
      <hr />
      <p />
      <div className="graficas">
        <div>
          <GraficaSemestres datos={state.arregloNombreDeSemestres()} />
        </div>
        <div>
          <GraficaMaterias datos={state.arregloMateriasDelSemestre()} />
        </div>
      </div>
    </SectionTitle>
  );
};

export default Reporte;
