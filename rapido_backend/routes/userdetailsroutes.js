const detailcontroller = require("../controllers/detailcontroller");

const express = require("express");
const detailsrouter = express.Router();
detailsrouter.get("/details",detailcontroller.collectuserdet);
detailsrouter.post("/submit",detailcontroller.submituserdet);

module.exports = detailsrouter