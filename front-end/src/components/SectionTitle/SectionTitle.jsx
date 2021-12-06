import React from "react";
import TitleBarSection from "../TitleBarSection/TitleBarSection";
import "./SectionTitle.css";

const SectionTitle = (props) => {
  return (
    <div className="containerPage">
      <TitleBarSection title={props.title} />
      <div style={{ padding: "2.5%", height: "88%" }}>{props.children}</div>
    </div>
  );
};
export default SectionTitle;
