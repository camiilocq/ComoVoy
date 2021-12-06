import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:3000",
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default instance;
