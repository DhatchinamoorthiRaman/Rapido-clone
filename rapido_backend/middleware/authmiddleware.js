            const jwt = require("jsonwebtoken")
            const refreshtoken = require("../model/token");
            const {maxAgeAccess,createaccesstoken} = require("../tokengenerator");
            async function authenticate(req,res,next){
                const url = req.url;
                // const id = localStorage.getItem("id");
                const id = req.cookies.id;
                // console.log(typeof(id));
                // console.log("authenticate :",id);
                const rf = await refreshtoken.findOne({_id:id});
                // console.log("dbrefresh1",rf);

                if(rf){
                    // console.log(rf);
                    // console.log("dbrefresh:",rf.refreshtoken)
                    jwt.verify(rf.refreshtoken,"rdm secret refresh",(err,decoded)=>{
                        if(err){
                            console.log("refresh:",err.message);
                            if(err.message.includes("jwt expired")){
                                res.redirect("/login")
                            }
                        }
                        else{
                            const ac = req.cookies.jwtaccess;
                            // console.log(ac)
                            jwt.verify(ac, "rdm secret access", (err, user) => {
                                if (err) {
                                    console.log("access:",err.message);
                                    if (err.message.includes("jwt expired")) {
                                        const newtoken = createaccesstoken(id)
                                        res.cookie("jwtaccess",newtoken);
                                        res.redirect(url);                            
                                    }
                                }
                                else {
                                    // console.log(user);   
                                    next();
                                }})

                        }
                    })
                }
                else{
                    res.redirect("/login")
                }
                
            
            }

            module.exports = authenticate