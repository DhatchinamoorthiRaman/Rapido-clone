 const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required : [true,"please enter the email"],
        unique : true,
        lowercase : true,
        validate : [isEmail,"please enter valid email"],
    },
    password:{
        type:String,
        required : [true,"please enter the password"],
        minlength : [6,"minimum password length is 6 characters"],
    }
});
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
userSchema.post("save",function(doc,next){
    console.log("user created successfully",doc);
    next();

})
//static method
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email:email});
    if(user){
       const auth = await bcrypt.compare(password,user.password);
       if(auth){
        return user;
       }
       throw Error("incorrect password")

    }
    throw Error("email is not registered")

}

const User = mongoose.model("user",userSchema);
module.exports = User