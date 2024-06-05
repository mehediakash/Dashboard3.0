const express = require("express");
const _ = express.Router();
const {
  login,
  singup,
  EmailVerify,
  ForgotPassword,
  SetNewPassowrd,
} = require("../../controllers/AuthController.js");

_.post("/singup", singup);
_.post("/login", login);
_.get("/emailVerify/:id", EmailVerify);
_.post("/forgotpassword", ForgotPassword);
_.post("/setnewPassword/:id", SetNewPassowrd);
module.exports = _;
