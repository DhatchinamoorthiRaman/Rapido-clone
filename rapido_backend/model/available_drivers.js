const mongoose = require("mongoose");
const availabaleSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
    },
    Name:{
        type:String,
        required:true
    },
    Vehicle : {
        type : String,
        required:true

    },
    Cur_location : {
        type : String,
        required : true
    },
    Status:{
        type : String,
        Default : "false"
        
    }

})

const AvailableDrivers = mongoose.model("available_drivers",availabaleSchema);

module.exports = AvailableDrivers;