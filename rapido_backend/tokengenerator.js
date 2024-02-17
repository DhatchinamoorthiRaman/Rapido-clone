const jwt = require("jsonwebtoken");
const maxAgeaccess = 20; 
const maxAgerefresh = 24*60*60;
const createaccesstoken = function(id){
    return jwt.sign({id},"rdm secret access",{expiresIn : maxAgeaccess})
}
const createrefreshtoken = function(id){
    return jwt.sign({id},"rdm secret refresh",{expiresIn : maxAgerefresh})
}

module.exports = {maxAgeaccess,maxAgerefresh,createaccesstoken,createrefreshtoken};