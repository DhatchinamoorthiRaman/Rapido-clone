const DriverDetail = require("../model/driverdetails");
const fs = require("fs");
const path = require("path");

module.exports.collectdriverdet= (req,res)=>{
    res.render("driverdetails.ejs");
}
module.exports.submitdriverdet = async(req,res)=>{
    const _id = req.cookies.id;
    console.log(_id);
    console.log(req.body);
    console.log(req.body.name);
    
    // const {Name,Gender,Mobile_no} = req.body;
    // console.log("name :" ,Name);
    // console.log("gender : ",Gender);
    // const DOB = new Date(req.body.dob).toISOString().split('T')[0];
    try {
        const driver =await DriverDetail.create({
            _id : _id,
            Name : req.body.name,
            DOB : req.body.dob,
            Gender : req.body.gender,
            Mobile_no : req.body.mobile_no,
            Vehicle : req.body.vehicle,
            Profile_pic : {
                data : fs.readFileSync(path.join(__dirname,"..","uploads",req.files[0].filename)),
                contentType : "image/png"
            },
            License : {
                data : fs.readFileSync(path.join(__dirname,"..","uploads",req.files[1].filename)),
                contentType : "pdf"
            }



        });
        if(driver){
            res.redirect("/");
        }
    
    } catch (error) {
        console.log(error);
    }
}