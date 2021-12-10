import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import { AppContextWrapper } from "./store/AppContext";

const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

ReactDOM.render(
  <AppContextWrapper>
    <App />
  </AppContextWrapper>,
  document.getElementById("root")
);
