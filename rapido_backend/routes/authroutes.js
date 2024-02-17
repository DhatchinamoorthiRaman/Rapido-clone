const express = require("express");
const authrouter = express.Router();
const authcontroller = require("../controllers/authcontrollers")
authrouter.get("/signup",authcontroller.signup_get)
authrouter.post("/signup",authcontroller.signup_post)
authrouter.get("/login",authcontroller.login_get)
authrouter.post("/login",authcontroller.login_post)

module.exports = authrouter;