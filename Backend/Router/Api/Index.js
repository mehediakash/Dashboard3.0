const express = require("express");
const _ = express.Router();
const AuthRouter = require("./AuthRouter.js");

_.use("/auth", AuthRouter);

module.exports = _;
