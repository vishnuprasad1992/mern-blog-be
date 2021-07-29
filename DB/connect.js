const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async ()=>{
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    });
    console.log("mongodb connected successfully")
}


module.exports = connectDb;