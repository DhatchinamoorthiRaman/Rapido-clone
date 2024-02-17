
const {db} = require("../db");
const Requests = require("../model/request");
const UserDetail = require("../model/userdetails");
const {ObjectId} = require("mongodb");
const moment = require("moment");
const {io,io2} = require("../a");
var driver;
// const pipeline =[  {
//     '$match': {
//         'operationType': 'update',
//         'fullDocument.Accept': 'true',
        
//     },
// }]
// const changeStream = Requests.watch();
// changeStream.on("change",(change)=>{
//     console.log("change detected",change)
//     io.emit("requestChange",change);
// })
module.exports.newbooking_get=(req,res)=>{

    // driver = [];
    res.render("book.ejs")
}
module.exports.newbooking_post=async(req,res)=>{
    try {
        
        const cursor = db.collection("available_drivers").find({
            $and:[{Vehicle:req.body.vehicle},{Cur_location:req.body.source}]
        });
        driver = await cursor.toArray();

        // console.log("from dric" ,driver[0].name)

        if(driver){
            console.log("yes",driver);
            console.log(driver[0]._id);
            res.cookie("dest",req.body.destination);
            res.cookie("source",req.body.source);
            // res.cookie("did",driver[0]._id);
            // res.render("book.ejs",{driver});
            // res.render("home.ejs");
            res.status(201).json({driver});
        }
        // res.status(201).json({error:"no drivers available"});
    } catch (error) {
        console.log(error)
    }

   

}
// const pipeline =[  {
//     '$match': {
//         'operationType': 'update',
//         'fullDocument.Accept': 'true',
        
//     },
// }]
const changeStream = Requests.watch();
changeStream.on("change", (change) => {
    io2.emit("dataChange", change);
})
// const changeStream1= Requests.watch(pipeline);
// changeStream1.on("change",(change)=>{
//     console.log("change detected",change)
//     io.emit("requestChange",change);
// })
module.exports.newbookingrequest_post = async(req,res)=>{
    // pipeline = [{
    //     '$match': {
    //         'operationType': 'insert',
    //         'fullDocument.did': req.body.did,

    //     },
    // }]
    const us = await UserDetail.findOne({_id:req.cookies.id});
   const requ =  await Requests.create({
        uid : req.cookies.id,
        Name : us.Name,
        did : req.body.did,
        Source : req.body.source,
        Destination:req.body.dest,
        Date: moment().format("YYYY-MM-DD"),
        Time : moment().format("HH:mm:ss")
        // Vehicle:req.body.vehicle
    })
    console.log(requ);
    // res.redirect("/newbook/request")
   
   
    res.status(201).json({reqsend:requ})


}
module.exports.newbookingrequestpage = async(req,res)=>{
    // const cursor = await db.collection("requests").find({$and:[{uid:req.cookies.id},{Accept:"true"}]});
 
    // // console.log(cursor);
    // var result = [];
    // if(cursor){
    //     result = await cursor.toArray();
    //     console.log(result)

    // }
    // res.render("request.ejs",{result});
    res.render("request.ejs");
}
module.exports.newbookingrequestpage_get =async(req,res)=>{
    const cursor = await db.collection("bookings").find({$and:[{uid:req.cookies.id},{Payment_status:"false"}]});
    const paymentrequest = await cursor.toArray();
    console.log("paymentrequest",paymentrequest)
    res.status(201).json({paymentrequest});


}

module.exports.cancel_get = async(req,res)=>{
    const rid = new ObjectId(req.query.rid);
    console.log("rid",rid);
    const r1 = await db.collection("bookings").findOne({$and:[{_id:rid},{Start_ride:null}]})
    if(r1){
        const result = await db.collection("requests").deleteOne({ _id: rid })
        const book = await db.collection("bookings").deleteOne({ _id: req.query.rid });
        console.log(book);
        console.log(result);
        res.status(201).json({ result });

    }
    else{
        
        res.status(404).json({"error":"cannot be cancelled"});
    }
    // const result = await db.collection("requests").deleteOne({_id:rid})
    // const book = await db.collection("bookings").deleteOne({_id:req.query.rid});
    // console.log(book);
    // console.log(result);
    // res.status(201).json({result});
    
}
module.exports.bookinghistory_get = async(req,res)=>{
    const cursor = await db.collection("bookings").find({$and:[{uid:req.cookies.id},{Payment_status:"true"}]});
 
    const history = await cursor.toArray();
    console.log(history);
    res.render("bookinghistory.ejs",{history});
}