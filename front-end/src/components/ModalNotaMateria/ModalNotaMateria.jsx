import React, { useContext } from "react";
import { Modal, Button } from "antd";
import AppContext from "../../store/AppContext";

const ModalNotaMateria = () => {
  const state = useContext(AppContext);

  const cerrarModal = () => {
    state.setNotaParaGanar(0);
    state.setRestante(0);
    state.setShowModalNotaMateria(false);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Modal
      title="Nota"
      visible={state.showModalNotaMateria}
      onCancel={cerrarModal}
      footer={[
        <Button type="primary" key="submit" onClick={cerrarModal}>
          ¡Listo!
        </Button>,
      ]}
    >
      <div>
        Tu nota de {state.courseSelect.nombre} es de:{" "}
        {state.courseSelect.definitiva}
      </div>
      {state.courseSelect.definitiva >= 3 ? (
        <div>Ya ganasté el curso, A MIMIRRR</div>
      ) : (
        <div>
          Necesitas sacar {state.notaParaGanar} en el{" "}
          {formatter.format(state.restante * 100)}% restante para ganar la
          materia
        </div>
      )}
    </Modal>
  );
};

export default ModalNotaMateria;
