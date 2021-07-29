const express = require("express");
const route = express.Router();
const users = require("../models/users");
const bcrypt = require("bcrypt");


//Register
route.post("/register", async (req,res)=>{
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashesPaassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new users({
            username:req.body.username,
            email : req.body.email,
            password : hashesPaassword
        });
        const user = await newUser.save()
        .then(() => res.status(200).json("User Registered Successfully"))
        .catch(err=> res.status(500).json(err))
    }
    catch(err){
        res.status(500).json(err);
    } 
}) 

//LOGIN
route.post("/login", async (req,res)=>{
    try {
        const loginUser = await users.findOne({username:req.body.username}) ;
        !loginUser && res.status(401).json("user not found");

        const validated = await bcrypt.compare(req.body.password,loginUser.password );
        !validated && res.status(401).json("wrong credentials");
        const {password,...others} = loginUser._doc;
        res.status(200).json(others);        
    } catch (error) {
        res.status(400).json("wrong credentials");
        console.log(error)
    }


})
module.exports = route;

