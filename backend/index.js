const express=require("express");
const cors=require("cors")
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoute");
const { bookingRoutes } = require("./routes/bookingRoute");
require("dotenv").config();
const app=express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Home Route")
}) 

app.use("/user",userRoute)
app.use("/booking",bookingRoutes)
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