// const express = require("express");
const {express,app,app2,socketIO,server,server2,io,io2} = require("./a");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const bp = require("body-parser");
const path = require("path");

// const app = express();

const cors = require("cors");


app.set("view engine","ejs");
app.engine('ejs', require('ejs').__express);
app.set('view options', {
    layout: false
});
app.set("views",path.join(__dirname,"views"));

app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(bp.urlencoded({extended:true}));

const database = require("./db");
const authrouter = require("./routes/authroutes");
const bookrouter = require("./routes/bookroutes");
const detailsrouter  = require("./routes/userdetailsroutes");
const authenticate = require("./middleware/authmiddleware");
const paymentrouter = require("./routes/paymentroutes");

database.dbconnect();


app.use(authrouter);
app.use(detailsrouter);
app.get("/",authenticate,(req,res)=>{
    res.render("home.ejs");
})
app.use(authenticate,bookrouter);
app.use(authenticate,paymentrouter);

server.listen(3000,()=>{
    console.log("server is running on 3000");
})


// const app2 = express()

const authrouter1 = require("./routes/authroutes1");
const detailsrouter1 = require("./routes/driverdetailsroutes");
const requestrouter1 = require("./routes/requestroutes");
const activerouter1 = require("./routes/activeroutes");
const changeStream = require("./changestream");



app2.set("view engine","ejs");
app2.engine('ejs', require('ejs').__express);
app2.set('view options', {
    layout: false
});
app2.set("views",path.join(__dirname,"views"));
app2.use(cors());
app2.use(bp.urlencoded({extended:true}));
app2.use(bp.json());
app2.use(cookieparser());



app2.use(authrouter1);
app2.use(detailsrouter1);
app2.get("/",authenticate,(req,res)=>{
    res.render("home1.ejs");
})
app2.use(activerouter1);

// app2.use(changeStream.requestchange);
app2.use(authenticate,requestrouter1);

server2.listen(4000,()=>{
    console.log("server is running on 4000D");
})