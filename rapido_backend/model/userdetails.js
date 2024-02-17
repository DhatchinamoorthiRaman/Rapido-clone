const mongoose = require("mongoose");
const userdetailSchema = new mongoose.Schema({
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

})
const UserDetail = mongoose.model("UserDetail",userdetailSchema);
module.exports = UserDetail;