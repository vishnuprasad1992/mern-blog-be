const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false
    },
    categories:{
        type:Array,
        required:false
    }
}, { timestamps :true });


const posts = mongoose.model("posts",postSchema);
module.exports= posts;