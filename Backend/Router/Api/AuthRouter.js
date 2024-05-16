const express = require("express");
const _ = express.Router();
const {
  login,
  singup,
  EmailVerify,
} = require("../../controllers/AuthController.js");

_.post("/singup", singup);
_.post("/login", login);
_.get("/emailVerify/:id", EmailVerify);

module.exports = _;
