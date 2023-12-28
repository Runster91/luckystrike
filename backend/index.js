const express =  require("express")
const cors = require("cors")
const mongoose = require ("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8000

//MONGODB CONNECTION
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connect to database"))
.catch((err)=>console.log(err))

//Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type  : String,
        unique : true
    } ,
    password: String,
    confirmpassword: String,
    image : String,
   
})

//

const userModel = mongoose.model("user",userSchema)

//API
app.get ("/",(req,res)=>{
    res.send("Server is running")
})


//sign up
app.post("/signup",async(req,res)=>{

    console.log(req.body);
    const {email} = req.body;
    
    try {
        const existingUser = await userModel.findOne({ email: email }).exec();

        if (existingUser) {
            res.json({ message: "Email id is already registered", alert: false });
        } else {
            const newUser = new userModel(req.body);
            await newUser.save();
            res.json({ message: "Successfully signed up", alert: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }

   
    
});

//api login
app.post("/login", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
  
    try {
      const result = await userModel.findOne({ email: email }).exec();
  
      if (result) {
        console.log(result);
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.send({ message: "Login is successful", alert: true, data: dataSend });
      } else {
        res.send({ message: "Email not found please  sign up", alert: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
 // product section
 const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)

//save ave product  in daya 
//api
app.post("/uploadProduct",async(req,res)=>{
  // console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Upload successfully"})
})

  

 //server is running
app.listen(PORT,()=>console.log("server is running at port:" + PORT))