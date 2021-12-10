import axios from "axios";

let instance = axios.create({
  baseURL: "https://como-voy-back.herokuapp.com/",
  responseType: "json",
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default instance;
