const express = require("express");
const app = express();
const multer = require("multer");
const uploadFile = require("./service/storage.service");
const postModel = require("./models/post.model")

// middleware
app.use(express.json());


const upload = multer({ storage: multer.memoryStorage() })


/* API Created start */
app.post("/create-post", upload.single("image"), async(req, res) => {
    // upload image in ImageKit
    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    });

    return res.status(201).json({
        message: "Post created successfully",
        post
    })
})

app.get("/posts", async(req, res) => {
    const post = await postModel.find();

    return res.status(200).json({
        message: "posts fetched successfully",
        post
    })
})
/* API Created end */

module.exports = app;