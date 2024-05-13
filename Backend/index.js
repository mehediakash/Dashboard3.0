const express = require("express");
const app = express();
const dbconfig = require("./Config/dbconfig.js");
dbconfig();
app.get("/", function (req, res) {
  console.log("hello world");
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("server is running 8000");
});
