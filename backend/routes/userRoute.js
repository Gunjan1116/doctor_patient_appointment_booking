const express= require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const {Usermodel} =require("../models/userModel");

const userRoute=express.Router();


userRoute.post("/register",async(req,res)=>{
    const {name,email,password,role,specialty,location}=req.body;

    try {
        let reqData=await Usermodel.find({email});
        if(reqData.length>0){
            return res.json({"msg":"You are already register"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log("error from hashing password",err);
                res.json({"msg":"error from hashing password"})
            }else{
                let registerData=new Usermodel({name,email,password:hash,role,specialty:specialty||"None",location});
                await registerData.save();
                res.json({"msg":"Successfully register"})
            }
        })
    } catch (error) {
        console.log("error from register route",error);
        res.json({"msg":"error in register a user"})
    }
})
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let reqData=await Usermodel.find({email});
        if(reqData.length==0){
            return res.json({"msg":"register first"})
        }else{
            bcrypt.compare(password,reqData[0].password,async(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:reqData[0]._id},process.env.Key);
                    res.json({"msg":"Login Success","token":token})
                }else{
                    res.json({"msg":"Wrong Credentials"})
                }
            })
        }

    } catch (error) {
        console.log("error from login route",error);
        res.json({"msg":"error in login a user"})
    }
})


module.exports={
    userRoute
}

// {
//     "name":"gunjan kumar",
//     "email":"kumargunjan1116@gmail.com",
//     "password":"",
//     "role":"doctor",
//     "specialty":"Cardiologist",
//     "location":"jamshedpur"
//   }

// {
//     "name":"Manoj Kumar",
//     "email":"manojsfstm5@gmail.com",
//     "password":"",
//     "location":"Patna"
//   }