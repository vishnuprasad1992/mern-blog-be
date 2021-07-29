const express = require("express");
const route = express.Router();
const users = require("../models/users");
const posts = require("../models/posts");
const bcrypt = require("bcrypt");


//UPDATE
route.put("/:id", async (req, res) => {
    if (req.body.userID === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await users.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(500).json("you can only update your account");
    }
})

//DELETE
route.delete("/:id", async (req, res) => {
    if (req.body.userID === req.params.id) {
        try {
            const user = users.findById(req.params.id);
            try {
                await posts.deleteMany({ username: user.username })
                await users.findByIdAndDelete(req.params.id)
                res.status(200).json("User Deleted Successfully");
            }
            catch (err) {
                res.status(500).json(err);
            }
        } catch (error) {
            res.status(404).json("user not found");
        }
    }
    else {
        res.status(401).json("You can delete only your account");
    }

})


// GET
route.get("/", async (req, res) => {

    try {
        const usersList= await users.find();
        res.status(200).json(usersList);
    }
    catch (err) {
        res.status(500).json(err);
    }


})


// GET user
route.get("/:id", async (req, res) => {

    try {
        const user= await users.findById(req.params.id);
        const {password,...others} = user;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }


})

module.exports = route;

