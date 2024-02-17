const mongoose = require("mongoose");
const driverdetailSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        // unique:true
    } ,
    Name :   {
        type : String,
        required:true,
        trim:true
    },
    DOB :   {
        type : String,
        required:true , 
    },
    Gender :   {
        type : String,
        required : true 
         
    },
    Mobile_no :   {
        type : String,
        required:true ,
        trim:true
    },
    Vehicle :{
        type : String,
        required:true,
        trim:true
    },
    Profile_pic : {
        data : Buffer,
        contentType : String
    },
    License : {
        data : Buffer,
        contentType : String
    }

})
const DriverDetail = mongoose.model("DriverDetail",driverdetailSchema);
module.exports = DriverDetail;