

const express = require ("express")
const cors = require ("cors")
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()

const app = express ()
app.use (cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

//MONGODB cnonnection
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.BASE_URL_DB_PRODUCCION).then(()=>console.log("Connected to Database")).catch(
    (err)=>console.log(err)
)

//schema
const userSchema=mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmpassword: String,
    image: String   
})
 //
 const model  =mongoose.model("user",userSchema)

//API
app.get("/", (req,res)=>{
    res.send("Server is running")
})

app.post("/signup", (req,res)=>{
    console.log(req.body)
})

app.listen(PORT, ()=>console.log("server is running at port:" + PORT ))