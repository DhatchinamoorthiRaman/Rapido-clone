const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        // unique:true
    } ,
    refreshtoken:{
        type:String,
        required:true,
        // unique:true
    }
    // ue:{
    //     type:String
    // }
})
const refreshtoken = mongoose.model('refreshtoken',tokenSchema);

module.exports = refreshtoken;