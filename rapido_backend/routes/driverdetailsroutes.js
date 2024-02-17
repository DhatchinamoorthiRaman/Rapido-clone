const detailcontroller = require("../controllers/detailcontroller1");
const multer = require("multer");


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
var upload = multer({
    storage:storage
})
const express = require("express");
const detailsrouter = express.Router();
detailsrouter.get("/details",detailcontroller.collectdriverdet);
detailsrouter.post("/submit",upload.any(),detailcontroller.submitdriverdet);

module.exports = detailsrouter