const events = require("events");
const eventEmitter = new events.EventEmitter();
const {db}= require("../db");
// const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const Bookings = require("../model/booking");
const moment = require("moment");
const {io,io2} = require("../a");
const Requests = require("../model/request");

// const changeStream = Requests.watch();
// changeStream.on("change",(change)=>{
//     // console.log("change detected",change);
//     io2.emit("dataChange",change);
// })
const pipeline =[  {
    '$match': {
        'operationType': 'update',
        'fullDocument.Accept': 'true',
        
    },
}]
const changeStream= Requests.watch();
changeStream.on("change",(change)=>{
    console.log("change detected",change)
    io.emit("requestChange",change);
})
module.exports.requestpage = async(req,res)=>{
   
    res.render("request1.ejs");
}
module.exports.getrequest_get =async(req,res)=>{
    const cursor1 = await db.collection("requests").find({$and:[{did:req.cookies.id},{Accept:'false'}]});
    const requests = await cursor1.toArray();
    res.status(201).json({requests});


}
module.exports.accept_get = async(req,res)=>{
    // console.log(req.query.id);
    const rid = new ObjectId(req.query.id);
    console.log(rid);
    const reque = await db.collection("requests").findOne({_id:rid});
    const result = await db.collection("requests").updateOne({_id:{$eq:rid}},{$set:{Accept:"true"}});
    Bookings.create({
        _id:rid,
        uid:reque.uid,
        did:reque.did,
        Source:reque.Source,
        Destination:reque.Destination,
        Date: moment().format("YYYY-MM-DD"),
        Time : moment().format("HH:mm:ss"),
        Amount:"100",
        Payment_status:"false",
        Start_ride:"null",
        Complete_ride:"null"
    })

    
    console.log(result);
    res.status(201).json({result});
}
module.exports.cancel_get = async(req,res)=>{
    const rid = new ObjectId(req.query.id);
    console.log("rid",rid);
    const r = await db.collection("requests").findOne({$and:[{_id:rid},{Accept:"false"}]});
    if(r){
        const result = await db.collection("requests").deleteOne({_id:rid});
        console.log(result);
        res.status(201).json({result});

    }
    else{
        let error = {"msg":"cannot be canceled"}
        res.status(201).json({error});
    }
   
    
}
module.exports.start_get = async(req,res)=>{

    const rid = new ObjectId(req.query.id);
    console.log("start",rid);
    const result = await db.collection("bookings").updateOne({_id:req.query.id},{$set:{Start_ride:moment().format("HH:mm:ss")}});

    console.log(result);
    if(result){
        res.status(201).json({result})
    }

}
module.exports.complete_get = async(req,res)=>{
    const rid = new ObjectId(req.query.id);
    console.log("complete",rid)
    const result = await db.collection("bookings").updateOne({_id:req.query.id},{$set:{Complete_ride:moment().format("HH:mm:ss")}});
    console.log(result);
    if(result){
        res.status(201).json({result})
    }

}