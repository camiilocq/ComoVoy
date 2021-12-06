import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import { AppContextWrapper } from "./store/AppContext";

ReactDOM.render(
  <AppContextWrapper>
    <App />
  </AppContextWrapper>,
  document.getElementById("root")
);
