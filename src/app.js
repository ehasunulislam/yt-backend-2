const express = require("express");
const app = express();
const multer = require("multer");
const uploadFile = require("./service/storage.service");
const postModel = require("./models/post.model");
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());


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
        message: "success",
        post,
    })
})
/* API Created end */

module.exports = app;