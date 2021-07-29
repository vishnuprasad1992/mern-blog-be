const express = require("express");
const route = express.Router();
const categories = require("../models/categories");


//create
route.post("/", async (req, res) => {
    try {
        const newCategory = new categories(req.body);
        const category = await newCategory.save()
        .then(()=>res.status(200).json("category created successfully"))
        .catch((err)=> res.json(err))
    } catch (error) {
        res.status(500).json("category not created,please try again ");
    }
})

//get category
route.get("/", async (req, res) => {
    try {
        const category = await categories.find()
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json(error)
        }
})

module.exports = route;

