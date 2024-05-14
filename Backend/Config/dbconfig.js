const mongoose = require("mongoose");
const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
function dbconfig() {
  mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@cluster0.knqixdj.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("Connected!"));
}

module.exports = dbconfig;
