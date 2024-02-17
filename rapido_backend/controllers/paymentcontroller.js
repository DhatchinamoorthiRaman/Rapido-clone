const {db} = require("../db");

module.exports.makepayment_get = async(req,res)=>{
    const result = await db.collection("bookings").updateOne({_id:req.query.id},{$set:{Payment_status:"true"}});
    res.status(201).json({result});   

}

module.exports.paymentsuccess_get = (req,res)=>{
    res.render("paymentsucess.ejs");
}
