const express =  require("express");
const paymentrouter = express.Router();
const paymentcontroller = require("../controllers/paymentcontroller");
paymentrouter.get("/makepayment",paymentcontroller.makepayment_get);
paymentrouter.get("/paymentsuccess",paymentcontroller.paymentsuccess_get);

module.exports = paymentrouter;