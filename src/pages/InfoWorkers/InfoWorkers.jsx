/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Typography, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./InfoWorkers.css";

const InfoWorkers = () => {
  const { Title } = Typography;

  return (
    <SectionTitle title="Información">
      <div>
        <div>
          <Title level={4}>Acerca del proyecto </Title>
          <hr />
          <Title level={5}>
            Proyecto final de la asignatura de Programación Web Avanzada, el
            proyecto fue trabajado durante el semestre 2021-2. Su objetivo es
            llevar un control y poder visualizar en tiempo real las
            calificaciones tanto de un curso como de todo su periodo académico
            (tribunal, semestre, periodo, etc.) tiene Mongo como motor de base
            de datos.
          </Title>
        </div>
        <div>
          <Title level={4}>Integrantes </Title>
          <hr />
          <div className="botonesIntegrantes">
            <Button className="botonIntegrante" type="dashed">
              <a href="https://camiilocq.github.io" target="_blank">
                Camilo Castillo
              </a>
            </Button>
            <Button className="botonIntegrante" type="dashed">
              <a
                href="https://juan-puerta.github.io/HojaDeVida"
                target="_blank"
              >
                Juan Puerta
              </a>
            </Button>
            <Button className="botonIntegrante" type="dashed">
              Juan Vera
            </Button>
          </div>
        </div>
        <div>
          <Title level={4}>Repositorio git </Title>
          <hr />
          <Button type="default" icon={<GithubOutlined />}>
            <a href="https://github.com/camiilocq/ComoVoy" target="_blank">
              {" "}
              Ir al repositorio
            </a>
          </Button>
        </div>
      </div>
    </SectionTitle>
  );
};

export default InfoWorkers;
