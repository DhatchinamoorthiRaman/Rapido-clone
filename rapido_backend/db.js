const mongoose = require("mongoose");
async function dbconnect(){
    // mongoose.connect("mongodb://localhost:27017/JWT_auth")
    mongoose.connect("mongodb+srv://dhatchinamoorthir:ElWNRwM6U8n2TrVJ@cluster0.lh1xttu.mongodb.net/Rapido")
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)});

}

const db = mongoose.connection;

module.exports = {dbconnect,db};
// ElWNRwM6U8n2TrVJ