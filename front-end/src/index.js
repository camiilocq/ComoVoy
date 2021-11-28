import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppContextWrapper } from "./store/AppContext";

ReactDOM.render(
  <AppContextWrapper>
    <App />
  </AppContextWrapper>,
  document.getElementById("root")
);
