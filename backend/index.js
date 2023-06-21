const express=require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const app=express();

//middleware
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Home Route")
})

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`Server is runnning at port ${process.env.port}`)
    } catch (error) {
        console.log("Not able to connect to DB");
        console.log(error);
    }
})