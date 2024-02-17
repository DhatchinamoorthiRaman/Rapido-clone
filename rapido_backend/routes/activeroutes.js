const express = require("express");
const activeroutes = require("../controllers/activecontroller")
const activerouter = express.Router();
activerouter.get("/active",activeroutes.activate);

module.exports = activerouter;