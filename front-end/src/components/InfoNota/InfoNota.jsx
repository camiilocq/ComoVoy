import React, { useState, useContext } from "react";
import { Button, Input, InputNumber } from "antd";
import AppContext from "../../store/AppContext";
import ModalNotaMateria from "../ModalNotaMateria/ModalNotaMateria";
import "./InfoNota.css";

const InfoNota = () => {
  const state = useContext(AppContext);

  const [nombre, setNombre] = useState("");
  const [porcentaje, setPorcentaje] = useState(0);
  const [nota, setNota] = useState(0);

  const addNota = () => {
    const newNota = {
      nombre_nota: nombre,
      pocentaje: porcentaje / 100,
      calificacion: nota,
    };
    state.addNota(newNota);
  };

  const calcularNota = () => {
    state.calcularNotaCurso();
    state.setShowModalNotaMateria(true);
  };

  return (
    <div className="infoNotaContainer">
      <div className="infoNota">
        <div>
          <h4>Nombre de la nota</h4>
          <Input
            placeholder="Nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <div>
          <h4>Porcentaje</h4>
          <InputNumber
            value={porcentaje}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            onChange={(value) => setPorcentaje(value)}
          />
        </div>
        <div>
          <h4>Nota</h4>
          <InputNumber
            min={0}
            max={5}
            value={nota}
            onChange={(value) => setNota(value)}
          />
        </div>
      </div>
      <div className="botonesInfoNota">
        <Button onClick={addNota}>Agregar</Button>
        <Button onClick={calcularNota}>Calcular nota</Button>
      </div>
      <ModalNotaMateria />
    </div>
  );
};

export default InfoNota;
