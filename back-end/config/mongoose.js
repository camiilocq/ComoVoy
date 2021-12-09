const mongoose = require("mongoose");

const url =
  "mongodb+srv://zorn01:NXtVbSiW67OfOdKQ@icesiadvancedweb.cfp8a.mongodb.net/comoVoy?retryWrites=true&w=majority";

mongoose.connect(url);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo connection error"));

module.exports = db;
