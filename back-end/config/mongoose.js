const mongoose = require("mongoose");

const url =
  "mongodb+srv://user:user@cluster0.jdobjlm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error"));

module.exports = db;
