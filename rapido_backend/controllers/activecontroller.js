const AvailableDrivers = require("../model/available_drivers");
const DriverDetail = require("../model/driverdetails");

module.exports.activate = async(req,res)=>{
    const _id = req.cookies.id;
    console.log("active",_id);
    const driver = await DriverDetail.findOne({_id:_id});
    console.log(driver);
    console.log("name",driver.Vehicle);

    const result = await AvailableDrivers.create({
        _id:_id,
        Name: driver.Name,
        Vehicle : driver.Vehicle,
        Cur_location:"kovaipudhur"

    })
    console.log(result);
    if(result){
        res.send("activated")
    }

}