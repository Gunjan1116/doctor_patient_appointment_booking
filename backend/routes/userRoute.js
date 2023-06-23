const express= require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const fs=require("fs");
require("dotenv").config();
const {Usermodel} =require("../models/userModel");

const userRoute=express.Router();

//Get all the doctors
userRoute.get("/doctors",async(req,res)=>{
    try {
        let allDoctor=await Usermodel.find({role:"doctor"})
        res.json({"msg":"All doctors details","data":allDoctor})
    } catch (error) {
        console.log("error from getting all doctor route",error);
        res.json({"msg":"error while getting all doctors details"})
    }
}) 

//get doctors according to location
userRoute.get("/doctors/:location",async(req,res)=>{
    let location=req.params.location;
    try {
        let allDoctor=await Usermodel.find({role:"doctor",location:{"$regex":location,"$options":"i"}})
        res.json({"msg":"All doctors details based on location","data":allDoctor})
    } catch (error) {
        console.log("error from getting all doctor route",error);
        res.json({"msg":"error while getting all doctors details based on location"})
    }
})

//get doctors based on their specialty
userRoute.get("/doctors/specialty/:value",async(req,res)=>{
    let specialty=req.params.value;
    console.log(specialty)
    try {
        let allDoctor=await Usermodel.find({role:"doctor",specialty})
        res.json({"msg":"All doctors details based on specialty","data":allDoctor})
    } catch (error) {
        console.log("error from getting all doctor route",error);
        res.json({"msg":"error while getting all doctors details based on specialty"})
    }
})

//Route to add new user(doctor/patient)
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

//Route to login a user(doctor/patient)
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let reqData=await Usermodel.find({email});
        if(reqData.length==0){
            return res.json({"msg":"register first"})
        }else{
            bcrypt.compare(password,reqData[0].password,async(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:reqData[0]._id,role:reqData[0].role,email:reqData[0].email},process.env.Key);
                    res.json({"msg":"Login Success","token":token,"role":reqData[0].role,"name":reqData[0].name})
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

//Route to logout a user(doctor/patient)
userRoute.get("/logout", (req,res)=>{
    const token=req.headers.authorization;
    try {
        const blacklistdata=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
        blacklistdata.push(token)
        fs.writeFileSync("./blacklist.json",JSON.stringify(blacklistdata))
        res.json({"msg":"Logout Successful"})
    } catch (error) {
        console.log("error from logout route",error);
        res.json({"msg":"error while logout"})
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