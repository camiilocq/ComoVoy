import React, { useContext } from "react";
import { Modal, Button } from "antd";
import AppContext from "../../store/AppContext";

const ModalPromedioSemestre = () => {
  const state = useContext(AppContext);

  const actualizarPromedioPonderado = () => {
    //state.setPromedioPonderado(state.calcularPromedioPonderado());
    state.setShowModalPromedioSemestre(false);
  };

  return (
    <Modal
      title="Promedio del semestre"
      visible={state.showModalPromedioSemestre}
      onCancel={actualizarPromedioPonderado}
      footer={[
        <Button
          type="primary"
          key="submit"
          onClick={actualizarPromedioPonderado}
        >
          ¡Listo!
        </Button>,
      ]}
    >
      <div>
        El promedio de tu semestre es de : {state.calcularPromedioSemestre()}
      </div>
    </Modal>
  );
};

export default ModalPromedioSemestre;
