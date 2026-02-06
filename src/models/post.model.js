const mongoose = require("mongoose");

// schema create
const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
});

const postModel = mongoose.model("post", postSchema); 

module.exports = postModel;