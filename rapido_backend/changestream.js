const Requests = require("./model/request");
const {io2} = require("./a");
module.exports.requestchange = (req, res ,next) => {
    console.log("url",req.url);
    // const id = req.url.split("?")[1].split("=")[1];
    // const id = "6566ded6250412955ad96682"
    console.log("did",id);
    const pipeline = [{
        '$match': {
            'operationType': 'insert',
            'fullDocument.did': id,

        },
    }]
    const changeStream = Requests.watch(pipeline);
    changeStream.on("change", (change) => {
        io2.emit("dataChange", change);
    })
    next();



}
