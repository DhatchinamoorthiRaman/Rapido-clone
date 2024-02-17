const express = require("express");
const requestrouter = express.Router();
const requestcontrollers = require("../controllers/requestcontrollers");
requestrouter.get("/request",requestcontrollers.requestpage)
requestrouter.get("/getrequest",requestcontrollers.getrequest_get)
requestrouter.get("/accept",requestcontrollers.accept_get)
requestrouter.get("/cancel",requestcontrollers.cancel_get)
requestrouter.get("/start",requestcontrollers.start_get);
requestrouter.get("/complete",requestcontrollers.complete_get);
// requestrouter.post("/request",requestcontrollers.getrequest_post);
module.exports = requestrouter;