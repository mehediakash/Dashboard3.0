const express = require("express");
const _ = express.Router();
const { login, singup } = require("../../controllers/AuthController.js");

_.post("/singup", singup);
_.post("/singup", login);

module.exports = _;
