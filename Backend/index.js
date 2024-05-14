require("dotenv").config();
const express = require("express");
const routs = require("./Router");
const dbconfig = require("./Config/dbconfig.js");

const app = express();
app.use(express.json());
dbconfig();

app.use(routs);

app.listen(8000, () => {
  console.log("server is running 8000");
});
