const path = require("path")
const User  = require("../model/signup");
const jwt = require("jsonwebtoken");
const RFT = require("../model/token")
const {maxAgeaccess,maxAgerefresh,createaccesstoken,createrefreshtoken} = require("../tokengenerator")
const handleErrors = (err)=>{
   
    console.log(err);
    let error = {};
    if(err.code === 11000){
        error["email"] = "that email is already registered"
        return error
    }
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach((err)=>{
            error[err.properties.path]=err.properties.message;
        })
    }
    if(err.message.includes("incorrect password")){
        error["password"] = err.message
    }
    if(err.message.includes("email is not registered")){
        error["email"] = err.message
    }
    console.log(error)
    return error;

}
 


module.exports.signup_get = (req,res)=>{
  
    res.render("signup.ejs")
}
module.exports.signup_post = async(req,res)=>{
    var {email,password} = req.body;
  
    try {
        var user = await User.create({email,password});
        var _id = user._id;
        var ue = user.email;
        var accesstoken = createaccesstoken(user._id);
        var refreshtoken = createrefreshtoken(user._id);
         await RFT.create({_id,refreshtoken});
        res.cookie('jwtaccess',accesstoken,{httpOnly:true,maxAge:24*60*60*1000});
        // res.cookie("id",_id,{httpOnly:true,maxAge:24*60*60*1000});
        res.cookie("id",_id);
        res.status(201).json({user:user})
    } catch (err) {
        let error = handleErrors(err);
        res.status(400).json({error})
        
    }
 
}
module.exports.login_get = async(req,res)=>{
    let i = req.cookies.id;
    console.log("login",i);
    res.cookie("jwtaccess","",{maxAge:1});
    
    res.cookie("id","",{maxAge:1});
    await RFT.updateOne({_id:{$eq:i}},{$set:{refreshtoken:null}})
   
   
    res.render("login.ejs");
}
module.exports.login_post = async(req,res)=>{
    var {email,password} = req.body;
    console.log(email,password);
    try {
        var user = await User.login(email,password);
        // console.log(user);
        var _id = user._id;
        var accesstoken = createaccesstoken(user._id);
        var refreshtoken = createrefreshtoken(user._id);
        await RFT.updateOne({_id:{$eq:_id}},{$set:{refreshtoken:refreshtoken}})
        res.cookie('jwtaccess',accesstoken,{httpOnly:true,maxAge:24*60*60*1000});
        // res.cookie("id",_id,{httpOnly:true,maxAge:24*60*60*1000});
        res.cookie("id",_id);
        // res.cookie('jwtrefresh',refreshtoken,{httpOnly:true,maxAge:maxAgerefresh*1000});
        res.status(201).json({user:user})
        
    } catch (err) {
        let error = handleErrors(err);
        res.status(400).json({error})
        
    }
}