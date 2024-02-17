const UserDetail = require("../model/userdetails");


module.exports.collectuserdet= (req,res)=>{
    res.render("userdetails.ejs");
}
module.exports.submituserdet = async(req,res)=>{
    const _id = req.cookies.id;
    console.log(_id);
    const {Name,Gender,Mobile_no} = req.body;
    console.log("name :" ,Name);
    console.log("gender : ",Gender);
    const DOB = new Date(req.body.DOB).toISOString().split('T')[0];
    try {
        const user =await UserDetail.create({_id,Name,DOB,Gender,Mobile_no});
        res.status(201).json({user:user})
        
    } catch (error) {
        console.log(error);
    }
}