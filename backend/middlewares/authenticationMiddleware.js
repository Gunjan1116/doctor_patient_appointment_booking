const jwt=require("jsonwebtoken");
require("dotenv").config();
const authentication=async(req,res,next)=>{
    let token=req.headers.authorization;
    try {
        if(token){
            let decode=jwt.verify(token,process.env.Key);
            let userId=decode.userId;
            let role=decode.role;
            let email=decode.email;
            //console.log(decode)
            if(decode){
                req.body.userId=userId;
                req.body.role=role;
                req.body.userEmail=email;
                next();
            }else{
                res.json({"msg":"Invalid Token"})
            }
        }else{
            res.json({"msg":"Not Authorized"})
        }
    } catch (error) {
        console.log("error from authenticate middleware",error);
        res.json({"msg":"error while authentication"})
    }
}

module.exports={
    authentication
}