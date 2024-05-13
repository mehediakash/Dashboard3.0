const mongoose = require("mongoose");

function dbconfig() {
  mongoose
    .connect(
      "mongodb+srv://Ecommerce:aklogic@cluster0.knqixdj.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected!"));
}

module.exports = dbconfig;
