const bookcontrollers = require("../controllers/bookcontrollers");

const express = require("express");
const bookrouter = express.Router();
bookrouter.get("/newbook",bookcontrollers.newbooking_get);
bookrouter.post("/newbook",bookcontrollers.newbooking_post);
bookrouter.get("/newbook/request",bookcontrollers.newbookingrequestpage);
bookrouter.get("/newbook/getrequest",bookcontrollers.newbookingrequestpage_get)
bookrouter.post("/newbook/request",bookcontrollers.newbookingrequest_post);
bookrouter.get("/cancel",bookcontrollers.cancel_get);
bookrouter.get("/bookinghistory",bookcontrollers.bookinghistory_get)

module.exports = bookrouter;