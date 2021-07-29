const express = require("express");
const route = express.Router();
const users = require("../models/users");
const posts = require("../models/posts");


//create
route.post("/", async (req, res) => {
    try {
        const newPost = new posts(req.body);
        const post = await newPost.save()
        .then((post)=>res.status(200).json(post))
        .catch((err)=> res.json(err))
    } catch (error) {
        res.status(500).json("post not created,please try again ");
    }
})

//getpost
route.get("/", async (req, res) => {
    if(req.query.username)
    {
        // const username=req.query.username;
        try {
           const post = await posts.find({username : req.query.username })
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json(error)
        }
    }
    else if(req.query.cat){
        const catName = req.query.cat;
        try {
            const post = await posts.find({categories : $in [catName]})
            res.status(200).json(post)
        } catch (error) {
            res.status(404).json(error)
        }
    }
    else{
        try {
            const post = await posts.find()
             res.status(200).json(post);
         } catch (error) {
             res.status(404).json(error)
         }
    }  
})

// get single post
route.get("/:id",async (req,res)=>{
    const id = req.params.id;
    try {
        const singlePost = await posts.findById(id);
        res.status(200).json(singlePost); 
    } catch (error) {
        res.status(404).json(error)
    }
})

//update
route.put("/:id",async (req,res)=>{
    try {
        const post = await posts.findById(req.params.id);
        if(req.body.username === post.username){
            try {
                const updatePost = await posts.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true});
                res.status(200).json(updatePost);
            } catch (error) {
                res.status(401).json("post not updated");
            }
        }
        else{
            res.json("you can only update your post")
        }
    } catch (error) {
        res.status(404).json(error)
    } 
})

//delete
route.delete("/:id",async (req,res)=>{
    try {
        const post = await posts.findById(req.params.id);
        if(post.username ===req.body.username){
            try {
                await post.delete();
                res.status(200).json("deleted successfully");
            } catch (error) {
                res.status(401).json("post not deleted");
            }
        }
        else{
            res.json("you can only delete your post")
        }
    } catch (error) {
        res.status(404).json(error)
    } 
})

module.exports = route;

