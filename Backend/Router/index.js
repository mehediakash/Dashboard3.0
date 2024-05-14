const express = require("express");
const _ = express.Router();
const routersApi = require("./Api");
const api = process.env.BASE_API;

_.use(api, routersApi);
_.use(api, (req, res) => res.send({ error: "api not found" }));

module.exports = _;
